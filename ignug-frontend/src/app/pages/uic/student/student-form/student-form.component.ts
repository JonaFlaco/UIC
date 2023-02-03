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
import { StudentModel, CreateStudentDto, UpdateStudentDto } from '@models/uic';
import { StudentsHttpService } from '@services/uic';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentFormComponent implements OnInit, OnExitInterface {
  id: string = '';
  bloodTypes: StudentModel[] = [];
  form: UntypedFormGroup = this.newForm;
  panelHeader: string = 'Create Student';
  isChangePassword: UntypedFormControl = new UntypedFormControl(false);
  isLoadingSkeleton: boolean = false;
  loaded$ = this.coreService.loaded$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private studentsHttpService: StudentsHttpService,
    private coreService: CoreService,
    private formBuilder: UntypedFormBuilder,
    public messageService: MessageService,
    private router: Router,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Students', routerLink: ['/uic/students']},
      {label: 'Form'},
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
      this.panelHeader = 'Update Student';
    }
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
  }

  get newForm(): UntypedFormGroup {
    return this.formBuilder.group({
      //companyArea: [null, [Validators.required]],
      observation:[null, [Validators.required]],
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
    this.router.navigate(['/uic/students']);
  }

  create(student: CreateStudentDto): void {
    this.studentsHttpService.create(student).subscribe(student => {
      this.form.reset(student);
      this.back();
    });
  }


  getStudent(): void {
    this.isLoadingSkeleton = true;
    this.studentsHttpService.findOne(this.id).subscribe((student) => {
      this.isLoadingSkeleton = false;
      this.form.patchValue(student);
    });
  }

  update(student: UpdateStudentDto): void {
    this.studentsHttpService.update(this.id, student).subscribe((student) => {
      this.form.reset(student);
      this.back()
    });
  }

  // Getters

  get observationField() {
    return this.form.controls['observation'];
  }
  /*get observationField() {
    return this.form.controls['observation'];
  }*/
}
