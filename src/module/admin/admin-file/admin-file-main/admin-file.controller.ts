import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  StreamableFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Roles } from '@/decorators/roles.decorator';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';
import { Types } from 'mongoose';
import { AdminFileService } from './admin-file.service';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminFileDto, AdminSearchFilesQuery } from './dto/admin-file.dto';
import { AdminUpdateFileDto } from './dto/admin-update-file.dto';
import { TenantScope, TenantScopeResult } from '@/common/tenant/tenant-scope';
import { MarkDefaultTenant } from '@/interceptors/mark-default-tenant';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

type Request = FastifyRequest;
type Response = FastifyReply;

@ApiTags('AdminFile')
@Controller('admin/file')
export class AdminUploadController {
  constructor(private readonly adminFileService: AdminFileService) {}

  // @ApiOperation({
  //   summary: 'Upload a file.',
  //   requestBody: {
  //     content: {
  //       'multipart/form-data': {
  //         schema: {
  //           type: 'object',
  //           properties: { file: { type: 'string', format: 'binary' } },
  //         },
  //       },
  //     },
  //   },
  // })
  // @ApiConsumes('multipart/form-data')
  // @ApiCreatedResponse({
  //   schema: {
  //     properties: {
  //       id: {
  //         type: 'string',
  //         example: '5e2b4cb75876c93e38b6e6aa',
  //       },
  //     },
  //   },
  // })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('upload-file/:folderId')
  uploadFile(
    @Param('folderId', ParseObjectIdPipe) folderId: Types.ObjectId,
    @Req() request: Request,
    @CurrentUser(ParseObjectIdPipe) userTokenDto: UserTokenDto,
  ): Promise<AdminFileDto[]> {
    const { tenantId } = userTokenDto;

    return this.adminFileService.upload(request, folderId, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('upload-file-save-to-media/:folderId')
  uploadFileSaveToMedia(
    @Param('folderId', ParseObjectIdPipe) folderId: Types.ObjectId,
    @Req() request: Request,
    @CurrentUser(ParseObjectIdPipe) userTokenDto: UserTokenDto,
  ): Promise<AdminFileDto[]> {
    const { tenantId } = userTokenDto;

    return this.adminFileService.upload(request, folderId, tenantId, true);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminFileService.delete(id, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Post('delete-files')
  deleteFiles(@Body(ParseObjectIdPipe) ids: Types.ObjectId[], @CurrentUser(ParseObjectIdPipe) user: UserTokenDto) {
    const { tenantId } = user;
    return this.adminFileService.deleteFiles(ids, tenantId);
  }

  @ApiOperation({
    summary: 'Get a list of all uploaded files.',
  })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '5e2b447e4aadb800bccfb339' },
          length: { type: 'number', example: 730416 },
          chunkSize: { type: 'number', example: 261120 },
          uploadDate: { type: 'Date', example: '2020-01-24T19:24:46.366Z' },
          filename: { type: 'string', example: 'IMG_0359.jpeg' },
          md5: { type: 'string', example: 'ba230f0322784443c84ffbc5b6160c30' },
          contentType: { type: 'string', example: 'image/jpeg' },
        },
      },
    },
  })
  @ApiOperation({ summary: 'Download a file.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Get(':id')
  async downloadFile(
    @Param('id') id: string,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ): Promise<StreamableFile> {
    const { tenantId } = user;
    const file = await this.adminFileService.download(id, request, response, tenantId);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Put()
  update(
    @Body(ParseObjectIdPipe) adminUpdateFileDto: AdminUpdateFileDto,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminFileService.update(adminUpdateFileDto, tenantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @Put('/update-files-folder/:folderId')
  updateFilesFolder(
    @Param('folderId', ParseObjectIdPipe) folderId: Types.ObjectId,
    @Body(ParseObjectIdPipe) adminUpdateFileDto: AdminUpdateFileDto[],
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ) {
    const { tenantId } = user;
    return this.adminFileService.updateFilesFolder(adminUpdateFileDto, folderId, tenantId);
  }

  @ApiOperation({ summary: 'View a file online.' })
  @Get('view/:id')
  viewFile(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
    @CurrentUser(ParseObjectIdPipe) user: UserTokenDto,
  ): Promise<StreamableFile> {
    const { tenantId } = user;
    return this.adminFileService.viewFile(id, response);
  }

  @Post('search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLE_CONSTANTS.ADMIN, ROLE_CONSTANTS.TENANT, ROLE_CONSTANTS.TENANT_OPERATOR)
  @UseInterceptors(MarkDefaultTenant())
  search(@Body(ParseObjectIdPipe) query: AdminSearchFilesQuery, @TenantScope() tenantScope: TenantScopeResult) {
    const { tenantIds } = tenantScope;
    const {
      pageIdx = 0,
      pageSize = 0,
      keyword = '',
      sortBy = {
        key: 'createdAt',
        value: 'desc',
      },
      filters = [],
      fileFolderId = null,
    } = query;
    return this.adminFileService.search(+pageIdx, +pageSize, keyword, sortBy, filters, tenantIds, fileFolderId);
  }
}
