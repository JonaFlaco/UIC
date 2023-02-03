import { DataSource } from 'typeorm';
import {
  EventEntity,
  PlanningEntity,
  ProjectPlanEntity,
  RequirementEntity,
  ModalityEntity,
  StudentEntity,
  CatalogueEntity,
  ProjectEntity,
  StudentInformationEntity,
  TutorAssignmentEntity,
  MeshStudentRequirementEntity,
  EnrollmentEntity,
  DocumentEntity,
} from '@uic/entities';

import { DataSourceEnum, RepositoryEnum } from '@shared/enums';
import { RequirementRequestEntity } from '../entities/requirement-request.entity';

export const uicProviders = [
  {
    provide: RepositoryEnum.EVENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EventEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.PLANNING_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PlanningEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.PROJECT_PLAN_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProjectPlanEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },

  {
    provide: RepositoryEnum.REQUIREMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RequirementEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.MODALITY_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ModalityEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.STUDENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(StudentEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.CATALOGUE_UIC_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CatalogueEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.TUTOR_ASSIGNMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TutorAssignmentEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.PROJECT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProjectEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.ENROLLMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EnrollmentEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.STUDENT_INFORMATION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(StudentInformationEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.REQUIREMENT_REQUEST_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RequirementRequestEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.MESH_STUDENT_REQUIREMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MeshStudentRequirementEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.DOCUMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DocumentEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  }
];
