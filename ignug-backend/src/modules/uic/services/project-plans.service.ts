import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { PaginationDto } from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { ProjectPlanEntity } from '@uic/entities';
import { ReadRequirementDto } from '../dto/requirements/read-requirement.dto';
import {

  CreateProjectPlanDto,
  FilterProjectPlanDto,
  ReadProjectPlanDto,
  UpdateProjectPlanDto,

} from '@uic/dto';

@Injectable()
export class ProjectPlansService {
  constructor(
    @Inject(RepositoryEnum.PROJECT_PLAN_REPOSITORY)
    private repository: Repository<ProjectPlanEntity>,
  ) { }

  async create(payload: CreateProjectPlanDto): Promise<ServiceResponseHttpModel> {
    const newProjectPlan = this.repository.create(payload);
    const projectPlanCreated = await this.repository.save(newProjectPlan);

    return { data: plainToInstance(ReadProjectPlanDto, projectPlanCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterProjectPlanDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by Search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const response = await this.repository.findAndCount({
      relations: {
        state: true,
        planning: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadProjectPlanDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const projectPlan = await this.repository.findOne({
      where: {id},
      relations:{planning:true,
      state:true}});

    if (!projectPlan) {
      throw new NotFoundException('Project Plan not found');
    }

    return { data: plainToInstance(ReadProjectPlanDto, projectPlan) };
  }

  //Metodo Update
  async update(
    id: string,
    payload: UpdateProjectPlanDto,
  ): Promise<ServiceResponseHttpModel> {
    const projectPlan = await this.repository.preload({ id, ...payload });

    if (!projectPlan) {
      throw new NotFoundException('Project Plan not found');
    }

    const projectPlanUpdated = await this.repository.save(projectPlan);

    return { data: plainToInstance(ReadProjectPlanDto, projectPlanUpdated) };
  }

  //Metodo Register ProjectPlan
  async registerProjectPlan(payload: CreateProjectPlanDto): Promise<ServiceResponseHttpModel> {
    const newRequirement = this.repository.create(payload);
    const requirementCreated = await this.repository.save(newRequirement);

    return { data: plainToInstance(ReadRequirementDto, requirementCreated) };
  }

  //Metodo Notificar
  async notifyProjectPlan(id: string): Promise<ServiceResponseHttpModel> {
    const newMessage = await this.repository.findOneBy({ id });
    //const requirementCreated = await this.repository.save(newMessage);

    return { data: plainToInstance(ReadRequirementDto, newMessage) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const projectPlan = await this.repository.findOneBy({ id });

    if (!projectPlan) {
      throw new NotFoundException('Project Plan not found');
    }

    const projectPlanDeleted = await this.repository.softRemove(projectPlan);

    return { data: plainToInstance(ReadProjectPlanDto, projectPlanDeleted) };
  }

  async removeAll(payload: ProjectPlanEntity[]): Promise<ServiceResponseHttpModel> {
    const projectPlansDeleted = await this.repository.softRemove(payload);
    return { data: projectPlansDeleted };
  }

  private async paginateAndFilter(
    params: FilterProjectPlanDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<ProjectPlanEntity> | FindOptionsWhere<ProjectPlanEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ title: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      where,
      relations:{ 
        state: true,
        planning: true,
    },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadProjectPlanDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
