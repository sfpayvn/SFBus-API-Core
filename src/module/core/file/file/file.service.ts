import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  StreamableFile,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Connection, Model, mongo, Types } from 'mongoose';
import { FileDocument } from './schema/file.schema';
import { FileDto, SearchFilesQuerySortFilter, SearchFilesRes } from './dto/file.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateFileDto } from './dto/update-file.dto';
import { createHash } from 'crypto';
import slugify from 'slugify';
import { extension as getMimeExtension } from 'mime-types';

type Request = FastifyRequest;
type Response = FastifyReply;

@Injectable()
export class FileService {
  private readonly bucket: any;

  constructor(
    @InjectModel(FileDocument.name) private readonly fileModel: Model<FileDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {
    if (!this.connection.db) {
      throw new ServiceUnavailableException('Database connection is not available');
    }
    this.bucket = new mongo.GridFSBucket(this.connection.db);
  }

  async upload(
    request: any,
    folderId: Types.ObjectId,
    tenantId: Types.ObjectId,
    isMedia: boolean = false,
  ): Promise<FileDto[]> {
    const filesToUpload: any[] = [];
    const files: FileDto[] = [];

    for await (const part of request.files()) {
      if (part.type === 'file') {
        const fileContent = await this.readFileContentBuffer(part.file);
        const hash = await this.calculateBufferHash(fileContent);
        const existingFile = await this.checkIfFileExists(hash);
        if (existingFile) {
          files.push(existingFile);
        } else {
          filesToUpload.push({ part, fileContent, hash });
        }
      }
    }

    // Đợi tất cả các upload hoàn thành
    await Promise.all(
      filesToUpload.map(async ({ part, fileContent, hash }) => {
        const id = new Types.ObjectId();
        const uploadStream = this.bucket.openUploadStreamWithId(id, part.filename, {
          contentType: part.mimetype,
          metadata: {
            hash,
            folderId: folderId,
            isFavorite: false,
            tenantId,
            isMedia,
          },
        });

        await new Promise<void>((resolve, reject) => {
          uploadStream.end(fileContent, (err: any) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
        const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
        const file: FileDto = {
          _id: id,
          tenantId,
          filename: part.filename,
          link: `${process.env.DOMAIN}${port}/file/view/${id.toString()}`,
          contentType: part.mimetype,
          folderId: folderId,
          isFavorite: false,
        };

        files.push(file);
      }),
    );

    return files;
  }

  async readFileContentBuffer(fileStream: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      fileStream.on('data', (chunk: any) => chunks.push(chunk));
      fileStream.on('end', () => resolve(Buffer.concat(chunks)));
      fileStream.on('error', reject);
    });
  }

  async calculateBufferHash(buffer: Buffer): Promise<string> {
    return createHash('sha256').update(buffer).digest('hex');
  }

  async checkIfFileExists(hash: string): Promise<FileDto | null> {
    const file = await this.fileModel.findOne({ 'metadata.hash': hash }).lean().exec();

    if (file) {
      const obj = file;
      const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : ''; 
      return plainToInstance(FileDto, {
        ...obj,
        link: `${process.env.DOMAIN}${port}/file/view/${file._id}`,
      });
    }

    return null;
  }

  async download(
    id: string,
    request: Request,
    response: Response,
    tenantId: Types.ObjectId,
  ): Promise<StreamableFile | undefined> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException(null, 'InvalidVideoId');
      }

      const oId = new Types.ObjectId(id);
      const fileInfo = await this.fileModel.findOne({ _id: id, 'metadata.tenantId': tenantId }).lean().exec();

      if (!fileInfo) {
        throw new NotFoundException(null, 'VideoNotFound');
      }

      if (request.headers.range) {
        const range = request.headers.range.substr(6).split('-');
        const start = parseInt(range[0], 10);
        const end = parseInt(range[1], 10) || null;
        const readstream = this.bucket.openDownloadStream(oId, {
          start,
          end,
        });

        response.status(206);
        response.headers({
          'Accept-Ranges': 'bytes',
          'Content-Type': fileInfo.contentType,
          'Content-Range': `bytes ${start}-${end ? end : fileInfo.length - 1}/${fileInfo.length}`,
          'Content-Length': (end ? end : fileInfo.length) - start,
          'Content-Disposition': `attachment; filename="${fileInfo.filename}"`,
        });

        return new StreamableFile(readstream);
      } else {
        const readstream = this.bucket.openDownloadStream(oId);

        response.status(200);
        response.headers({
          'Accept-Range': 'bytes',
          'Content-Type': fileInfo.contentType,
          'Content-Length': fileInfo.length,
          'Content-Disposition': `attachment; filename="${fileInfo.filename}"`,
        });

        response.send(readstream);
        return new StreamableFile(readstream);
      }
    } catch (e) {
      console.error(e);
      throw new ServiceUnavailableException();
    }
  }

  async viewFile(id: string, response: Response): Promise<StreamableFile> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException(null, 'InvalidFileId');
      }

      const oId = new Types.ObjectId(id);
      const fileInfo = await this.fileModel.findOne({ _id: id }).lean().exec();

      if (!fileInfo) {
        throw new NotFoundException(null, 'FileNotFound');
      }

      const readstream = this.bucket.openDownloadStream(oId);

      response.status(200);

      const originalFilename = fileInfo.filename;
      const extension = getMimeExtension(fileInfo.contentType); // get đuôi file từ contentType
      const baseFilename = originalFilename.replace(/\.[^/.]+$/, ''); // Loại bỏ phần mở rộng từ tên file
      const cleanFilename = slugify(baseFilename, { lower: true, remove: /[*+~.()'"!:@]/g }); // Loại bỏ các ký tự đặc biệt từ tên file
      const finalFilename = extension ? `${cleanFilename}.${extension}` : cleanFilename; // Nếu có đuôi file thì thêm vào tên file

      response.headers({
        'Accept-Ranges': 'bytes',
        'Content-Type': fileInfo.contentType,
        'Content-Length': fileInfo.length,
        'Content-Disposition': `inline; filename="${finalFilename}"`,
      });

      return new StreamableFile(readstream);
    } catch (e) {
      console.error(e);
      throw new ServiceUnavailableException();
    }
  }

  async update(updateFileDto: UpdateFileDto, tenantId: Types.ObjectId): Promise<FileDto> {
    // Tạo một đối tượng update để sử dụng dot notation
    const updateData: any = {};
    if (updateFileDto) {
      updateData[`filename`] = updateFileDto.filename;
      updateData[`metadata.folderId`] = updateFileDto.folderId;
      updateData[`metadata.isFavorite`] = updateFileDto.isFavorite;
    }

    // Cập nhật dữ liệu sử dụng $set và updateData
    const updatedFileFolder = await this.fileModel
      .findOneAndUpdate({ _id: updateFileDto._id, 'metadata.tenantId': tenantId }, { $set: updateData }, { new: true })
      .lean()
      .exec();

    if (!updatedFileFolder) {
      throw new NotFoundException(`File with ID "${updateFileDto._id}" not found.`);
    }
    const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
    const result = plainToInstance(FileDto, {
      ...updatedFileFolder,
      folderId: updatedFileFolder.metadata?.folderId,
      isFavorite: updatedFileFolder.metadata?.isFavorite,
      link: `${process.env.DOMAIN}${port}/file/view/${updatedFileFolder._id}`,
    });

    return result;
  }

  async updateFilesFolder(
    updateFilesDto: UpdateFileDto[],
    folderId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<FileDto[]> {
    const bulkOps = await Promise.all(
      updateFilesDto.map(async (updateFileDto: UpdateFileDto) => {
        const updateData: any = {};
        if (updateFileDto.filename) updateData['filename'] = updateFileDto.filename;
        if (folderId) updateData['metadata.folderId'] = folderId;
        if (updateFileDto.isFavorite !== undefined) updateData['metadata.isFavorite'] = updateFileDto.isFavorite;

        return {
          updateOne: {
            filter: { _id: updateFileDto._id, 'metadata.tenantId': tenantId },
            update: { $set: updateData },
          },
        };
      }),
    );

    const bulkWriteResult = await this.fileModel.bulkWrite(bulkOps);
    const updatedFileIds = bulkOps.map((op) => op.updateOne.filter._id);

    const updatedFiles = await this.fileModel
      .find({
        _id: { $in: updatedFileIds },
        tenantId,
      })
      .exec();
    const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
    return updatedFiles.map((file) =>
      plainToInstance(FileDto, {
        ...file,
        folderId: folderId,
        isFavorite: file.metadata?.isFavorite,
        link: `${process.env.DOMAIN}${port}/file/view/${file._id}`,
      }),
    );
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    try {
      const fileExists = await this.fileModel.findOne({ _id: id, 'metadata.tenantId': tenantId }).lean().exec();
      if (!fileExists) {
        throw new NotFoundException(`File with ID ${id} not found for this tenant`);
      }
      await this.bucket.delete(id);
      return true;
    } catch (error) {
      throw new Error(`Unable to delete file with ID ${id}`);
    }
  }

  async deleteFiles(ids: Types.ObjectId[], tenantId: Types.ObjectId): Promise<boolean> {
    try {
      const existingFiles = await this.fileModel
        .find({ _id: { $in: ids }, 'metadata.tenantId': tenantId })
        .lean()
        .exec();
      const existingIds = existingFiles.map((file) => file._id);

      const deletePromises = existingIds.map((id) => this.bucket.delete(id));
      await Promise.all(deletePromises);
      return true;
    } catch (error) {
      throw new Error(`Unable to delete files with IDs ${ids}`);
    }
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchFilesQuerySortFilter,
    filters: SearchFilesQuerySortFilter[],
    tenantIds: Types.ObjectId[],
    fileFolderId: Types.ObjectId | null,
  ): Promise<SearchFilesRes> {
    const pipeline = await this.buildQuerySearchFiles(
      pageIdx,
      pageSize,
      keyword,
      sortBy,
      filters,
      fileFolderId,
      tenantIds,
    );

    // Thực hiện tìm kiếm
    const files = await this.fileModel.aggregate(pipeline).exec();

    // Đếm tổng số mục
    const totalItem = await this.fileModel.countDocuments({ 'metadata.tenantId': { $in: tenantIds } });
    const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
    const result = plainToInstance(
      FileDto,
      files.map((file) => {
        return {
          ...file, // sao chép tất cả các thuộc tính của obj
          folderId: file.metadata?.folderId,
          tenantId: file.metadata?.tenantId,
          isFavorite: file.metadata?.isFavorite,
          link: `${process.env.DOMAIN}${port}/file/view/${file._id}`, // thêm thuộc tính link với giá trị mong muốn
        };
      }),
    );

    return {
      pageIdx,
      files: result,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearchFiles(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchFilesQuerySortFilter,
    filters: SearchFilesQuerySortFilter[],
    fileFolderId: Types.ObjectId | null,
    tenantIds: Types.ObjectId[],
  ) {
    // Thêm điều kiện kiểm tra điểm khởi hành nếu có

    const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;

    const pipeline: any = [];
    const matchConditions: any[] = [{ 'metadata.tenantId': { $in: tenantIds } }, { 'metadata.isMedia': true }];

    if (fileFolderId) {
      matchConditions.push({ 'metadata.folderId': fileFolderId });
    }

    // 1. Tìm theo keyword
    if (keyword) {
      matchConditions.push({
        $or: [{ name: { $regex: keyword, $options: 'i' } }],
      });
    }

    // 2. Xác định start/end date và các filter còn lại
    let startDateValue: string = '';
    let endDateValue: string = '';

    if (Array.isArray(filters)) {
      await Promise.all(
        filters.map(async ({ key, value }) => {
          if (!key || value == null) return;

          if (key === 'startDate') {
            startDateValue = value;
          } else if (key === 'endDate') {
            endDateValue = value;
          } else if (key === 'endDate') {
            endDateValue = value;
          } else if (key === 'isFavorite') {
            matchConditions.push({ 'metadata.isFavorite': value });
          } else {
            matchConditions.push({ [key]: value });
          }
        }),
      );
    }

    // 3. Tạo điều kiện range cho createdAt nếu có startDate và/hoặc endDate
    if (startDateValue || endDateValue) {
      const rangeCond: any = {};
      if (startDateValue) rangeCond.$gte = startDateValue;
      if (endDateValue) rangeCond.$lte = endDateValue;

      matchConditions.push({ startDate: rangeCond });
    }

    // 4. Đẩy $match nếu có bất kỳ điều kiện nào
    if (matchConditions.length) {
      pipeline.push({
        $match: { $and: matchConditions },
      });
    }

    // 4. $sort
    if (sortBy?.key) {
      pipeline.push({
        $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
      });
    }

    // 5. paging: $skip + $limit
    pipeline.push({ $skip: skip }, { $limit: pageSize });
    return pipeline;
  }
}
