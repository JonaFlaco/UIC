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
  import { CreatePlanningDto, FilterPlanningDto, UpdatePlanningDto } from '@uic/dto';
  import { PlanningEntity } from '@uic/entities';
  import { ResponseHttpModel } from '@shared/models';
  import { PlanningsService } from '@uic/services';
  
  @ApiTags('Plannings')
  @Controller('plannings')
  export class PlanningsController {
    constructor(private planningsService: PlanningsService) {}
  
    @ApiOperation({ summary: 'Create One' })
    @Auth()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreatePlanningDto): Promise<ResponseHttpModel> {
      const serviceResponse = await this.planningsService.create(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Planning created',
        title: 'Created',
      };
    }
  
    @ApiOperation({ summary: 'Catalogue' })
    @Get('catalogue')
    @HttpCode(HttpStatus.OK)
    async catalogue(): Promise<ResponseHttpModel> {
      const serviceResponse = await this.planningsService.catalogue();
  
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `catalogue`,
        title: `Catalogue`,
      };
    }
  
    @ApiOperation({ summary: 'Plannings for sidebar' })
    @Get('sidebar')
    @HttpCode(HttpStatus.OK)
    async getPlanningsForSidebar(): Promise<ResponseHttpModel> {
      const serviceResponse = await this.planningsService.getPlanningsForSidebar();
  
      return {
        data: serviceResponse.data,
        pagination: serviceResponse.pagination,
        message: `Catalogue for Sidebar`,
        title: `Catalogue for Sidebar`,
      };
    }
  
    @ApiOperation({ summary: 'Find All' })
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterPlanningDto): Promise<ResponseHttpModel> {
      const serviceResponse = await this.planningsService.findAll(params);
  
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
      const serviceResponse = await this.planningsService.findOne(id);
  
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
      @Body() payload: UpdatePlanningDto,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.planningsService.update(id, payload);
  
      return {
        data: serviceResponse.data,
        message: `Planning updated ${id}`,
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
      const serviceResponse = await this.planningsService.remove(id);
  
      return {
        data: serviceResponse.data,
        message: `Planning deleted ${id}`,
        title: `Deleted`,
      };
    }
  
    @ApiOperation({ summary: 'Remove All' })
    @Auth()
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: PlanningEntity[]): Promise<ResponseHttpModel> {
      const serviceResponse = await this.planningsService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: `Plannings deleted`,
        title: `Deleted`,
      };
    }
  }
  