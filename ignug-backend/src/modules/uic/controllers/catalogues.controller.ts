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
import { CatalogueService } from '@uic/services';
import { CreateCatalogueDto, FilterCatalogueDto, UpdateCatalogueDto } from '@uic/dto';
import { CatalogueEntity } from '@uic/entities';


@ApiTags('Catalogues')
@Controller('catalogues-uic')
export class CatalogueController {
  constructor(private catalogueService: CatalogueService) {}

  @ApiOperation({ summary: 'Create One' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateCatalogueDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Catalogue created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueService.catalogues();

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
  async findAll(@Query() params: FilterCatalogueDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueService.findAll(params);

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
    const serviceResponse = await this.catalogueService.findOne(id);

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
    @Body() payload: UpdateCatalogueDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Catalogue updated ${id}`,
      title: `Updated`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Catalogue deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: CatalogueEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Catalogues deleted`,
      title: `Deleted`,
    };
  }
}
