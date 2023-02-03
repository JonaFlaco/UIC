import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExitGuard } from '@shared/guards';
import { ProjectPlanFormComponent } from './project-plan-form/project-plan-form.component';
import { ProjectPlanComponent } from './project-plan.component';

const routes: Routes = [
  {
    // path: 'project-plans',
    path: '',
    component: ProjectPlanComponent
  },
  {
    path: ':id',
    component: ProjectPlanFormComponent,
    canDeactivate: [ExitGuard]
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectPlanRoutingModule { }
