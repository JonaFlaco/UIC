import { Auth } from '@auth/decorators';
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
import { ResponseHttpModel } from '@shared/models';
import { CreateTutorAssignmentDto, FilterTutorAssignmentDto, UpdateTutorAssignmentDto } from '@uic/dto';
import { TutorAssignmentEntity } from '@uic/entities';
import { TutorAssignmentsService } from '@uic/services';

@ApiTags('tutor-assignments')
@Controller('tutor-assignments')
export class TutorAssignmentsController {
  constructor(private tutorAssignmentsService: TutorAssignmentsService) {}

  @ApiOperation({ summary: 'Create One' })
  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateTutorAssignmentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.tutorAssignmentsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'TutorAssignment created',
      title: 'Created',
    };
  }
  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.tutorAssignmentsService.catalogue();

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
  async findAll(
    @Query() params: FilterTutorAssignmentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.tutorAssignmentsService.findAll(params);

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
    const serviceResponse = await this.tutorAssignmentsService.findOne(id);

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
    @Body() payload: UpdateTutorAssignmentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.tutorAssignmentsService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `tutor assignment updated ${id}`,
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
    const serviceResponse = await this.tutorAssignmentsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `tutor assignment deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: TutorAssignmentEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.tutorAssignmentsService.removeAll(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Tutor Assignment deleted`,
      title: `Deleted`,
    };
  }
}
