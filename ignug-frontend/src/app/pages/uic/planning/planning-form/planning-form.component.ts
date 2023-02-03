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
import { ModalitiesHttpService, PlanningsHttpService } from '@services/uic';
import { CreatePlanningDto, ModalityModel, PlanningModel, UpdatePlanningDto } from '@models/uic';
import { ModalityTypeEnum } from '@shared/enums';
import { format } from 'date-fns';
import { DateValidators } from '@shared/validators';


@Component({
  selector: 'app-planning-form',
  templateUrl: './planning-form.component.html',
  styleUrls: ['./planning-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlanningFormComponent implements OnInit, OnExitInterface {
  id: string = '';
  bloodTypes: PlanningModel[] = [];
  nameModalities: ModalityModel[] = [];
  form: UntypedFormGroup = this.newForm;
  panelHeader: string = 'Crear Convocatoria';
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
    private modalitiesHttpService: ModalitiesHttpService,
    private planningsHttpService: PlanningsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Plannings', routerLink: ['/uic/plannings']},
      {label: 'Form'},
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
      this.panelHeader = 'Update Planning';
    }
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
    this.loadNameModality();
    this.getPlanning();
  }

  get newForm(): UntypedFormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      añoLectivo: [null, [Validators.required]],
      description: [null, [Validators.required]],
      endDate:[null, [Validators.required]],
      startDate:[null, [DateValidators.min(new Date())]],
      nameModality: [null, [Validators.required]],
       isEnable: [false, [Validators.required]],
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
    this.router.navigate(['/uic/plannings']);
  }

  create(planning: CreatePlanningDto): void {
    this.planningsHttpService.create(planning).subscribe(planning => {
      this.form.reset(planning);
      this.back();
    });
  }

  loadNameModality(): void {
    this.modalitiesHttpService.modality(ModalityTypeEnum.PLANNING_NAMES).subscribe((nameModalities) => this.nameModalities = nameModalities);
 }

  getPlanning(): void {
    this.isLoadingSkeleton = true;
    this.planningsHttpService.findOne(this.id).subscribe((planning) => {
      this.isLoadingSkeleton = false;
      this.form.patchValue(planning);
      let startedAt = format(new Date(planning.startDate), 'dd/MM/yyyy');
      console.log (startedAt);
      this.startDateField.setValue(startedAt);
      let endedAt = format(new Date(planning.endDate), 'dd/MM/yyyy');
      console.log (endedAt);
      this.endDateField.setValue(endedAt);
    });
  }

  getPlanningNames(): void {
    this.isLoadingSkeleton = true;
    this.modalitiesHttpService.modality(ModalityTypeEnum.PLANNING_NAMES).subscribe((nameModalities) => {
      this.isLoadingSkeleton = false;
      this.nameModalities = nameModalities;
    });
  }

  update(planning: UpdatePlanningDto): void {
    this.planningsHttpService.update(this.id, planning).subscribe((planning) => {
      this.form.reset(planning);
      this.back()
    });
  }

  // Getters
  get idField() {
    return this.form.controls['id'];
  }

  get nameField() {
    return this.form.controls['name'];
  }

  get nameModalityField() {
    return this.form.controls['nameModality'];
  }

  get descriptionField() {
    return this.form.controls['description'];
  }

  get endDateField() {
    return this.form.controls['endDate'];
  }

  get startDateField() {
    return this.form.controls['startDate'];
  }
}
