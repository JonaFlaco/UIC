import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreateTutorAssignmentDto,
  FilterTutorAssignmentDto,
  ReadTutorAssignmentDto,
  UpdateTutorAssignmentDto,
} from '@uic/dto';
import { TutorAssignmentEntity } from '@uic/entities';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';

@Injectable()
export class TutorAssignmentsService {
  getTutorAssignmentsForSidebar() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject(RepositoryEnum.TUTOR_ASSIGNMENT_REPOSITORY)
    private tutorAssignmentRepository: Repository<TutorAssignmentEntity>,
  ) {}

  async create(
    payload: CreateTutorAssignmentDto,
  ): Promise<ServiceResponseHttpModel> {
    const newTutorAssignment = this.tutorAssignmentRepository.create(payload);
    const tutorAssignmentCreated = await this.tutorAssignmentRepository.save(
      newTutorAssignment,
    );

    return {
      data: plainToInstance(ReadTutorAssignmentDto, tutorAssignmentCreated),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.tutorAssignmentRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterTutorAssignmentDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.tutorAssignmentRepository.findAndCount({
      relations: {
        project: true,
        type: true,
        projectPlan: true

      },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadTutorAssignmentDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const tutorAssignment = await this.tutorAssignmentRepository.findOne({where:{id},relations:{projectPlan:true,project:true,type:true}});

    if (!tutorAssignment) {
      throw new NotFoundException('TutorAssignment not found');
    }
    return { data: plainToInstance(ReadTutorAssignmentDto, tutorAssignment) };
  }
  async update(
    id: string,
    payload: UpdateTutorAssignmentDto,
  ): Promise<ServiceResponseHttpModel> {
    const tutorAssignment = await this.tutorAssignmentRepository.preload({
      id,
      ...payload,
    });

    if (!tutorAssignment) {
      throw new NotFoundException('Tutor not found');
    }
    const tutorAssignmentUpdated = await this.tutorAssignmentRepository.save(
      tutorAssignment,
    );

    return {
      data: plainToInstance(ReadTutorAssignmentDto, tutorAssignmentUpdated),
    };
  }
  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const tutorAssignment = await this.tutorAssignmentRepository.findOneBy({
      id,
    });

    if (!tutorAssignment) {
      throw new NotFoundException('Tutor not found');
    }
    const tutorAssignmentDeleted =
      await this.tutorAssignmentRepository.softRemove(tutorAssignment);

    return {
      data: plainToInstance(ReadTutorAssignmentDto, tutorAssignmentDeleted),
    };
  }
  async removeAll(
    payload: TutorAssignmentEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const tutorAssignmentsDeleted =
      await this.tutorAssignmentRepository.softRemove(payload);
    return { data: tutorAssignmentsDeleted };
  }
  private async paginateAndFilter(
        params: FilterTutorAssignmentDto
    ): Promise<ServiceResponseHttpModel> {
        let where: FindOptionsWhere<TutorAssignmentEntity> | FindOptionsWhere<TutorAssignmentEntity>[];
        where = {};
        let { page, search } = params;
        const { limit } = params;

        if (search) {
            search = search.trim();
            page=0;
            where = [];
            where.push({ observation: ILike(`%${search}%`) });
        }

        const response = await this.tutorAssignmentRepository.findAndCount({
            where,
            relations:{
              project: true,
              type: true,
              projectPlan: true
            },
            take: limit,
            skip: PaginationDto.getOffset(limit, page),
            order: {
                updatedAt: 'DESC'
            },

        });
        return {
            data: plainToInstance(ReadTutorAssignmentDto, response[0]),
            pagination: { limit, totalItems: response[1] },
        }

  }
}
