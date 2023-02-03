import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from "@shared/enums";
import { ServiceResponseHttpModel } from "@shared/models";
import {
    CreateRequirementDto,
    FilterRequirementDto,
    ReadRequirementDto,
    UpdateRequirementDto,
} from "@uic/dto";
import { RequirementEntity } from "@uic/entities";
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';


@Injectable()
export class RequirementsService {
    constructor(
        @Inject(RepositoryEnum.REQUIREMENT_REPOSITORY)
        private requirementRepository: Repository<RequirementEntity>
    ) { }

    async create(payload: CreateRequirementDto): Promise<ServiceResponseHttpModel> {
        const newRequirement = this.requirementRepository.create(payload);
        const requirementCreated = await this.requirementRepository.save(newRequirement);

        return { data: plainToInstance(ReadRequirementDto, requirementCreated) };
    }

    async catalogue(): Promise<ServiceResponseHttpModel> {
        const response = await this.requirementRepository.findAndCount({ take: 1000 });

        return {
            data: response[0],
            pagination: { totalItems: response[1], limit: 10 }
        };
    }

    async findAll(params?: FilterRequirementDto): Promise<ServiceResponseHttpModel> {

        if (params?.limit > 0 && params?.page >= 0) {
            return await this.paginateAndFilter(params);
        }
        const response = await this.requirementRepository.findAndCount({
            order: {
                updatedAt: 'DESC'
            },
        });

        return {
            data: plainToInstance(ReadRequirementDto, response[0]),
            pagination: { totalItems: response[1], limit: 10 },
        };
    }
    async findOne(id: string): Promise<ServiceResponseHttpModel> {
        const requirement = await this.requirementRepository.findOneBy({ id });

        if (!requirement) {
            throw new NotFoundException("Requirement not found");

        }
        return { data: plainToInstance(ReadRequirementDto, requirement) };
    }
    async update(
        id: string,
        payload: UpdateRequirementDto,
    ): Promise<ServiceResponseHttpModel> {
        const requirement = await this.requirementRepository.preload({ id, ...payload });

        if (!requirement) {
            throw new NotFoundException("Requirement not found");
        }
        const requirementUpdated = await this.requirementRepository.save(requirement);

        return { data: plainToInstance(ReadRequirementDto, requirementUpdated) };
    }
    async remove(id: string): Promise<ServiceResponseHttpModel> {
        const requirement = await this.requirementRepository.findOneBy({ id });

        if (!requirement) {
            throw new NotFoundException("Requirement not found");
        }
        const requirementDelete = await this.requirementRepository.softRemove(requirement);

        return { data: plainToInstance(ReadRequirementDto, requirementDelete) };
    }
    async removeAll(payload: RequirementEntity[]): Promise<ServiceResponseHttpModel> {
        const requirementsDeleted = await this.requirementRepository.softRemove(payload);
        return { data: requirementsDeleted };
    }
    private async paginateAndFilter(
        params: FilterRequirementDto
    ): Promise<ServiceResponseHttpModel> {
        let where: FindOptionsWhere<RequirementEntity> | FindOptionsWhere<RequirementEntity>[];
        where = {};
        let { page, search } = params;
        const { limit } = params;

        if (search) {
            search = search.trim();
            where = [];
            where.push({ name: ILike(`%${search}%`) });
        }

        const response = await this.requirementRepository.findAndCount({
            where,
            take: limit,
            skip: PaginationDto.getOffset(limit, page),
            order: {
                updatedAt: 'DESC'
            },

        });
        return {
            data: plainToInstance(ReadRequirementDto, response[0]),
            pagination: { limit, totalItems: response[1] },
        }

    }
}