import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApproveComponent} from './approve.component';
import {ApproveFormComponent} from './approve-form/approve-form.component';
import {ExitGuard} from '@shared/guards';

const routes: Routes = [
  {
    path: '',
    component: ApproveComponent
  },
  {
    path: ':id',
    component: ApproveFormComponent,
    canDeactivate: [ExitGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveRoutingModule {
}