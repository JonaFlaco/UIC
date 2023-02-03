import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike} from 'typeorm';
import { PaginationDto } from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { EnrollmentEntity} from '@uic/entities';
import { ReadRequirementDto } from '../dto/requirements/read-requirement.dto';
import {

  CreateEnrollmentDto,
  FilterEnrollmentDto,
  ReadEnrollmentDto,
  UpdateEnrollmentDto,

} from '@uic/dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    @Inject(RepositoryEnum.ENROLLMENT_REPOSITORY)
    private enrollmentRepository: Repository<EnrollmentEntity>,
  ) {}

  async create(payload: CreateEnrollmentDto): Promise<ServiceResponseHttpModel> {
    const newEnrollment = this.enrollmentRepository.create(payload);
    const enrollmentCreated = await this.enrollmentRepository.save(newEnrollment);

    return { data: plainToInstance(ReadEnrollmentDto, enrollmentCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.enrollmentRepository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterEnrollmentDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by Search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    const response = await this.enrollmentRepository.findAndCount({
      relations:{
        modality:true,
        planning:true
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadEnrollmentDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const enrollment = await this.enrollmentRepository.findOne({where:{id},
      relations:{modality:true, planning:true},
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    return { data: plainToInstance(ReadEnrollmentDto, enrollment) };
  }

  //Metodo Update
  async update(
    id: string,
    payload: UpdateEnrollmentDto,
  ): Promise<ServiceResponseHttpModel> {
    const enrollment = await this.enrollmentRepository.preload({ id, ...payload });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    const enrollmentUpdated = await this.enrollmentRepository.save(enrollment);

    return { data: plainToInstance(ReadEnrollmentDto, enrollmentUpdated) };
  }

//Metodo Register enrollment
 async registerEnrollment( payload: CreateEnrollmentDto): Promise<ServiceResponseHttpModel> {
  const newRequirement = this.enrollmentRepository.create(payload);
  const requirementCreated = await this.enrollmentRepository.save(newRequirement);

  return { data: plainToInstance(ReadRequirementDto, requirementCreated) };
 }

//Metodo Notificar
async notifyEnrollment(id: string): Promise<ServiceResponseHttpModel> {
  const newMessage = await this.enrollmentRepository.findOneBy({ id });
  //const requirementCreated = await this.repository.save(newMessage);

  return { data: plainToInstance(ReadRequirementDto, newMessage) };
 }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const enrollment = await this.enrollmentRepository.findOneBy({ id });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    const enrollmentDeleted = await this.enrollmentRepository.softRemove(enrollment);

    return { data: plainToInstance(ReadEnrollmentDto, enrollmentDeleted) };
  }

  async removeAll(payload: EnrollmentEntity[]): Promise<ServiceResponseHttpModel> {
    const enrollmentsDeleted = await this.enrollmentRepository.softRemove(payload);
    return { data: enrollmentsDeleted };
  }

  private async paginateAndFilter(
    params: FilterEnrollmentDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<EnrollmentEntity> | FindOptionsWhere<EnrollmentEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ code: ILike(`%${search}%`) });
    }

    const response = await this.enrollmentRepository.findAndCount({
      where,
      relations:{
        modality:true,
        planning:true
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadEnrollmentDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
