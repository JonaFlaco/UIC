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
import { Auth } from '@auth/decorators';
//import { Uic } from '@uic/decorators';
import { CreateStudentDto, FilterStudentDto, UpdateStudentDto } from '@uic/dto';
import { StudentEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { StudentsService } from '@uic/services';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateStudentDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Student created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentsService.catalogue();

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
  async findAll(@Query() params: FilterStudentDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentsService.findAll(params);

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
    const serviceResponse = await this.studentsService.findOne(id);

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
    @Body() payload: UpdateStudentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentsService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Student updated ${id}`,
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
    const serviceResponse = await this.studentsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Student deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: StudentEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentsService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Student deleted`,
      title: `Deleted`,
    };
  }
}
