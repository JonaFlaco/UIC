import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreateMeshStudentRequirementDto,
  ReadMeshStudentRequirementDto,
  BaseMeshStudentRequirementDto,
  UpdateMeshStudentRequirementDto,
  FilterMeshStudentRequirementDto,
} from '@uic/dto';
import { MeshStudentRequirementEntity } from '@uic/entities';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';

@Injectable()
export class MeshStudentRequirementsService {
  constructor(
    @Inject(RepositoryEnum.MESH_STUDENT_REQUIREMENT_REPOSITORY)
    private repository: Repository<MeshStudentRequirementEntity>,
  ) {}

  async create(payload: CreateMeshStudentRequirementDto): Promise<ServiceResponseHttpModel> {
    const newMeshStudentRequirement = this.repository.create(payload);
    const meshStudentRequirementsCreated = await this.repository.save(newMeshStudentRequirement);

    return { data: plainToInstance(ReadMeshStudentRequirementDto, meshStudentRequirementsCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async getMeshStudentRequirementsForSidebar(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.find({});
    console.log(response);
    return {
      data: response,
    };
  }

  async findAll(params?: FilterMeshStudentRequirementDto): Promise<ServiceResponseHttpModel> {
    
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.repository.findAndCount({
      relations:{
        requirement: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadMeshStudentRequirementDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  // async findOne(id: string): Promise<ServiceResponseHttpModel> {
  //   const meshStudentRequirements = await this.repository.findOneBy({ id });

  //   if (!meshStudentRequirements) {
  //     throw new NotFoundException('MeshStudentRequirement not found');
    
  //   }
  //   return { data: plainToInstance(ReadMeshStudentRequirementDto, meshStudentRequirements) };
  
  // }
  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const meshStudentRequirements = await this.repository.findOne({
      where: { id },
      relations: { requirement: true },
    });

    if (!meshStudentRequirements) {
      throw new NotFoundException('MeshStudentRequirement not found');
    }
    return { data: plainToInstance(ReadMeshStudentRequirementDto, meshStudentRequirements) };
  }

  async update(
    id: string,
    payload: UpdateMeshStudentRequirementDto,
  ): Promise<ServiceResponseHttpModel> {
    const meshStudentRequirements = await this.repository.preload({ id, ...payload });

    if (!meshStudentRequirements) {
      throw new NotFoundException('MeshStudentRequirement not found');
    }
    const meshStudentRequirementsUpdated = await this.repository.save(meshStudentRequirements);

    return { data: plainToInstance(ReadMeshStudentRequirementDto, meshStudentRequirementsUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const meshStudentRequirements = await this.repository.findOneBy({ id });

    if (!meshStudentRequirements) {
      throw new NotFoundException('MeshStudentRequirement not found');
    }
    const meshStudentRequirementsDelete = await this.repository.softRemove(meshStudentRequirements);

    return { data: plainToInstance(ReadMeshStudentRequirementDto, meshStudentRequirementsDelete) };
  }

  async removeAll( payload: MeshStudentRequirementEntity[],): Promise<ServiceResponseHttpModel> {
    const meshStudentRequirementsDeleted = await this.repository.softRemove(payload);
    return { data: meshStudentRequirementsDeleted };
  }

  private async paginateAndFilter(
    params: FilterMeshStudentRequirementDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<MeshStudentRequirementEntity>
      | FindOptionsWhere<MeshStudentRequirementEntity>[];
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
        requirement: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadMeshStudentRequirementDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
