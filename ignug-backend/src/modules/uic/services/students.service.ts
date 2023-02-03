import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreateStudentDto,
  ReadStudentDto,
  FilterStudentDto,
  UpdateStudentDto,
} from '@uic/dto';
import { StudentEntity } from '@uic/entities';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';

@Injectable()
export class StudentsService {
  constructor(
    @Inject(RepositoryEnum.STUDENT_REPOSITORY)
    private repository: Repository<StudentEntity>,
  ) {}

  async create(payload: CreateStudentDto): Promise<ServiceResponseHttpModel> {
    const newStudent = this.repository.create(payload);
    const studentCreated = await this.repository.save(newStudent);

    return {data: plainToInstance(ReadStudentDto, studentCreated)};
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {data: response[0],
            pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params?: FilterStudentDto): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.repository.findAndCount({
      order: {updatedAt: 'DESC'},
    });

    return {
      data: plainToInstance(ReadStudentDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const student = await this.repository.findOneBy({ id });

    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return {
      data: plainToInstance(ReadStudentDto, student),
    };
  }

  async update(id: string, payload: UpdateStudentDto): Promise<ServiceResponseHttpModel> {
    const student = await this.repository.preload({id, ...payload});

    if (!student) {
      throw new NotFoundException('Student not found');
    }
    const studentUpdated = await this.repository.save(
      student,
    );

    return { data: plainToInstance(ReadStudentDto, studentUpdated)};
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const student = await this.repository.findOneBy({ id });

    if (!student) {
      throw new NotFoundException('Student not found');
    }
    const studentDelete = await this.repository.softRemove(
      student,
    );

    return {data: plainToInstance(ReadStudentDto, studentDelete)};
  }

  async removeAll(payload: StudentEntity[]): Promise<ServiceResponseHttpModel> {
    const studentsDeleted = await this.repository.softRemove(payload);
    return { data: studentsDeleted };
  }

  private async paginateAndFilter(params: FilterStudentDto): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<StudentEntity>
      | FindOptionsWhere<StudentEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ observation: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {updatedAt: 'DESC'}
    });

    return {data: plainToInstance(ReadStudentDto, response[0]),
            pagination: { limit, totalItems: response[1] }};
  }
}
