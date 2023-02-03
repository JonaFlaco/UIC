import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from "@shared/enums";
import { ServiceResponseHttpModel } from "@shared/models";
import {
    CreateProjectDto,
    FilterProjectDto,
    ReadProjectDto,
    UpdateProjectDto,
} from "@uic/dto";
import { ProjectEntity } from "@uic/entities";
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '@core/dto';


@Injectable()
export class ProjectsService {
    constructor(
        @Inject(RepositoryEnum.PROJECT_REPOSITORY)
        private projectRepository: Repository<ProjectEntity>
    ) { }
    
    async create(payload: CreateProjectDto): Promise<ServiceResponseHttpModel> {
      const newProject = this.projectRepository.create(payload);
      const projectCreated = await this.projectRepository.save(newProject);

        return { data: plainToInstance(ReadProjectDto, projectCreated),
        };
    }

    async catalogue(): Promise<ServiceResponseHttpModel> {
        const response = await this.projectRepository.findAndCount({ take: 1000 });

        return {
            data: response[0],
            pagination: { totalItems: response[1], limit: 10 }
        };
    }


    async findAll(params?: FilterProjectDto): Promise<ServiceResponseHttpModel> {

        if (params?.limit > 0 && params?.page >= 0) {
            return await this.paginateAndFilter(params);
        }
        const response = await this.projectRepository.findAndCount({
            relations:{ 
                enrollment:true,
                projectPlan:true
            },
            order: { updatedAt: 'DESC' },
        });

        return {
            data: plainToInstance(ReadProjectDto, response[0]),
            pagination: { totalItems: response[1], limit: 10 },
        };
    }

    async findOne(id: string): Promise<ServiceResponseHttpModel> {
        const project = await this.projectRepository.findOne({ where:{id},relations:{projectPlan:true,enrollment:true}});

        if (!project) {
            throw new NotFoundException("Project not found");

        }
        return { data: plainToInstance(ReadProjectDto, project) };
    }

    async update(
        id: string,
        payload: UpdateProjectDto,
    ): Promise<ServiceResponseHttpModel> {
        const project = await this.projectRepository.preload({ id, ...payload });

        if (!project) {
            throw new NotFoundException("Project not found");
        }
        const projectUpdated = await this.projectRepository.save(project);

        return { data: plainToInstance(ReadProjectDto, projectUpdated) };
    }

    async remove(id: string): Promise<ServiceResponseHttpModel> {
        const project = await this.projectRepository.findOneBy({ id });

        if (!project) {
            throw new NotFoundException("Project not found");
        }
        const projectDeleted = await this.projectRepository.softRemove(project);

        return { data: plainToInstance(ReadProjectDto, projectDeleted) };
    }

    async removeAll(payload: ProjectEntity[]): Promise<ServiceResponseHttpModel> {
        const projectsDeleted = await this.projectRepository.softRemove(payload);
        return { data: projectsDeleted };
    }

    private async paginateAndFilter(
        params: FilterProjectDto
    ): Promise<ServiceResponseHttpModel> {
        let where: | FindOptionsWhere<ProjectEntity> | FindOptionsWhere<ProjectEntity>[];
        where = {};
        let { page, search } = params;
        const { limit } = params;

        if (search) {
            search = search.trim();
            page=0;
            where = [];
             where.push({ title: ILike(`%${search}%`) });
        }

        const response = await this.projectRepository.findAndCount({
            where,
            relations:{ 
                enrollment:true,
                projectPlan:true
            },
            take: limit,
            skip: PaginationDto.getOffset(limit, page),
            order: {
                updatedAt: 'DESC'
            },

        });
        return {
            data: plainToInstance(ReadProjectDto, response[0]),
            pagination: { limit, totalItems: response[1] },
        }

    }

}