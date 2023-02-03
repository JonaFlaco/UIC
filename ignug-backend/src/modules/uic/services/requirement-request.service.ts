import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreateRequirementRequestDto,
  ReadRequirementRequestDto,
  FilterRequirementRequestDto,
  UpdateRequirementRequestDto,
} from '@uic/dto';
import { RequirementRequestEntity } from '@uic/entities';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';

@Injectable()
export class RequirementRequestsService {
  constructor(
    @Inject(RepositoryEnum.REQUIREMENT_REQUEST_REPOSITORY)
    private repository: Repository<RequirementRequestEntity>,
  ) {}

  async create(payload: CreateRequirementRequestDto): Promise<ServiceResponseHttpModel> {
    const newRequirementRequest = this.repository.create(payload);
    const requirementRequestCreated = await this.repository.save(newRequirementRequest);

    return { data: plainToInstance(ReadRequirementRequestDto, requirementRequestCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async getRequirementRequestsForSidebar(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.find({});
    console.log(response);
    return {
      data: response,
    };
  }

  async findAll(params?: FilterRequirementRequestDto): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.repository.findAndCount({
      relations:{
        name: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadRequirementRequestDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  // async findOne(id: string): Promise<ServiceResponseHttpModel> {
  //   const requirementRequest = await this.repository.findOneBy({ id });

  //   if (!requirementRequest) {
  //     throw new NotFoundException('RequirementRequest not found');
  //   }
  //   return { data: plainToInstance(ReadRequirementRequestDto, requirementRequest) };
  // }
  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const requirementRequest = await this.repository.findOne({
      where: { id },
      relations: { name: true },
    });

    if (!requirementRequest) {
      throw new NotFoundException('Planning not found');
    }
    return { data: plainToInstance(ReadRequirementRequestDto, requirementRequest) };
  }

  async update(
    id: string,
    payload: UpdateRequirementRequestDto,
  ): Promise<ServiceResponseHttpModel> {
    const requirementRequest = await this.repository.preload({ id, ...payload });

    if (!requirementRequest) {
      throw new NotFoundException('RequirementRequest not found');
    }
    const requirementRequestUpdated = await this.repository.save(requirementRequest);

    return { data: plainToInstance(ReadRequirementRequestDto, requirementRequestUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const requirementRequest = await this.repository.findOneBy({ id });

    if (!requirementRequest) {
      throw new NotFoundException('RequirementRequest not found');
    }
    const requirementRequestDelete = await this.repository.softRemove(requirementRequest);

    return { data: plainToInstance(ReadRequirementRequestDto, requirementRequestDelete) };
  }

  async removeAll(
    payload: RequirementRequestEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const requirementRequestsDeleted = await this.repository.softRemove(payload);
    return { data: requirementRequestsDeleted };
  }

  private async paginateAndFilter(
    params: FilterRequirementRequestDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<RequirementRequestEntity>
      | FindOptionsWhere<RequirementRequestEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ observations: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      where,
      relations:{
        name: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadRequirementRequestDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
