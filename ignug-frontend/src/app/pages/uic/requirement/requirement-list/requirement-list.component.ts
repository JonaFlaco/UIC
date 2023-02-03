import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnModel, PaginatorModel } from '@models/core';
import { RequirementModel, SelectRequirementDto } from '@models/uic';
import { AuthService } from '@services/auth';
import { BreadcrumbService, CoreService, MessageService } from '@services/core';
import { RequirementsHttpService } from '@services/uic';
import { MenuItem } from 'primeng/api';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-requirement-list',
  templateUrl: './requirement-list.component.html',
  styleUrls: ['./requirement-list.component.scss']
})
export class RequirementListComponent implements OnInit {
  columns: ColumnModel[];
  loaded$ = this.coreService.loaded$;
  pagination$ = this.requirementsHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: UntypedFormControl = new UntypedFormControl('');
  selectedRequirements: RequirementModel[] = [];
  selectedRequirement: SelectRequirementDto = {};
  requirements: RequirementModel[] = [];
  actionButtons: MenuItem[] = [];


  constructor(
    public authService: AuthService,
    private coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private router: Router,
    private requirementsHttpService: RequirementsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Requerimientos'}
    ]);
    this.columns = this.getColumns();
    this.actionButtons = this.getActionButtons();
    this.pagination$.subscribe((pagination) => this.paginator = pagination);
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((_) => this.findAll());
  }

  ngOnInit(){
    this.findAll();
  }
  checkState(requirement: RequirementModel): string {
    if (requirement.required) return 'success';

    return 'danger';
  }
  solicitedState(requirement: RequirementModel): string {
    if (requirement.solicited) return 'success';

    return 'danger';
  }
  isEnableState(requirement: RequirementModel): string {
    if (requirement.isEnable) return 'success';

    return 'danger';
  }

  findAll(page: number = 0) {
    this.requirementsHttpService.findAll(page, this.search.value).subscribe((requirements) => this.requirements = requirements);
  }

  getColumns(): ColumnModel[] {
    return [
      {field: 'name', header: 'Nombre'},
      //{field: 'career', header: 'Carrera'},
      {field: 'description', header: 'Descripción'},
      {field: 'required', header: 'Requerido'},
      {field: 'solicited', header: 'Solicitado'},
      {field: 'isEnable', header: 'Estado'},
    ]
  }

  getActionButtons(): MenuItem[] {
    return [
      {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: () => {
          if (this.selectedRequirement.id)
            this.redirectEditForm(this.selectedRequirement.id);
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          if (this.selectedRequirement.id)
            this.remove(this.selectedRequirement.id);
        },
      },
    ];
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  redirectCreateForm() {
    this.router.navigate(['/uic/requirements', 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/uic/requirements', id]);
  }

  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.requirementsHttpService.remove(id).subscribe((requirements) => {
            this.requirements = this.requirements.filter(item => item.id !== requirements.id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.requirementsHttpService.removeAll(this.selectedRequirements).subscribe((requirements) => {
          this.selectedRequirements.forEach(requirementDeleted => {
            this.requirements = this.requirements.filter(requirement => requirement.id !== requirementDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedRequirements = [];
        });
      }
    });
  }

  selectRequirement(requirement: RequirementModel) {
    this.selectedRequirement = requirement;
  }

}
