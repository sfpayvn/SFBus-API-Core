import { FileFolderDocument } from '@/module/core/file/file-folder/schema/file-folder.schema';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AdminCreateFileFolderDto } from './dto/admin-create-file-folderdto';
import { AdminFileFolderDto } from './dto/admin-file-folder.dto';
import { AdminUpdateFileFolderDto } from './dto/admin-update-file-folder.dto';
import { FileFolderService } from '@/module/core/file/file-folder/file-folder.service';

@Injectable()
export class AdminFileFolderService {
  constructor(
    @InjectModel(FileFolderDocument.name) private readonly fileFolderModel: Model<FileFolderDocument>,
    @Inject(forwardRef(() => FileFolderService))
    private readonly fileFolderService: FileFolderService,
  ) {}

  async create(
    adminCreateFileFolderDto: AdminCreateFileFolderDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminFileFolderDto> {
    return this.fileFolderService.create(adminCreateFileFolderDto, tenantId);
  }

  async findAll(tenantId: Types.ObjectId): Promise<AdminFileFolderDto[]> {
    return this.fileFolderService.findAll(tenantId);
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<AdminFileFolderDto> {
    return this.fileFolderService.findOne(id, tenantId);
  }

  async update(
    adminUpdateFileFolderDto: AdminUpdateFileFolderDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminFileFolderDto> {
    return this.fileFolderService.update(adminUpdateFileFolderDto, tenantId);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.fileFolderService.delete(id, tenantId);
  }
}
