import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {debounceTime} from "rxjs";
import {ColumnModel, PaginatorModel} from '@models/core';
import {DocumentsHttpService} from '@services/uic';
import {BreadcrumbService, CoreService, MessageService} from '@services/core';
import {MenuItem} from "primeng/api";
import { DocumentModel, SelectDocumentDto } from '@models/uic';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent implements OnInit {
  columns: ColumnModel[];
  loaded$ = this.coreService.loaded$;
  pagination$ = this.documentsHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: UntypedFormControl = new UntypedFormControl('');
  selectedDocuments: DocumentModel[] = [];
  selectedDocument: SelectDocumentDto = {};
  documents: DocumentModel[] = [];
  actionButtons: MenuItem[] = [];

  constructor(
    public authService: AuthService,
    private coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private router: Router,
    private documentsHttpService: DocumentsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Documents'}
    ]);
    this.columns = this.getColumns();
    this.actionButtons = this.getActionButtons();
    this.pagination$.subscribe((pagination) => this.paginator = pagination);
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((_) => this.findAll());
  }

  ngOnInit(): void {
    this.findAll();
  }

  // checkState(document: DocumentModel): string {
  //   if (document.isEnable) return 'success';

  // return 'danger';
  // }

  findAll(page: number = 0) {
    this.documentsHttpService.findAll(page, this.search.value).subscribe((documents) => this.documents = documents);
  }

  getColumns(): ColumnModel[] {
    return [
      // {field: 'sort', header: 'Orden'},
      {field: 'name', header: 'Nombre'},
      // {field: 'planning', header: 'Convocatoria'},
      // {field: 'startDate', header: 'Fecha de inicio'},
      // {field: 'endDate', header: 'Fecha fin'},
      // {field: 'isEnable', header: 'Estado'},
    ]
  }

  getActionButtons(): MenuItem[] {
    return [
      {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: () => {
          if (this.selectedDocument.id)
            this.redirectEditForm(this.selectedDocument.id);
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          if (this.selectedDocument.id)
            this.remove(this.selectedDocument.id);
        },
      },
    ];
  }

  paginate(document: any) {
    this.findAll(document.page);
  }

  redirectCreateForm() {
    this.router.navigate(['/uic/documents', 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/uic/documents', id]);
  }

  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.documentsHttpService.remove(id).subscribe((document) => {
            this.documents = this.documents.filter(item => item.id !== document.id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.documentsHttpService.removeAll(this.selectedDocuments).subscribe((documents) => {
          this.selectedDocuments.forEach(documentDeleted => {
            this.documents = this.documents.filter(document => document.id !== documentDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedDocuments = [];
        });
      }
    });
  }

  selectDocument(document: DocumentModel) {
    this.selectedDocument = document;
  }
}
