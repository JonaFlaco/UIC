import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@database';
import { uicProviders } from '@uic/providers';
import {
  CatalogueController,
  ModalitiesController,
  RequirementsController,
  ProjectPlansController,
  PlanningsController,
  EventsController,
  ProjectsController,
  EnrollmentsController,
  StudentsController,
  StudentInformationsController,
  RequirementRequestsController,
  MeshStudentRequirementsController,
  TutorAssignmentsController,
  DocumentsController
} from '@uic/controllers';
import {
  ModalitiesService,
  ProjectPlansService,
  RequirementsService,
  CatalogueService,
  PlanningsService,
  EventsService,
  TutorAssignmentsService,
  ProjectsService,
  EnrollmentsService,
  StudentsService,
  StudentInformationsService,
  RequirementRequestsService,
  MeshStudentRequirementsService,
  DocumentsService,
} from '@uic/services';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [
    CatalogueController,
    ProjectPlansController,
    ModalitiesController,
    RequirementsController,
    PlanningsController,
    EventsController,
    TutorAssignmentsController,
    ProjectsController,
    EnrollmentsController,
    StudentsController,
    StudentInformationsController,
    RequirementRequestsController,
    MeshStudentRequirementsController,
    DocumentsController,
  ],
  providers: [
    ...uicProviders,
    PlanningsService,
    RequirementsService,
    ModalitiesService,
    ProjectPlansService,
    CatalogueService,
    EventsService,
    TutorAssignmentsService,
    ProjectsService,
    EnrollmentsService,
    StudentsService,
    StudentInformationsService,
    RequirementRequestsService,
    MeshStudentRequirementsService,
    DocumentsService,
  ],
  exports: [],
})
export class UicModule {}
