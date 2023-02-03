import { CatalogueEntity } from '@uic/entities';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from '@core/dto';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike} from 'typeorm';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { 
  CreateCatalogueDto,
  FilterCatalogueDto,
  ReadCatalogueDto, 
  UpdateCatalogueDto
} from '@uic/dto';

@Injectable()
export class CatalogueService {
  constructor(
    @Inject(RepositoryEnum.CATALOGUE_UIC_REPOSITORY)
    private repository: Repository<CatalogueEntity>,
  ) {}

  async create(payload: CreateCatalogueDto): Promise<ServiceResponseHttpModel> {
    const newCatalogueUic= this.repository.create(payload);
    const catalogueUicCreated = await this.repository.save(newCatalogueUic);

    return { data: plainToInstance(ReadCatalogueDto,catalogueUicCreated) };
  }

  async catalogues(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterCatalogueDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by Search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const response = await this.repository.findAndCount({
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadCatalogueDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const catalogue = await this.repository.findOneBy({ id });

    if (!catalogue) {
      throw new NotFoundException('Catalogue uic not found');
    }

    return { data: plainToInstance(ReadCatalogueDto, catalogue) };
  }

  async update(
    id: string,
    payload: UpdateCatalogueDto,
  ): Promise<ServiceResponseHttpModel> {
    const catalogue = await this.repository.preload({ id, ...payload });

    if (!catalogue) {
      throw new NotFoundException('Catalogue uic not found');
    }

    const catalogueUpdated = await this.repository.save(catalogue);

    return { data: plainToInstance(ReadCatalogueDto, catalogueUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const catalogue = await this.repository.findOneBy({ id });

    if (!catalogue) {
      throw new NotFoundException('catalogue not found');
    }

    const catalogueDeleted = await this.repository.softRemove(catalogue);

    return { data: plainToInstance(ReadCatalogueDto, catalogueDeleted) };
  }

  async removeAll(payload: CatalogueEntity[]): Promise<ServiceResponseHttpModel> {
    const cataloguesDeleted = await this.repository.softRemove(payload);
    return { data: cataloguesDeleted };
  }

  private async paginateAndFilter(
    params: FilterCatalogueDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<CatalogueEntity> | FindOptionsWhere<CatalogueEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadCatalogueDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}