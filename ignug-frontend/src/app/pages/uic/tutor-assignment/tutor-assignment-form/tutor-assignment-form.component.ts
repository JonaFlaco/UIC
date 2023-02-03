import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateTutorAssignmentDto, CatalogueModel, ProjectModel, UpdateTutorAssignmentDto, ProjectPlanModel } from '@models/uic';
import { BreadcrumbService, CoreService, MessageService } from '@services/core';
import { CataloguesHttpService, TutorAssignmentsHttpService, ProjectsHttpService } from '@services/uic';
import { UntypedFormBuilder } from '@angular/forms';
import { CatalogueTypeEnum } from '@shared/enums';
import { OnExitInterface } from '@shared/interfaces';
import { ProjectPlansHttpService } from '../../../../services/uic/project-plan-http.service';

@Component({
  selector: 'app-tutor-assignment-form',
  templateUrl: './tutor-assignment-form.component.html',
  styleUrls: ['./tutor-assignment-form.component.scss']
})
export class TutorAssignmentFormComponent implements OnInit, OnExitInterface {

  id: string = '';
  projects: ProjectModel[] = [];
  //teachers: TeacherModel[] = [];
  types: CatalogueModel[] = [];
  projectPlans: ProjectPlanModel[] = [];
  panelHeader: string = 'Asignación de tutor';
  form: UntypedFormGroup = this.newForm;
  isLoadingSkeleton: boolean = false;
  loaded$ = this.coreService.loaded$;


  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    private coreService: CoreService,
    private formBuilder: UntypedFormBuilder,
    public messageService: MessageService,
    private router: Router,
    private tutorAssignmentsHttpService: TutorAssignmentsHttpService,
    private projectsHttpService: ProjectsHttpService,
    private projectPlansHttpService: ProjectPlansHttpService
  ) {
    this.breadcrumbService.setItems([
      {label: 'Asignación tutor', routerLink: ['/uic/tutor-assignments']},
      {label: 'Formulario'},
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
      this.panelHeader = 'Update Tutor Assignment';
    }
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
    this.getTutorAssignment();
    this.loadProjects();
    this.loadTypes();
    this.loadProjectPlans()

  }

  get newForm(): UntypedFormGroup {
    return this.formBuilder.group({
      project: [null,[Validators.required]],
      // teacher: [null],
       type: [null,[Validators.required]],
       projectPlan: [null,[Validators.required]],
      observation: [null,[Validators.required]],
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
    this.router.navigate(['/uic/tutor-assignments']);
  }

  create(tutorAssignment: CreateTutorAssignmentDto): void {
    this.tutorAssignmentsHttpService.create(tutorAssignment).subscribe(tutorAssignment => {
      this.form.reset(tutorAssignment);
      this.back();
    });
  }

  loadTypes(): void {
    this.cataloguesHttpService.catalogue(CatalogueTypeEnum.TYPES).subscribe((types) => this.types = types);
  }

  loadProjects(): void {
    this.projectsHttpService.findAll().subscribe((projects) => this.projects = projects);
  }
  loadProjectPlans(): void {
    this.projectPlansHttpService.findAll().subscribe((projectPlans) => this.projectPlans = projectPlans);
  }

  /*loadTeachers(): void {
    this.teachersHttpService.findAll().subscribe((teachers) => this.teachers = teachers);
  }*/

  getTutorAssignment(): void {
    this.isLoadingSkeleton = true;
    this.tutorAssignmentsHttpService.findOne(this.id).subscribe((tutorAssignment) => {
      this.isLoadingSkeleton = false;
      this.form.patchValue(tutorAssignment);
    });
  }
  getType(): void {
    this.isLoadingSkeleton = true;
    this.cataloguesHttpService.catalogue(CatalogueTypeEnum.TYPES).subscribe((type) => {
      this.isLoadingSkeleton = false;
      this.types = type

    });
  }
    getProject(): void {
      this.isLoadingSkeleton = true;
      this.projectsHttpService.catalogue(CatalogueTypeEnum.PROJECT_TITLES).subscribe((project) => {
        this.isLoadingSkeleton = false;
        this.projects = project

      });
  }
  getProjectPlan(): void {
    this.isLoadingSkeleton = true;
    this.projectPlansHttpService.catalogue(CatalogueTypeEnum. PROJECT_PLAN_DESCRIPTION).subscribe((projectPlan) => {
      this.isLoadingSkeleton = false;
      this.projectPlans = projectPlan

    });
}
  update(tutorAssignment: UpdateTutorAssignmentDto): void {
    this.tutorAssignmentsHttpService.update(this.id, tutorAssignment).subscribe((tutorAssignment) => {
      this.form.reset(tutorAssignment);
      this.back()
    });
  }
     get idField(){
      return this.form.controls['id'];
     }
  get typeField(): AbstractControl {
    return this.form.controls['type'];
  }

  get observationField() {
    return this.form.controls['observation'];

  }

  get projectField(): AbstractControl {
    return this.form.controls['project'];
  }

  get projectPlanField(): AbstractControl {
    return this.form.controls['projectPlan'];
  }

  // get teacherField() {
  //   return this.form.controls['teacher'];
  // }

}
