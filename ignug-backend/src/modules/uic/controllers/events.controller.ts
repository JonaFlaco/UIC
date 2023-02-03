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
import { CreateEventDto, FilterEventDto, UpdateEventDto } from '@uic/dto';
import { EventEntity } from '@uic/entities';
import { ResponseHttpModel } from '@shared/models';
import { EventsService } from '@uic/services';
import { Auth } from '@auth/decorators';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateEventDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Event created',
      title: 'Created',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.catalogue();

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
    const serviceResponse = await this.eventsService.getEventsForSidebar();

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
  async findAll(@Query() params: FilterEventDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.findAll(params);

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
    const serviceResponse = await this.eventsService.findOne(id);

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
    @Body() payload: UpdateEventDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Event updated ${id}`,
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
    const serviceResponse = await this.eventsService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Event deleted ${id}`,
      title: `Deleted`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: EventEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.eventsService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Events deleted`,
      title: `Deleted`,
    };
  }
}
