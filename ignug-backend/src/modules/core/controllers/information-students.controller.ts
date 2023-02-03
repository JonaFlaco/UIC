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

import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  CreateInformationStudentDto,
  FilterInformationStudentDto,
  UpdateInformationStudentDto,
} from '@core/dto';
import { InformationStudentEntity } from '@core/entities';
import { InformationStudentsService } from '@core/services';
import { ResponseHttpModel } from '@shared/models';

@ApiTags('Information Students')
@Controller('information-students')
export class InformationStudentsController {
  constructor(private informationStudentsService: InformationStudentsService) {}

  @ApiOperation({ summary: 'Create information students' })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateInformationStudentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.create(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'List of information students' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterInformationStudentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.findAll(
      params,
    );
    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'View one information students' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.findOne(id);
    return {
      data: serviceResponse.data,
      message: `show ${id}`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update information students' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateInformationStudentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Information Student  updated ${id}`,
      title: `Updated`,
    };
  }

  @ApiOperation({ summary: 'Remove information students' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.remove(id);
    return {
      data: serviceResponse.data,
      message: `Information Student deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All Information Students' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: InformationStudentEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.informationStudentsService.removeAll(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Information Students deleted`,
      title: `Deleted`,
    };
  }
}
