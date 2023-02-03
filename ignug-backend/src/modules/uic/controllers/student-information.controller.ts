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
import {
  CreateStudentInformationDto,
  FilterStudentInformationDto,
  UpdateStudentInformationDto,
} from '@uic/dto';
import { StudentInformationEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { StudentInformationsService } from '@uic/services';
import { Auth } from '@auth/decorators';

@ApiTags('student-informations')
@Controller('student-informations')
export class StudentInformationsController {
  constructor(private studentInformationsService: StudentInformationsService) {}

  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateStudentInformationDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentInformationsService.create(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'Student Information created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentInformationsService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `Catalogue`,
    };
  }

  /*}@ApiOperation({ summary: 'Events for sidebar' })
    @Get('sidebar')
    @HttpCode(HttpStatus.OK)
    async getEventsForSidebar(): Promise<ResponseHttpModel> {
      const serviceResponse = await this.studentInformationsService.getEventsForSidebar();
  
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
  async findAll(
    @Query() params: FilterStudentInformationDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentInformationsService.findAll(
      params,
    );

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
    const serviceResponse = await this.studentInformationsService.findOne(id);

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
    @Body() payload: UpdateStudentInformationDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentInformationsService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Student Information updated ${id}`,
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
    const serviceResponse = await this.studentInformationsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Student Information deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: StudentInformationEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.studentInformationsService.removeAll(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Student Information deleted`,
      title: `Deleted`,
    };
  }
}
