import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreateModalityDto,
  ReadModalityDto,
  FilterModalityDto,
  UpdateModalityDto,
} from '@uic/dto';
import { ModalityEntity } from '@uic/entities';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';
import { PayloadTokenModel } from '@auth/models';

@Injectable()
export class ModalitiesService {
  getModalitiesForSidebar() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject(RepositoryEnum.MODALITY_REPOSITORY)
    private modalityRepository: Repository<ModalityEntity>,
  ) {}

  async create(payload: CreateModalityDto): Promise<ServiceResponseHttpModel> {
    const newModality = this.modalityRepository.create(payload);
    const modalityCreated = await this.modalityRepository.save(newModality);

    return { data: plainToInstance(ReadModalityDto, modalityCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.modalityRepository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterModalityDto): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.modalityRepository.findAndCount({
      // relations:{
      //   state: true
      // },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadModalityDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const modality = await this.modalityRepository.findOneBy({ id });

    if (!modality) {
      throw new NotFoundException('Modality not found');
    }
    return { data: plainToInstance(ReadModalityDto, modality) };
  }

  async update(
    id: string,
    payload: UpdateModalityDto,
  ): Promise<ServiceResponseHttpModel> {
    const modality = await this.modalityRepository.preload({ id, ...payload });

    if (!modality) {
      throw new NotFoundException('Modality not found');
    }
    const modalityUpdated = await this.modalityRepository.save(modality);

    return { data: plainToInstance(ReadModalityDto, modalityUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const modality = await this.modalityRepository.findOneBy({ id });

    if (!modality) {
      throw new NotFoundException('Modality not found');
    }
    const modalityDelete = await this.modalityRepository.softRemove(modality);

    return { data: plainToInstance(ReadModalityDto, modalityDelete) };
  }

  async removeAll(
    payload: ModalityEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const modalitiesDeleted = await this.modalityRepository.softRemove(payload);
    return { data: modalitiesDeleted };
  }

  private async paginateAndFilter(
    params: FilterModalityDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<ModalityEntity>
      | FindOptionsWhere<ModalityEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.modalityRepository.findAndCount({
      where,
      // relations:{
      //   state: true
      // },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadModalityDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
