import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { CreateRequirementDto,  RequirementModel, UpdateRequirementDto } from '@models/uic';
import {BreadcrumbService, CoreService, MessageService} from '@services/core';
import { RequirementsHttpService } from '@services/uic';
import {OnExitInterface} from '@shared/interfaces';

@Component({
  selector: 'app-requirement-form',
  templateUrl: './requirement-form.component.html',
  styleUrls: ['./requirement-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RequirementFormComponent implements OnInit, OnExitInterface {
  id: string = '';
  form: UntypedFormGroup = this.newForm;
  panelHeader: string = 'Crear Requerimiento';
  isLoadingSkeleton: boolean = false;
  loaded$ = this.coreService.loaded$;
  checked: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private requirementsHttpService: RequirementsHttpService,
    private coreService: CoreService,
    private formBuilder: UntypedFormBuilder,
    public messageService: MessageService,
    private router: Router,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Requirements', routerLink: ['/uic/requirements']},
      {label: 'Form'},
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
      this.panelHeader = 'Update Requirements';
    }
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
    this.getRequirement();
  }

  get newForm(): UntypedFormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      //career: [null, [Validators.required]],
      description: [null],
      required: [false, [Validators.required]],
      solicited: [false, [Validators.required]],
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
    this.router.navigate(['/uic/requirements']);
  }

  create(requirement: CreateRequirementDto): void {
    this.requirementsHttpService.create(requirement).subscribe(requirement => {
      this.form.reset(requirement);
      this.back();
    });
  }


  getRequirement(): void {
    this.isLoadingSkeleton = true;
    this.requirementsHttpService.findOne(this.id).subscribe((requirement) => {
      this.isLoadingSkeleton = false;
      this.form.patchValue(requirement);
    });
  }

  update(requirement: UpdateRequirementDto): void {
    this.requirementsHttpService.update(this.id, requirement).subscribe((requirement) => {
      this.form.reset(requirement);
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

  get descriptionField() {
    return this.form.controls['description'];
  }
  get requiredField() {
    return this.form.controls['required'];
  }
  get solicitedField() {
    return this.form.controls['solicited'];
  }
  get isEnableField() {
    return this.form.controls['isEnable'];
  }
}
