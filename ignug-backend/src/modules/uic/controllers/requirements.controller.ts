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
import { CreateRequirementDto, FilterRequirementDto, UpdateRequirementDto } from '@uic/dto';
import { RequirementEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { RequirementsService } from '@uic/services';

@ApiTags('Requirements')
@Controller('requirements')
export class RequirementsController {
  constructor(private requirementsService: RequirementsService) { }

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateRequirementDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Requirement created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementsService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `Catalogue`,
    };
  }

  // @ApiOperation({ summary: 'Requirements for sidebar' })
  // @Get('sidebar')
  // @HttpCode(HttpStatus.OK)
  // async getRequirementsForSidebar(): Promise<ResponseHttpModel> {
  //   const serviceResponse = await this.requirementsService.getRequirementsForSidebar();

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
  async findAll(@Query() params: FilterRequirementDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementsService.findAll(params);

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
    const serviceResponse = await this.requirementsService.findOne(id);

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
    @Body() payload: UpdateRequirementDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementsService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Requirement updated ${id}`,
      title: `Updated`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Requirement deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: RequirementEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.requirementsService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Requirements deleted`,
      title: `Deleted`,
    };
  }
}
