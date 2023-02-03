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
  import { CreateRequirementRequestDto, FilterRequirementRequestDto, UpdateRequirementRequestDto } from '@uic/dto';
  import { RequirementRequestEntity } from '@uic/entities';
  import { ResponseHttpModel } from '@shared/models';
  import { RequirementRequestsService } from '@uic/services';
  
  @ApiTags('requirement-requests')
  @Controller('requirement-requests')
  export class RequirementRequestsController {
    constructor(private requirementRequestsService: RequirementRequestsService) {}
  
    @ApiOperation({ summary: 'Create One' })
    @Auth()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateRequirementRequestDto): Promise<ResponseHttpModel> {
      const serviceResponse = await this.requirementRequestsService.create(payload);
  
      return {
        data: serviceResponse.data,
        message: 'RequirementRequest created',
        title: 'Created',
      };
    }
  
    @ApiOperation({ summary: 'Catalogue' })
    @Get('catalogue')
    @HttpCode(HttpStatus.OK)
    async catalogue(): Promise<ResponseHttpModel> {
      const serviceResponse = await this.requirementRequestsService.catalogue();
  
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
    async findAll(@Query() params: FilterRequirementRequestDto): Promise<ResponseHttpModel> {
      const serviceResponse = await this.requirementRequestsService.findAll(params);
  
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
      const serviceResponse = await this.requirementRequestsService.findOne(id);
  
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
      @Body() payload: UpdateRequirementRequestDto,
    ): Promise<ResponseHttpModel> {
      const serviceResponse = await this.requirementRequestsService.update(id, payload);
  
      return {
        data: serviceResponse.data,
        message: `RequirementRequest updated ${id}`,
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
      const serviceResponse = await this.requirementRequestsService.remove(id);
  
      return {
        data: serviceResponse.data,
        message: `RequirementRequest deleted ${id}`,
        title: `Deleted`,
      };
    }
  
    @ApiOperation({ summary: 'Remove All' })
    @Auth()
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: RequirementRequestEntity[]): Promise<ResponseHttpModel> {
      const serviceResponse = await this.requirementRequestsService.removeAll(payload);
  
      return {
        data: serviceResponse.data,
        message: `RequirementRequests deleted`,
        title: `Deleted`,
      };
    }
  }