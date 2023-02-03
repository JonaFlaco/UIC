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
import { CreateModalityDto, FilterModalityDto, UpdateModalityDto } from '@uic/dto';
import { ModalityEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { ModalitiesService } from '@uic/services';

@ApiTags('modalities')
@Controller('modalities')
export class ModalitiesController {
  constructor(private modalitiesService: ModalitiesService) { }

  @ApiOperation({ summary: 'Create One' })
  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateModalityDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.modalitiesService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Modality created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.modalitiesService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `Catalogue`,
    };
  }

  // @ApiOperation({ summary: 'Modalities for sidebar' })
  // @Get('sidebar')
  // @HttpCode(HttpStatus.OK)
  // async getModalitiesForSidebar(): Promise<ResponseHttpModel> {
  //   const serviceResponse = await this.modalitiesService.getModalitiesForSidebar();

  //   return {
  //     data: serviceResponse.data,
  //     pagination: serviceResponse.pagination,
  //     message: `Catalogue for Sidebar`,
  //     title: `Catalogue for Sidebar`,
  //   };
  // }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterModalityDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.modalitiesService.findAll(params);

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
    const serviceResponse = await this.modalitiesService.findOne(id);

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
    @Body() payload: UpdateModalityDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.modalitiesService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Modality updated ${id}`,
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
    const serviceResponse = await this.modalitiesService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Modality deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: ModalityEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.modalitiesService.removeAll(
      payload
    );

    return {
      data: serviceResponse.data,
      message: `Modalities deleted`,
      title: `Deleted`,
    };
  }
}
