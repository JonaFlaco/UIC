import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentInformationComponent} from './student-information.component';
import {StudentInformationFormComponent} from './student-information-form/student-information-form.component';
import {ExitGuard} from '@shared/guards';

const routes: Routes = [
  {
    path: '',
    component: StudentInformationComponent
  },
  {
    path: ':id',
    component: StudentInformationFormComponent,
    canDeactivate: [ExitGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentInformationRoutingModule {
}
