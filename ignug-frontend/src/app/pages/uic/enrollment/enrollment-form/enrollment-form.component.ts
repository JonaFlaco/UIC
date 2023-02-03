import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService,CoreService, MessageService} from '@services/core';
import {OnExitInterface} from '@shared/interfaces';
import {CatalogueModel, CreateEnrollmentDto, ModalityModel, PlanningModel, UpdateEnrollmentDto } from '@models/uic';
import {EnrollmentsHttpService,ModalitiesHttpService, PlanningsHttpService } from '@services/uic';
import { ModalityTypeEnum } from '@shared/enums/modality';
import { PlanningTypeEnum } from '@shared/enums/planning.enum';

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EnrollmentFormComponent implements OnInit, OnExitInterface {
  id: string = '';
  modalities: ModalityModel[] = [];
  // requirements: MeshStudentRequirementModel[] = [];
  plannings: PlanningModel[] = [];
  // states: CatalogueModel[] = [];
  bloodTypes: CatalogueModel[] = [];
  form: UntypedFormGroup = this.newForm;
  panelHeader: string = 'Crear Inscripción';
  isChangePassword: UntypedFormControl = new UntypedFormControl(false);
  isLoadingSkeleton: boolean = false;
  loaded$ = this.coreService.loaded$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private coreService: CoreService,
    private formBuilder: UntypedFormBuilder,
    public messageService: MessageService,
    private router: Router,
    private enrollmentsHttpService: EnrollmentsHttpService,
    private modalitiesHttpService: ModalitiesHttpService,
    private planningsHttpService: PlanningsHttpService,
    // private statesHttpService: CataloguesHttpService,
    // private meshStudentRequirementsHttpService: MeshStudentRequirementsHttpService
    ) {

    this.breadcrumbService.setItems([
      {label: 'Inscripciones', routerLink: ['/uic/enrollments']},
      {label: 'Formulario'},
    ]);
    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
      this.panelHeader = 'Update Enrollment';
    }
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
    this.getModalities();
    this.getPlanning();
    this.loadModalities();
    this.loadPlannings();
    this.getEnrollment();
  }

  get newForm(): UntypedFormGroup {
    return this.formBuilder.group({

      code:[null],
      planning:[null],
      modality:[null],
      observation:[null],
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
    this.router.navigate(['/uic/enrollments']);
  }

  create(enrollment: CreateEnrollmentDto): void {
    this.enrollmentsHttpService.create(enrollment).subscribe(enrollment => {
      this.form.reset(enrollment);
      this.back();
    });
  }

  loadModalities(): void {
    this.modalitiesHttpService.findAll().subscribe((modalities) => this.modalities = modalities);
  }
  loadPlannings(): void {
    this.planningsHttpService.findAll().subscribe((plannings) => this.plannings = plannings);
  }
  // loadState(): void {
  //   this.statesHttpService.findAll().subscribe((states) => this.states = states);
  // }

  getEnrollment(): void {
    this.isLoadingSkeleton = true;
    this.enrollmentsHttpService.findOne(this.id).subscribe((enrollment) => {
      this.isLoadingSkeleton = false;
      this.form.patchValue(enrollment);
    });
  }

  //FK 
  getModalities(): void {
    this.isLoadingSkeleton = true;
    this.modalitiesHttpService.modality(ModalityTypeEnum.MODALITY).subscribe((modalities) => {
      this.isLoadingSkeleton = false;
      this.modalities = modalities
    });
  }

  getPlanning(): void {
    this.isLoadingSkeleton = true;
    this.planningsHttpService.planning(PlanningTypeEnum.PLANNING).subscribe((plannings) => {
      this.isLoadingSkeleton = false;
      this.plannings = plannings
    });
  }

//ACTUALIZAR
  update(enrollment: UpdateEnrollmentDto): void {
    this.enrollmentsHttpService.update(this.id, enrollment).subscribe((enrollment) => {
      this.form.reset(enrollment);
      this.back()
    });
  }

//GET

  get idField() {
    return this.form.controls['id'];
  }

  get requirementField(): AbstractControl {
    return this.form.controls['requirement'];
  }

  get modalityField(): AbstractControl {
    return this.form.controls['modality'];
  }

  get planningField(): AbstractControl {
    return this.form.controls['planning'];
  }

  get codeField(): AbstractControl {
    return this.form.controls['code'];
  }

  get observationField(): AbstractControl {
    return this.form.controls['observation'];
  }

}