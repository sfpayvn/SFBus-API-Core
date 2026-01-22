# Widget Blocks Module (NestJS + MongoDB) — Hướng dẫn triển khai

Tài liệu này hướng dẫn bạn tạo **module NestJS** để lưu **Block Widget** (block tạo từ GrapesJS/HTML) vào MongoDB, với các field bắt buộc:

- `tenantId`
- `name`
- `imageUrl` (thumbnail hiển thị trong danh sách block)
- `html`
- (optional) `css`
- (optional) `projectData` (JSON GrapesJS để edit lại)

---

## 1) Mục tiêu

Bạn sẽ có API:

- `POST /api/widget-blocks` → tạo block mới
- `GET /api/widget-blocks?tenantId=...&search=...` → list blocks theo tenant
- `GET /api/widget-blocks/:id?tenantId=...` → get detail
- `PATCH /api/widget-blocks/:id?tenantId=...` → update
- `DELETE /api/widget-blocks/:id?tenantId=...` → soft delete (isActive=false)

Để Angular/GrapesJS:

- Khi user bấm **Save Block** → gọi `POST` lưu HTML/CSS/thumbnail.
- Khi mở editor → gọi `GET` load block library và `BlockManager.add(...)`.

---

## 2) Cài dependency (nếu chưa có)

```bash
npm i @nestjs/mongoose mongoose class-validator class-transformer
```

> Nếu project của bạn đã dùng Mongoose rồi thì bỏ qua.

---

## 3) Tạo module

Chạy lệnh:

```bash
nest g module widget-blocks
nest g controller widget-blocks
nest g service widget-blocks
```

Tạo thêm folder:

```
src/widget-blocks/
  dto/
  schemas/
```

---

## 4) Schema MongoDB

Tạo file: `src/widget-blocks/schemas/widget-block.schema.ts`

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WidgetBlockDocument = WidgetBlock & Document;

@Schema({ timestamps: true })
export class WidgetBlock {
  @Prop({ required: true, index: true })
  tenantId: string;

  @Prop({ required: true })
  name: string;

  // Thumbnail hiển thị trong block list (GrapesJS)
  @Prop({ required: true })
  imageUrl: string;

  // Nội dung block (để render hoặc add vào BlockManager)
  @Prop({ required: true })
  html: string;

  @Prop()
  css?: string;

  // Optional: lưu project data của GrapesJS để edit lại block sau này
  @Prop({ required: true })
  projectData?: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const WidgetBlockSchema = SchemaFactory.createForClass(WidgetBlock);

// Unique name theo tenant để tránh trùng
WidgetBlockSchema.index({ tenantId: 1, name: 1 }, { unique: true });
```

---

## 5) DTOs

### 5.1 Create DTO

Tạo file: `src/widget-blocks/dto/create-widget-block.dto.ts`

```ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWidgetBlockDto {
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  html: string;

  @IsOptional()
  @IsString()
  css?: string;

  @IsNotEmpty()
  projectData?: string;
}
```

### 5.2 Update DTO

Tạo file: `src/widget-blocks/dto/update-widget-block.dto.ts`

```ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateWidgetBlockDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  imageId?: string;

  @IsOptional()
  @IsString()
  html?: string;

  @IsOptional()
  @IsString()
  css?: string;

  @IsOptional()
  projectData?: string;

  @IsOptional()
  isActive?: boolean;
}
```

### 5.3 List DTO (Query)

Tạo file: `src/widget-blocks/dto/list-widget-blocks.dto.ts`

```ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ListWidgetBlocksDto {
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsOptional()
  @IsString()
  search?: string;
}
```

---

## 6) Service

Tạo file: `src/widget-blocks/widget-blocks.service.ts`

```ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateWidgetBlockDto } from './dto/create-widget-block.dto';
import { UpdateWidgetBlockDto } from './dto/update-widget-block.dto';
import { ListWidgetBlocksDto } from './dto/list-widget-blocks.dto';
import { WidgetBlock, WidgetBlockDocument } from './schemas/widget-block.schema';

@Injectable()
export class WidgetBlocksService {
  constructor(
    @InjectModel(WidgetBlock.name)
    private readonly widgetBlockModel: Model<WidgetBlockDocument>,
  ) {}

  async create(dto: CreateWidgetBlockDto) {
    const doc = await this.widgetBlockModel.create({
      ...dto,
      isActive: true,
    });
    return doc.toObject();
  }

  async findAll(query: ListWidgetBlocksDto) {
    const filter: FilterQuery<WidgetBlockDocument> = {
      tenantId: query.tenantId,
      isActive: true,
    };

    if (query.search?.trim()) {
      filter.name = { $regex: query.search.trim(), $options: 'i' };
    }

    return this.widgetBlockModel.find(filter).sort({ updatedAt: -1 }).lean();
  }

  async findOne(id: string, tenantId: string) {
    const doc = await this.widgetBlockModel.findOne({ _id: id, tenantId }).lean();
    if (!doc) throw new NotFoundException('Widget block not found');
    return doc;
  }

  async update(id: string, tenantId: string, dto: UpdateWidgetBlockDto) {
    const doc = await this.widgetBlockModel.findOneAndUpdate({ _id: id, tenantId }, dto, { new: true }).lean();

    if (!doc) throw new NotFoundException('Widget block not found');
    return doc;
  }

  async remove(id: string, tenantId: string) {
    // Soft delete
    const doc = await this.widgetBlockModel
      .findOneAndUpdate({ _id: id, tenantId }, { isActive: false }, { new: true })
      .lean();

    if (!doc) throw new NotFoundException('Widget block not found');
    return { success: true };
  }
}
```

---

## 7) Controller

Tạo file: `src/widget-blocks/widget-blocks.controller.ts`

```ts
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateWidgetBlockDto } from './dto/create-widget-block.dto';
import { UpdateWidgetBlockDto } from './dto/update-widget-block.dto';
import { ListWidgetBlocksDto } from './dto/list-widget-blocks.dto';
import { WidgetBlocksService } from './widget-blocks.service';

@Controller('api/widget-blocks')
export class WidgetBlocksController {
  constructor(private readonly widgetBlocksService: WidgetBlocksService) {}

  // POST /api/widget-blocks
  @Post()
  create(@Body() dto: CreateWidgetBlockDto) {
    return this.widgetBlocksService.create(dto);
  }

  // GET /api/widget-blocks?tenantId=xxx&search=yyy
  @Get()
  findAll(@Query() query: ListWidgetBlocksDto) {
    return this.widgetBlocksService.findAll(query);
  }

  // GET /api/widget-blocks/:id?tenantId=xxx
  @Get(':id')
  findOne(@Param('id') id: string, @Query('tenantId') tenantId: string) {
    return this.widgetBlocksService.findOne(id, tenantId);
  }

  // PATCH /api/widget-blocks/:id?tenantId=xxx
  @Patch(':id')
  update(@Param('id') id: string, @Query('tenantId') tenantId: string, @Body() dto: UpdateWidgetBlockDto) {
    return this.widgetBlocksService.update(id, tenantId, dto);
  }

  // DELETE /api/widget-blocks/:id?tenantId=xxx
  @Delete(':id')
  remove(@Param('id') id: string, @Query('tenantId') tenantId: string) {
    return this.widgetBlocksService.remove(id, tenantId);
  }
}
```

---

## 8) Module

Tạo file: `src/widget-blocks/widget-blocks.module.ts`

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WidgetBlocksController } from './widget-blocks.controller';
import { WidgetBlocksService } from './widget-blocks.service';
import { WidgetBlock, WidgetBlockSchema } from './schemas/widget-block.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: WidgetBlock.name, schema: WidgetBlockSchema }])],
  controllers: [WidgetBlocksController],
  providers: [WidgetBlocksService],
  exports: [WidgetBlocksService],
})
export class WidgetBlocksModule {}
```

---

## 9) Import vào `AppModule`

```ts
import { Module } from '@nestjs/common';
import { WidgetBlocksModule } from './widget-blocks/widget-blocks.module';

@Module({
  imports: [WidgetBlocksModule],
})
export class AppModule {}
```

---

## 10) Test API nhanh

### 10.1 Create block

`POST http://localhost:3000/api/widget-blocks`

```json
{
  "tenantId": "sf-bus-lines",
  "name": "Most popular route",
  "imageUrl": "https://cdn.example.com/thumbs/most-popular.png",
  "html": "<section data-token=\"MOST_POPULAR_ROUTE\">...</section>",
  "css": ".route-card{border-radius:14px}",
  "projectData": { "mock": true }
}
```

### 10.2 List blocks

`GET http://localhost:3000/api/widget-blocks?tenantId=sf-bus-lines&search=route`

### 10.3 Update block

`PATCH http://localhost:3000/api/widget-blocks/<id>?tenantId=sf-bus-lines`

### 10.4 Delete block (soft)

`DELETE http://localhost:3000/api/widget-blocks/<id>?tenantId=sf-bus-lines`

---

## 11) Hook vào GrapesJS (Angular) để load block từ DB

Ví dụ: load blocks từ DB và add vào BlockManager:

```ts
async loadBlockLibrary(tenantId: string) {
  const res = await fetch(`/api/widget-blocks?tenantId=${tenantId}`);
  const blocks = await res.json();

  blocks.forEach((b: any) => {
    this.editor.BlockManager.add(`db-${b._id}`, {
      category: 'My Library',
      label: `
        <div style="display:flex;gap:8px;align-items:center">
          <img src="${b.imageUrl}" style="width:34px;height:34px;border-radius:8px;object-fit:cover"/>
          <div style="text-align:left">
            <div style="font-weight:600;font-size:12px">${b.name}</div>
            <div style="font-size:10px;opacity:.7">Tenant: ${b.tenantId}</div>
          </div>
        </div>
      `,
      content: b.html,
    });
  });
}
```

---

## 12) Best practices khuyến nghị

- **Soft delete** bằng `isActive=false` để dễ rollback.
- **Unique (tenantId + name)** để tránh trùng tên block.
- Khi render ở runtime, nên **sanitize HTML** để tránh XSS.
- Nếu bạn muốn edit block “chuẩn”, nên lưu `projectData` (GrapesJS JSON).

---

✅ Done.
