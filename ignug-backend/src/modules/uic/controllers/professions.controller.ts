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
import { CreateProfessionDto, FilterProfessionDto, UpdateProfessionDto } from '@uic/dto';
import { ProfessionEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { ProfessionsService } from '@uic/services';
import { Auth } from '@auth/decorators';

@ApiTags('professions')
@Controller('professions')
export class ProfessionsController {
  constructor(private professionsService: ProfessionsService) {}

  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateProfessionDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.professionsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Profession created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.professionsService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `Catalogue`,
    };
  }

  /*}@ApiOperation({ summary: 'Professions for sidebar' })
  @Get('sidebar')
  @HttpCode(HttpStatus.OK)
  async getProfessionsForSidebar(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.professionsService.getProfessionsForSidebar();

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
  async findAll(@Query() params: FilterProfessionDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.professionsService.findAll(params);

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
    const serviceResponse = await this.professionsService.findOne(id);

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
    @Body() payload: UpdateProfessionDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.professionsService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Profession updated ${id}`,
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
    const serviceResponse = await this.professionsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Profession deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: ProfessionEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.professionsService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Professions deleted`,
      title: `Deleted`,
    };
  }
}