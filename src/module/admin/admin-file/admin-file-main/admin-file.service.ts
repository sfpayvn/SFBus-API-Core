import { FileDto, SearchFilesQuerySortFilter, SearchFilesRes } from '@/module/core/file/file/dto/file.dto';
import { UpdateFileDto } from '@/module/core/file/file/dto/update-file.dto';
import { FileService } from '@/module/core/file/file/file.service';
import { FileDocument } from '@/module/core/file/file/schema/file.schema';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  StreamableFile,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Connection, Model, mongo, Types } from 'mongoose';
import { AdminFileDto, AdminSearchFilesQuerySortFilter, AdminSearchFilesRes } from './dto/admin-file.dto';
import { AdminUpdateFileDto } from './dto/admin-update-file.dto';

type Request = FastifyRequest;
type Response = FastifyReply;

@Injectable()
export class AdminFileService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(FileDocument.name) private readonly fileModel: Model<FileDocument>,
    @Inject(forwardRef(() => FileService))
    private readonly fileService: FileService,
  ) {}

  async upload(
    request: any,
    folderId: Types.ObjectId,
    tenantId: Types.ObjectId,
    isMedia: boolean = false,
  ): Promise<AdminFileDto[]> {
    return this.fileService.upload(request, folderId, tenantId, isMedia);
  }

  async download(
    id: string,
    request: Request,
    response: Response,
    tenantId: Types.ObjectId,
  ): Promise<StreamableFile | undefined> {
    return this.fileService.download(id, request, response, tenantId);
  }

  async viewFile(id: string, response: Response): Promise<StreamableFile> {
    return this.fileService.viewFile(id, response);
  }

  async update(adminUpdateFileDto: AdminUpdateFileDto, tenantId: Types.ObjectId): Promise<FileDto> {
    return this.fileService.update(adminUpdateFileDto, tenantId);
  }

  async updateFilesFolder(
    adminUpdateFileDto: AdminUpdateFileDto[],
    folderId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<FileDto[]> {
    return this.fileService.updateFilesFolder(adminUpdateFileDto, folderId, tenantId);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.fileService.delete(id, tenantId);
  }

  async deleteFiles(ids: Types.ObjectId[], tenantId: Types.ObjectId): Promise<boolean> {
    return this.fileService.deleteFiles(ids, tenantId);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchFilesQuerySortFilter,
    filters: AdminSearchFilesQuerySortFilter[],
    tenantIds: Types.ObjectId[],
    fileFolderId: Types.ObjectId | null,
  ): Promise<AdminSearchFilesRes> {
    const res = await this.fileService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds, fileFolderId);

    const rootIdStr = this.ROOT_TENANT_ID;

    const files = (res.files ?? []).map((file: AdminFileDto) => {
      // ✅ Chỉ so sánh _id với rootId (đưa về string, không tạo ObjectId mới)
      file.isDefault = file.tenantId.toString() === rootIdStr;

      if (file.isDefault) {
        file.isFavorite = false;
      }

      // ✅ Không trả về tenantId
      delete (file as any).tenantId;
      delete (file as any).tenantId;

      return file;
    });

    return { ...res, files };
  }
}
