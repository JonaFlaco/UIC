import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators';
import { CreateEnrollmentDto, FilterEnrollmentDto, UpdateEnrollmentDto } from '@uic/dto';
import { EnrollmentEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
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
import { EnrollmentsService } from '../services/enrollments.service';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private enrollmentService: EnrollmentsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateEnrollmentDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.enrollmentService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Enrollment created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.enrollmentService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `Catalogue`,
    };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterEnrollmentDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.enrollmentService.findAll(params);

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
    const serviceResponse = await this.enrollmentService.findOne(id);

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
    @Body() payload: UpdateEnrollmentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.enrollmentService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Enrollment updated ${id}`,
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
    const serviceResponse = await this.enrollmentService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Enrollment deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: EnrollmentEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.enrollmentService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Enrollment deleted`,
      title: `Deleted`,
    };
  }
}
