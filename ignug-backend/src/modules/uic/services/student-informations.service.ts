import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import {
  CreateStudentInformationDto,
  ReadStudentInformationDto,
  FilterStudentInformationDto,
  UpdateStudentInformationDto,
} from '@uic/dto';
import { StudentInformationEntity } from '@uic/entities';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';

@Injectable()
export class StudentInformationsService {
  constructor(
    @Inject(RepositoryEnum.STUDENT_INFORMATION_REPOSITORY)
    private studentInformationRepository: Repository<StudentInformationEntity>,
  ) {}

  async create(
    payload: CreateStudentInformationDto,
  ): Promise<ServiceResponseHttpModel> {
    const newStudentInformation =
      this.studentInformationRepository.create(payload);
    const studentInformationCreated =
      await this.studentInformationRepository.save(newStudentInformation);

    return {
      data: plainToInstance(
        ReadStudentInformationDto,
        studentInformationCreated,
      ),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.studentInformationRepository.findAndCount({
      take: 1000,
    });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  // async getStudentInformationsForSidebar(): Promise<ServiceResponseHttpModel> {
  //   const response = await this.studentInformationRepository.find({});
  //   console.log(response);
  //   return {
  //     data: response,
  //   };
  // }

  async findAll(
    params?: FilterStudentInformationDto,
  ): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }
    const response = await this.studentInformationRepository.findAndCount({
      // relations: {
      //   student: true,
      // },
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadStudentInformationDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const studentInformation = await this.studentInformationRepository.findOneBy({ id
      // where: { id },
      // relations: { student: true },
    });

    if (!studentInformation) {
      throw new NotFoundException('Student Information not found');
    }
    return {
      data: plainToInstance(ReadStudentInformationDto, studentInformation),
    };
  }

  async update(
    id: string,
    payload: UpdateStudentInformationDto,
  ): Promise<ServiceResponseHttpModel> {
    const studentInformation = await this.studentInformationRepository.preload({
      id,
      ...payload,
    });

    if (!studentInformation) {
      throw new NotFoundException('Student Information not found');
    }
    const studentInformationUpdated =
      await this.studentInformationRepository.save(studentInformation);

    return {
      data: plainToInstance(
        ReadStudentInformationDto,
        studentInformationUpdated,
      ),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const studentInformation =
      await this.studentInformationRepository.findOneBy({ id });

    if (!studentInformation) {
      throw new NotFoundException('Student Information not found');
    }
    const studentInformationDelete =
      await this.studentInformationRepository.softRemove(studentInformation);

    return {
      data: plainToInstance(
        ReadStudentInformationDto,
        studentInformationDelete,
      ),
    };
  }

  async removeAll(
    payload: StudentInformationEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const studentInformationsDeleted =
      await this.studentInformationRepository.softRemove(payload);
    return { data: studentInformationsDeleted };
  }

  private async paginateAndFilter(
    params: FilterStudentInformationDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      FindOptionsWhere<StudentInformationEntity>
      | FindOptionsWhere<StudentInformationEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      where = [];
      where.push({ companyWork: ILike(`%${search}%`) });
    }

    const response = await this.studentInformationRepository.findAndCount({
      where,
      // relations: {
      //   student: true,
      // },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(ReadStudentInformationDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
