import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'events',
    loadChildren: () => import('./event/event.module').then(m => m.EventModule)
  },
  {
    path: 'assignaments',
    loadChildren: () => import('./assignament/assignament.module').then(m => m.AssignamentModule)
  },
  {
    path: 'catalogues',
     loadChildren: () => import('./catalogue/catalogue.module').then(m => m.CatalogueModule)
  },
  {
    path: 'students',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'plannings',
     loadChildren: () => import('./planning/planning.module').then(m => m.PlanningModule)
  },
  {
    path: 'modalities',
    loadChildren: () => import('./modality/modality.module').then(m => m.ModalityModule)
  },
  {
    path: 'requirements',
     loadChildren: () => import('./requirement/requirement.module').then(m => m.RequirementModule)
  },
  {
    path: 'tutor-assignments',
     loadChildren: () => import('./tutor-assignment/tutor-assignment.module').then(m => m.TutorAssignmentModule)
  },
  {
    path: 'project-plans',
     loadChildren: () => import('./project-plan/project-plan.module').then(m => m.ProjectPlanModule)
  },
  {
    path: 'projects',
      loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)
  },
  {
    path: 'enrollments',
      loadChildren: () => import('./enrollment/enrollment.module').then(m => m.EnrollmentModule)
  },
  {
    path: 'student-informations',
    loadChildren: () => import('./student-information/student-information.module').then(m => m.StudentInformationModule)
  },
  {
    path: 'requirement-requests',
    loadChildren: () => import('./requirement-request/requirement-request.module').then(m => m.RequirementRequestModule)
  },
  {
    path: 'requirement-formats',
    loadChildren: () => import('./requirement-request/requirement-request.module').then(m => m.RequirementRequestModule)
  },
  {
    path: 'mesh-student-requirements',
    loadChildren: () => import('./mesh-student-requirement/mesh-student-requirement.module').then(m => m.MeshStudentRequirementModule)
  },

  {
    path: 'approveds',
    loadChildren: () => import('./approve/approve.module').then(m => m.DocumentModule)
  },

  {
    path: 'documents',
    loadChildren: () => import('./document/document.module').then(m => m.DocumentModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UicRoutingModule {
}
