import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, LessThan } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import {
  CreateProfessionDto,
  FilterProfessionDto,
  ReadProfessionDto,
  UpdateProfessionDto,
} from '@uic/dto';
import { ProfessionEntity } from '@uic/entities';
import { PaginationDto } from '@core/dto';

@Injectable()
export class ProfessionsService {
  constructor(
    @Inject(RepositoryEnum.PROFESSION_REPOSITORY)
    private repository: Repository<ProfessionEntity>,
  ) {}

  //Metodo Create
  async create(payload: CreateProfessionDto): Promise<ServiceResponseHttpModel> {
    const newProfession = this.repository.create(payload);
    const professionCreated = await this.repository.save(newProfession);

    return { data: plainToInstance(ReadProfessionDto, professionCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
  // //asignar fases
  //   async assignProfession(payload: CreateProfessionDto): Promise<ServiceResponseHttpModel> {
  //     const newPlanning = this.repository.create(payload);
  //     const ProfessionCreated = await this.repository.save(newPlanning);

  //     return { data: plainToInstance(ReadProfessionDto, ProfessionCreated) };
  //   }

  async findAll(params?: FilterProfessionDto): Promise<ServiceResponseHttpModel> {
    // Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    // Other filters
    // if (params.name) {
    //   return this.filterBySort(params.name);
    // }

    //All
    const response = await this.repository.findAndCount({
      relations: {
        // name: true,
        // planning: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadProfessionDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const profession = await this.repository.findOne({
      where: { id },
      relations: { 
        // name: true, 
        // planning: true 
      },
    });

    if (!profession) {
      throw new NotFoundException('profession not found');
    }

    return { data: plainToInstance(ReadProfessionDto, profession) };
  }

  async update(
    id: string,
    payload: UpdateProfessionDto,
  ): Promise<ServiceResponseHttpModel> {
    const profession = await this.repository.preload({ id, ...payload });

    if (!profession) {
      throw new NotFoundException('Profession not found');
    }

    const professionUpdated = await this.repository.save(profession);

    return { data: plainToInstance(ReadProfessionDto, professionUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const profession = await this.repository.findOneBy({ id });

    if (!profession) {
      throw new NotFoundException('Profession not found');
    }

    const professionDeleted = await this.repository.softRemove(profession);

    return { data: plainToInstance(ReadProfessionDto, professionDeleted) };
  }

  async removeAll(payload: ProfessionEntity[]): Promise<ServiceResponseHttpModel> {
    const professionsDeleted = await this.repository.softRemove(payload);
    return { data: professionsDeleted };
  }

  private async paginateAndFilter(
    params: FilterProfessionDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<ProfessionEntity> | FindOptionsWhere<ProfessionEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      // where.push({ name: ILike(`%${search}%`) });
    }
    const response = await this.repository.findAndCount({
      where,
      relations: {
        // name: true,
        // planning: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadProfessionDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  // private async filterBySort(name: number): Promise<ServiceResponseHttpModel> {
  //   const where: FindOptionsWhere<ProfessionEntity> = {};

  //   if (name) {
  //     where.name = LessThan(name);
  //   }

  //   const response = await this.repository.findAndCount({
  //     relations: [],
  //     where,
  //   });

  //   return {
  //     data: response[0],
  //     pagination: { limit: 10, totalItems: response[1] },
  //   };
  // }
}
