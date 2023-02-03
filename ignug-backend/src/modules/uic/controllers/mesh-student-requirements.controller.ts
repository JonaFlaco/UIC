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
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { MeshStudentRequirementsService } from '@uic/services';
import { CreateMeshStudentRequirementDto, UpdateMeshStudentRequirementDto } from '@uic/dto';
import { CatalogueEntity, MeshStudentRequirementEntity } from '@uic/entities';
import { Auth } from '@auth/decorators';
import { FilterMeshStudentRequirementDto } from '../dto/mesh-student-requirements/filter-mesh-student-requirement.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags('mesh-student-requirements')
@Controller('mesh-student-requirements')
export class MeshStudentRequirementsController {
  constructor(private meshStudentRequirementService: MeshStudentRequirementsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateMeshStudentRequirementDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.meshStudentRequirementService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Mesh Student Requirement created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.meshStudentRequirementService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `mesh student requirement`,
      title: `Mesh Student Requirement`,
    };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterMeshStudentRequirementDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.meshStudentRequirementService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.meshStudentRequirementService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `show ${id}`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update One' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateMeshStudentRequirementDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.meshStudentRequirementService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Mesh Student Requirement updated ${id}`,
      title: `Updated`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.meshStudentRequirementService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Mesh Student Requirement deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: MeshStudentRequirementEntity[]
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.meshStudentRequirementService.removeAll(
      payload);

    return {
      data: serviceResponse.data,
      message: `Mesh Student Requirements deleted`,
      title: `Deleted`,
    };
  }

  @Post('mesh-student-requirements')
  @UseInterceptors(
    FileInterceptor('file', {
      // fileFiter: filterFileHelper,
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    return 'hola';
    return file;
  }
}
