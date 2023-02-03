import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, LessThan } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import {
  CreateEventDto,
  FilterEventDto,
  ReadEventDto,
  UpdateEventDto,
} from '@uic/dto';
import { EventEntity } from '@uic/entities';
import { PaginationDto } from '@core/dto';

@Injectable()
export class EventsService {
  constructor(
    @Inject(RepositoryEnum.EVENT_REPOSITORY)
    private repository: Repository<EventEntity>,
  ) {}

  //Metodo Create
  async create(payload: CreateEventDto): Promise<ServiceResponseHttpModel> {
    const newEvent = this.repository.create(payload);
    const eventCreated = await this.repository.save(newEvent);

    return { data: plainToInstance(ReadEventDto, eventCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
  // //asignar fases
  //   async assignEvent(payload: CreateEventDto): Promise<ServiceResponseHttpModel> {
  //     const newPlanning = this.repository.create(payload);
  //     const EventCreated = await this.repository.save(newPlanning);

  //     return { data: plainToInstance(ReadEventDto, EventCreated) };
  //   }

  async findAll(params?: FilterEventDto): Promise<ServiceResponseHttpModel> {
    // Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params.sort) {
      return this.filterBySort(params.sort);
    }

    //All
    const response = await this.repository.findAndCount({
      relations: {
        name: true,
        planning: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadEventDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const event = await this.repository.findOne({
      where: { id },
      relations: { name: true, planning: true },
    });

    if (!event) {
      throw new NotFoundException('event not found');
    }

    return { data: plainToInstance(ReadEventDto, event) };
  }

  async update(
    id: string,
    payload: UpdateEventDto,
  ): Promise<ServiceResponseHttpModel> {
    const event = await this.repository.preload({ id, ...payload });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const eventUpdated = await this.repository.save(event);

    return { data: plainToInstance(ReadEventDto, eventUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const event = await this.repository.findOneBy({ id });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const eventDeleted = await this.repository.softRemove(event);

    return { data: plainToInstance(ReadEventDto, eventDeleted) };
  }

  async removeAll(payload: EventEntity[]): Promise<ServiceResponseHttpModel> {
    const eventsDeleted = await this.repository.softRemove(payload);
    return { data: eventsDeleted };
  }

  private async paginateAndFilter(
    params: FilterEventDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<EventEntity> | FindOptionsWhere<EventEntity>[];
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
        name: true,
        planning: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadEventDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  private async filterBySort(sort: number): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<EventEntity> = {};

    if (sort) {
      where.sort = LessThan(sort);
    }

    const response = await this.repository.findAndCount({
      relations: [],
      where,
    });

    return {
      data: response[0],
      pagination: { limit: 10, totalItems: response[1] },
    };
  }
}
