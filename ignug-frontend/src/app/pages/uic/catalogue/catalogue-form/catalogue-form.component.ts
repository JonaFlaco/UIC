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
import { CatalogueModel, CreateCatalogueDto, UpdateCatalogueDto } from '@models/uic';
import { CataloguesHttpService } from '@services/uic';

@Component({
  selector: 'app-catalogue-form',
  templateUrl: './catalogue-form.component.html',
  styleUrls: ['./catalogue-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CatalogueFormComponent implements OnInit, OnExitInterface {
  id: string = '';
  bloodTypes: CatalogueModel[] = [];
  types:  CatalogueModel[] = [];
  form: UntypedFormGroup = this.newForm;
  panelHeader: string = 'Crear Catalogo';
  isChangePassword: UntypedFormControl = new UntypedFormControl(false);
  isLoadingSkeleton: boolean = false;
  loaded$ = this.coreService.loaded$;
  checked: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    private coreService: CoreService,
    private formBuilder: UntypedFormBuilder,
    public messageService: MessageService,
    private router: Router,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Catalogues', routerLink: ['/uic/catalogues']},
      {label: 'Form'},
    ]);

    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
      this.panelHeader = 'Update Catalogue';
    }
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
    this.getCatalogue();
  }

  get newForm(): UntypedFormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      state: [false, [Validators.required]],
      code: [null, [Validators.required]],
      type:[null, [Validators.required]],
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
    this.router.navigate(['/uic/catalogues']);
  }

  create(catalogue: CreateCatalogueDto): void {
    this.cataloguesHttpService.create(catalogue).subscribe(catalogue => {
      this.form.reset(catalogue);
      this.back();
    });
  }


  getCatalogue(): void {
    this.isLoadingSkeleton = true;
    this.cataloguesHttpService.findOne(this.id).subscribe((catalogue) => {
      this.isLoadingSkeleton = false;
      this.form.patchValue(catalogue);
    });
  }

  update(catalogue: UpdateCatalogueDto): void {
    this.cataloguesHttpService.update(this.id, catalogue).subscribe((catalogue) => {
      this.form.reset(catalogue);
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

  get stateField() {
    return this.form.controls['state'];
  }
  get codeField() {
    return this.form.controls['code'];
  }

  get typeField() {
    return this.form.controls['type'];
  }
}
