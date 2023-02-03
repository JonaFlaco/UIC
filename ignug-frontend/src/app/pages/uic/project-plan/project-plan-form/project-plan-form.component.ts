import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {BreadcrumbService, CoreService, MessageService} from '@services/core';
import {OnExitInterface} from '@shared/interfaces';
import { CatalogueModel, CreateProjectPlanDto, PlanningModel, UpdateProjectPlanDto } from '@models/uic';
import { CataloguesHttpService, PlanningsHttpService, ProjectPlansHttpService } from '@services/uic';
import { PlanningTypeEnum } from '@shared/enums/planning.enum';
import { CatalogueTypeEnum } from '@shared/enums';
import { format } from 'date-fns';

@Component({
  selector: 'app-project-plan-form',
  templateUrl: './project-plan-form.component.html',
  styleUrls: ['./project-plan-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectPlanFormComponent implements OnInit, OnExitInterface {
  id: string = '';
  states: CatalogueModel[]=[];
  plannings: PlanningModel[] = [];
  form: UntypedFormGroup = this.newForm;
  panelHeader: string = 'Crear Ante proyecto';
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
    private projectPlansHttpService: ProjectPlansHttpService,
    private planningsHttpService: PlanningsHttpService,
    private cataloguesHttpService: CataloguesHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Ante proyectos', routerLink: ['/uic/project-plans']},
      {label: 'Formulario'},
    ]);
    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
      this.panelHeader = 'Update ProjectPlan';
    }
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
    this.getProjectPlan();
    this.getPlanningNames();
    this. getState();
  }

  get newForm(): UntypedFormGroup {
    return this.formBuilder.group({
      title:[null, [Validators.required]],
      description:[null, [Validators.required]],
      actCode:[null, [Validators.required]],
      state:[null],
      planning: [null],
      approvedAt:[null, [Validators.required]],
      assignedAt:[null, [Validators.required]],
      tutorApprovedAt:[null, [Validators.required]],
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
    this.router.navigate(['/uic/project-plans']);
  }

  create(projectPlan: CreateProjectPlanDto): void {
    this.projectPlansHttpService.create(projectPlan).subscribe(projectPlan => {
      this.form.reset(projectPlan);
      this.back();
    });
  }

  getProjectPlan(): void {
    this.isLoadingSkeleton = true;
    this.projectPlansHttpService.findOne(this.id).subscribe((projectPlan) => {
      this.isLoadingSkeleton = false;
      this.form.patchValue(projectPlan);
     
      let assignedAt = format(new Date(projectPlan.assignedAt), 'dd/MM/yyyy');
      console.log (assignedAt);
      this.assignedAtField.setValue(assignedAt);

      let approvedAt = format(new Date(projectPlan.approvedAt), 'dd/MM/yyyy');
      console.log (approvedAt);
      this.approvedAtField.setValue(approvedAt);

      let tutorApprovedAt = format(new Date(projectPlan.tutorApprovedAt), 'dd/MM/yyyy');
      console.log (tutorApprovedAt);
      this.tutorApprovedAtField.setValue(tutorApprovedAt);
    });
  }

  getPlanningNames(): void {
    this.isLoadingSkeleton = true;
    this.planningsHttpService.planning(PlanningTypeEnum.EVENT_NAMES).subscribe((plannings) => {
      this.isLoadingSkeleton = false;
      this.plannings = plannings;
    });
  }
  getState(): void {
    this.isLoadingSkeleton = true;
    this.cataloguesHttpService.catalogue(CatalogueTypeEnum.PROJECT_PLAN_STATES).subscribe((states) => {
      this.isLoadingSkeleton = false;
      this.states = states;
    });
  }
  loadPlannings(): void {
    this.planningsHttpService.findAll().subscribe((planningId) => this.plannings = planningId);
  }

  update(projectPlan: UpdateProjectPlanDto): void {
    this.projectPlansHttpService.update(this.id, projectPlan).subscribe((projectPlan) => {
      this.form.reset(projectPlan);
      this.back()
    });
  }

//GET


  get titleField(): AbstractControl {
    return this.form.controls['title'];
  }

  get descriptionField(): AbstractControl {
    return this.form.controls['description'];
  }

  get planningField() {
    return this.form.controls['planning'];
  }


  get actCodeField(): AbstractControl {
    return this.form.controls['actCode'];
  }

  get stateField(): AbstractControl {
    return this.form.controls['state'];
  }
  get assignedAtField(): AbstractControl {
    return this.form.controls['assignedAt'];
  }

  get approvedAtField(): AbstractControl {
    return this.form.controls['approvedAt'];
  }

  get tutorApprovedAtField(): AbstractControl {
    return this.form.controls['tutorApprovedAt'];
  }

  get observationField(): AbstractControl {
    return this.form.controls['observation'];
  }
}
