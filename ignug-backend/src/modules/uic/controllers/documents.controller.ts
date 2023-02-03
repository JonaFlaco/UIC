import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
//import { Uic } from '@uic/decorators';
import { CreateDocumentDto, FilterDocumentDto, UpdateDocumentDto } from '@uic/dto';
import { DocumentEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { DocumentsService } from '@uic/services';
import { Auth } from '@auth/decorators';

@ApiTags('documents')
@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateDocumentDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Document created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentsService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `Catalogue`,
    };
  }

  /*}@ApiOperation({ summary: 'Documents for sidebar' })
  @Get('sidebar')
  @HttpCode(HttpStatus.OK)
  async getDocumentsForSidebar(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentsService.getDocumentsForSidebar();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Catalogue for Sidebar`,
      title: `Catalogue for Sidebar`,
    };
  }*/

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterDocumentDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentsService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One' })
  @Auth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentsService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `show ${id}`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update One' })
  @Auth()
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateDocumentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentsService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Document updated ${id}`,
      title: `Updated`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Document deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: DocumentEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentsService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Documents deleted`,
      title: `Deleted`,
    };
  }
}