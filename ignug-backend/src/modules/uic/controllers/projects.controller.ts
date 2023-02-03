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
  import { CreateProjectDto, FilterProjectDto, UpdateProjectDto } from '@uic/dto';
  import { ProjectEntity } from '@uic/entities';
  import { ProjectsService } from '@uic/services';
  import { ResponseHttpModel } from '@shared/models';
  import { Auth } from '@auth/decorators';

  
  @ApiTags('Projects')
  @Controller('projects')
  export class ProjectsController {
    constructor(private projectsService: ProjectsService) {}
  
    @ApiOperation({ summary: 'Create One' })
    @Auth()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateProjectDto): Promise<ResponseHttpModel> {
      const serviceResponse = await this.projectsService.create(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Project created',
        title: 'Created',
      };
    }
  
    @ApiOperation({ summary: 'Catalogue' })
    @Get('catalogue')
    @HttpCode(HttpStatus.OK)
    async catalogue(): Promise<ResponseHttpModel> {
      const serviceResponse = await this.projectsService.catalogue();
  
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
    async findAll(@Query() params: FilterProjectDto): Promise<ResponseHttpModel> {
      const serviceResponse = await this.projectsService.findAll(params);
  
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
      const serviceResponse = await this.projectsService.findOne(id);
  
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
      @Body() payload: UpdateProjectDto,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.projectsService.update(id, payload,);
  
      return {
        data: serviceResponse.data,
        message: `Project updated ${id}`,
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
      const serviceResponse = await this.projectsService.remove(id);
  
      return {
        data: serviceResponse.data,
        message: `Project deleted ${id}`,
        title: `Deleted`,
      };
    }
  
    @ApiOperation({ summary: 'Remove All' })
    @Auth()
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: ProjectEntity[],
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.projectsService.removeAll(
        payload,
        );
  
      return {
        data: serviceResponse.data,
        message: `Projects deleted`,
        title: `Deleted`,
      };
    }
  }
  