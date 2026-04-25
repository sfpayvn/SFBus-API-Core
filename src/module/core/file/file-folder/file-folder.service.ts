import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FileFolderDto } from './dto/file-folder.dto';
import { CreateFileFolderDto } from './dto/create-file-folderdto';
import { UpdateFileFolderDto } from './dto/update-file-folder.dto';
import { FileFolderDocument } from './schema/file-folder.schema';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FileFolderService {
  constructor(@InjectModel(FileFolderDocument.name) private readonly fileFolderModel: Model<FileFolderDocument>) {}

  async create(createFileFolderDto: CreateFileFolderDto, tenantId: Types.ObjectId): Promise<FileFolderDto> {
    const createFileFolder = new this.fileFolderModel({ ...createFileFolderDto, tenantId });
    const savedFileFolder = await createFileFolder.save();
    return plainToInstance(FileFolderDto, savedFileFolder);
  }

  async findAll(tenantId: Types.ObjectId): Promise<FileFolderDto[]> {
    const fileFolders = await this.fileFolderModel.find({ tenantId }).lean().exec();
    return fileFolders.map((fileFolder) => plainToInstance(FileFolderDto, fileFolder));
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<FileFolderDto> {
    const fileFolder = await this.fileFolderModel.findOne({ _id: id, tenantId }).lean().exec();
    if (!fileFolder) {
      throw new NotFoundException(`File folder with ID "${id}" not found.`);
    }
    return plainToInstance(FileFolderDto, fileFolder);
  }

  async update(updateFileFolderDto: UpdateFileFolderDto, tenantId: Types.ObjectId): Promise<FileFolderDto> {
    const updatedFileFolder = await this.fileFolderModel
      .findOneAndUpdate({ _id: updateFileFolderDto._id, tenantId }, updateFileFolderDto, { new: true })
      .lean()
      .exec();
    if (!updatedFileFolder) {
      throw new NotFoundException(`File folder with ID "${updateFileFolderDto._id}" not found.`);
    }
    return plainToInstance(FileFolderDto, updatedFileFolder);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.fileFolderModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    return result !== null;
  }
}
