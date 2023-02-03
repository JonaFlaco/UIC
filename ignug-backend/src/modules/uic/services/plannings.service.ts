import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreatePlanningDto,
  FilterPlanningDto,
  ReadPlanningDto,
  UpdatePlanningDto,
} from '@uic/dto';
import { PlanningEntity } from '@uic/entities';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';

@Injectable()
export class PlanningsService {
  constructor(
    @Inject(RepositoryEnum.PLANNING_REPOSITORY)
    private repository: Repository<PlanningEntity>,
  ) {}
  async create(payload: CreatePlanningDto): Promise<ServiceResponseHttpModel> {
    const newPlanning = this.repository.create(payload);
    const planningCreated = await this.repository.save(newPlanning);

    return { data: plainToInstance(ReadPlanningDto, planningCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async getPlanningsForSidebar(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.find({});
    console.log(response);
    return {
      data: response,
    };
  }

  async findAll(params?: FilterPlanningDto): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.repository.findAndCount({
      relations: {
        nameModality: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadPlanningDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const planning = await this.repository.findOne({
      where: { id },
      relations: { nameModality: true },
    });

    if (!planning) {
      throw new NotFoundException('Planning not found');
    }
    return { data: plainToInstance(ReadPlanningDto, planning) };
  }
  async update(
    id: string,
    payload: UpdatePlanningDto,
  ): Promise<ServiceResponseHttpModel> {
    const planning = await this.repository.preload({ id, ...payload });

    if (!planning) {
      throw new NotFoundException('Planning not found');
    }
    const planningUpdated = await this.repository.save(planning);

    return { data: plainToInstance(ReadPlanningDto, planningUpdated) };
  }
  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const planning = await this.repository.findOneBy({ id });

    if (!planning) {
      throw new NotFoundException('Planning not found');
    }
    const planningDelete = await this.repository.softRemove(planning);

    return { data: plainToInstance(ReadPlanningDto, planningDelete) };
  }
  async removeAll(
    payload: PlanningEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const planningsDeleted = await this.repository.softRemove(payload);
    return { data: planningsDeleted };
  }
  private async paginateAndFilter(
    params: FilterPlanningDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<PlanningEntity>
      | FindOptionsWhere<PlanningEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      where,
      relations: {
        nameModality: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadPlanningDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
