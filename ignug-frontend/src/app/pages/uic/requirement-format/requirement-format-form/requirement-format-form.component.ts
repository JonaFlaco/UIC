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
  selector: 'app-requirement-format-form',
  templateUrl: './requirement-format-form.component.html',
  styleUrls: ['./requirement-format-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RequirementFormatFormComponent implements OnInit, OnExitInterface {
  id: string = '';
  form: UntypedFormGroup = this.newForm;
  panelHeader: string = 'Crear Formato';
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
      {label: 'Requirements', routerLink: ['/uic/requirement-formats']},
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
      nameFormat: [null, [Validators.required]],
      document: [null, [Validators.required]],
      required: [false, [Validators.required]],
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
    this.router.navigate(['/uic/requirement-formats']);
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

  myUploader(doc:any):void{
    console.log(doc);
  }

  // Getters
  get idField() {
    return this.form.controls['id'];
  }

  get nameFormatField() {
    return this.form.controls['nameFormat'];
  }
  get documentField() {
    return this.form.controls['document'];
  }
  get requiredField() {
    return this.form.controls['nameFormat'];
  }

}
