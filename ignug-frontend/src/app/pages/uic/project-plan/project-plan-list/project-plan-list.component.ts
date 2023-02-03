import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {debounceTime} from "rxjs";
import {SelectProjectPlanDto, ProjectPlanModel} from '@models/uic';
import {ColumnModel, PaginatorModel} from '@models/core';
import {ProjectPlansHttpService} from '@services/uic';
import {BreadcrumbService, CoreService, MessageService} from '@services/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "@services/auth";


@Component({
  selector: 'app-project-plan-list',
  templateUrl: './project-plan-list.component.html',
  styleUrls: ['./project-plan-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectPlanListComponent implements OnInit {
  columns: ColumnModel[];
  loaded$ = this.coreService.loaded$;
  pagination$ = this.projectPlansHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: UntypedFormControl = new UntypedFormControl('');
  selectedProjectPlans: ProjectPlanModel[] = [];
  selectedProjectPlan: SelectProjectPlanDto = {};
  projectPlans: ProjectPlanModel[] = [];
  actionButtons: MenuItem[] = [];

  constructor(
    public authService: AuthService,
    private coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private router: Router,
    private projectPlansHttpService: ProjectPlansHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Ante-Proyectos'}
    ]);
    this.columns = this.getColumns();
    this.actionButtons = this.getActionButtons();
    this.pagination$.subscribe((pagination) => this.paginator = pagination);
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((_) => this.findAll());
  }

  ngOnInit() {
    this.findAll();
  }


  findAll(page: number = 0) {
    this.projectPlansHttpService.findAll(page, this.search.value).subscribe((projectPlans) => this.projectPlans = projectPlans);
  }

  getColumns(): ColumnModel[] {
    return [
      {field: 'planning', header: 'Convocatoria'},
      {field: 'state', header: 'Estado'},
      {field: 'title', header: 'Tema'},
      {field: 'description', header: 'Descripción'},
      {field: 'actCode', header: 'Código del acta'},
      {field: 'approvedAt', header: 'Fecha de Aprobacion'},
      {field: 'assignedAt', header: 'Fecha de asignación'},
      {field: 'tutorApprovedAt', header: 'Fecha de Aprobacion por el tutor'},
      {field: 'observation', header: 'Observación'},

    ]
  }

  getActionButtons(): MenuItem[] {
    return [
      {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: () => {
          if (this.selectedProjectPlan.id)
            this.redirectEditForm(this.selectedProjectPlan.id);
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          if (this.selectedProjectPlan.id)
            this.remove(this.selectedProjectPlan.id);
        },
      },

    ];
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  redirectCreateForm() {
    this.router.navigate(['/uic/project-plans', 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/uic/project-plans', id]);
  }

  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.projectPlansHttpService.remove(id).subscribe((projectPlan) => {
            this.projectPlans = this.projectPlans.filter(item => item.id !== projectPlan.id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.projectPlansHttpService.removeAll(this.selectedProjectPlans).subscribe((projectPlans) => {
          this.selectedProjectPlans.forEach(ProjectPlanDeleted => {
            this.projectPlans = this.projectPlans.filter(projectPlan => projectPlan.id !== ProjectPlanDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedProjectPlans = [];
        });
      }
    });
  }

  selectProjectPlan(projectPlan: ProjectPlanModel) {
    this.selectedProjectPlan = projectPlan;
  }
}
