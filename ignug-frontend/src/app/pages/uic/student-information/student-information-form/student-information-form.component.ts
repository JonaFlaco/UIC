import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService, CoreService, MessageService} from '@services/core';
import {OnExitInterface} from '@shared/interfaces';
import { StudentInformationModel, CreateStudentInformationDto, UpdateStudentInformationDto, StudentModel } from '@models/uic';
import { StudentInformationsHttpService, StudentsHttpService } from '@services/uic';
import { StudentTypeEnum } from '@shared/enums/student.enum';

@Component({
  selector: 'app-student-information-form',
  templateUrl: './student-information-form.component.html',
  styleUrls: ['./student-information-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentInformationFormComponent implements OnInit, OnExitInterface {
  id: string = '';
  // bloodTypes: StudentInformationModel[] = [];
  // students: StudentModel[] = [];
  form: UntypedFormGroup = this.newForm;
  panelHeader: string = 'Añadir Informacion laboral del estudiante';
  isChangePassword: UntypedFormControl = new UntypedFormControl(false);
  isLoadingSkeleton: boolean = false;
  loaded$ = this.coreService.loaded$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private studentInformationsHttpService: StudentInformationsHttpService,
    private coreService: CoreService,
    private formBuilder: UntypedFormBuilder,
    public messageService: MessageService,
    private router: Router,
    private studentHttpService: StudentsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'StudentInformations', routerLink: ['/uic/student-informations']},
      {label: 'Form'},
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
      this.panelHeader = 'Update StudentInformation';
    }
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
    //this.getStudentObservations();
    this.getstudentInformation();

  }

  get newForm(): UntypedFormGroup {
    return this.formBuilder.group({
      // student: [null],
      companyArea: [null, [Validators.required]],
      companyPosition: [null, [Validators.required]],
      relationLaboralCarrer: [null, [Validators.required]],
      companyWork:[null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.id != '') {
        this.update(this.form.value);
      } else {
        this.create(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields.then();
    }
  }

  back(): void {
    this.router.navigate(['/uic/student-informations']);
  }

  create(studentInformation: CreateStudentInformationDto): void {
    this.studentInformationsHttpService.create(studentInformation).subscribe(studentInformation => {
      this.form.reset(studentInformation);
      this.back();
    });
  }


  getstudentInformation(): void {
    this.isLoadingSkeleton = true;
    this.studentInformationsHttpService.findOne(this.id).subscribe((studentInformation) => {
      this.isLoadingSkeleton = false;
      this.form.patchValue(studentInformation);
    });
  }

  // getStudentObservations(): void {
  //   this.isLoadingSkeleton = true;
  //   this.studentHttpService.student(StudentTypeEnum.STUDENT_INFORMATION_OBSERVATIONS).subscribe((students) => {
  //     this.isLoadingSkeleton = false;
  //     this.students = students;
  //   });
  // }

  update(studentInformation: UpdateStudentInformationDto): void {
    this.studentInformationsHttpService.update(this.id, studentInformation).subscribe((studentInformation) => {
      this.form.reset(studentInformation);
      this.back()
    });
  }

  // Getters

  // get studentField() {
  //   return this.form.controls['student'];
  // }

  get companyAreaField() {
    return this.form.controls['companyArea'];
  }

  get companyPositionField() {
    return this.form.controls['companyPosition'];
  }

  get relationLaboralCarrerField() {
    return this.form.controls['relationLaboralCarrer'];
  }

  get companyWorkField() {
    return this.form.controls['companyWork'];
  }
}
