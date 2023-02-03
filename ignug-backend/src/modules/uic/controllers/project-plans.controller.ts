import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '@auth/decorators';
import { CreateProjectPlanDto, FilterProjectPlanDto, UpdateProjectPlanDto } from '@uic/dto';
import { ProjectPlansService } from '@uic/services';
import { ProjectPlanEntity } from '@uic/entities';
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

@ApiTags('ProjectPlans')
@Controller('projectPlans')
export class ProjectPlansController {
  constructor(private projectPlansService: ProjectPlansService) {}

  @ApiOperation({ summary: 'Create One' })
  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateProjectPlanDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.projectPlansService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Project Plan created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.projectPlansService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `Catalogue`,
    };
  }

  // @ApiOperation({ summary: 'ProjectPlans for sidebar' })
  // @Get('sidebar')
  // @HttpCode(HttpStatus.OK)
  // async getProjectPlansForSidebar(): Promise<ResponseHttpModel> {
  //   const serviceResponse = await this.projectPlansService.getProjectPlansForSidebar();

  //   return {
  //     data: serviceResponse.data,
  //     pagination: serviceResponse.pagination,
  //     message: `catalogue`,
  //     title: `Catalogue`,
  //   };
  // }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterProjectPlanDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.projectPlansService.findAll(params);

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
    const serviceResponse = await this.projectPlansService.findOne(id);

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
    @Body() payload: UpdateProjectPlanDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.projectPlansService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Project Plan updated ${id}`,
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
    const serviceResponse = await this.projectPlansService.remove(id);

    return {
      data: serviceResponse.data,
      message: `ProjectPlan deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: ProjectPlanEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.projectPlansService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `ProjectPlans deleted`,
      title: `Deleted`,
    };
  }
}
