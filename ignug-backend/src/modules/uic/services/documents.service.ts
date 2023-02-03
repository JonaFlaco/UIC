import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, LessThan } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import {
  CreateDocumentDto,
  FilterDocumentDto,
  ReadDocumentDto,
  UpdateDocumentDto,
} from '@uic/dto';
import { DocumentEntity } from '@uic/entities';
import { PaginationDto } from '@core/dto';

@Injectable()
export class DocumentsService {
  constructor(
    @Inject(RepositoryEnum.DOCUMENT_REPOSITORY)
    private repository: Repository<DocumentEntity>,
  ) {}

  //Metodo Create
  async create(payload: CreateDocumentDto): Promise<ServiceResponseHttpModel> {
    const newDocument = this.repository.create(payload);
    const documentCreated = await this.repository.save(newDocument);

    return { data: plainToInstance(ReadDocumentDto, documentCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
  // //asignar fases
  //   async assignDocument(payload: CreateDocumentDto): Promise<ServiceResponseHttpModel> {
  //     const newPlanning = this.repository.create(payload);
  //     const DocumentCreated = await this.repository.save(newPlanning);

  //     return { data: plainToInstance(ReadDocumentDto, DocumentCreated) };
  //   }

  async findAll(params?: FilterDocumentDto): Promise<ServiceResponseHttpModel> {
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
      data: plainToInstance(ReadDocumentDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const document = await this.repository.findOne({
      where: { id },
      relations: { 
        // name: true, 
        // planning: true 
      },
    });

    if (!document) {
      throw new NotFoundException('document not found');
    }

    return { data: plainToInstance(ReadDocumentDto, document) };
  }

  async update(
    id: string,
    payload: UpdateDocumentDto,
  ): Promise<ServiceResponseHttpModel> {
    const document = await this.repository.preload({ id, ...payload });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const documentUpdated = await this.repository.save(document);

    return { data: plainToInstance(ReadDocumentDto, documentUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const document = await this.repository.findOneBy({ id });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const documentDeleted = await this.repository.softRemove(document);

    return { data: plainToInstance(ReadDocumentDto, documentDeleted) };
  }

  async removeAll(payload: DocumentEntity[]): Promise<ServiceResponseHttpModel> {
    const documentsDeleted = await this.repository.softRemove(payload);
    return { data: documentsDeleted };
  }

  private async paginateAndFilter(
    params: FilterDocumentDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<DocumentEntity> | FindOptionsWhere<DocumentEntity>[];
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
      data: plainToInstance(ReadDocumentDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  // private async filterBySort(name: number): Promise<ServiceResponseHttpModel> {
  //   const where: FindOptionsWhere<DocumentEntity> = {};

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
