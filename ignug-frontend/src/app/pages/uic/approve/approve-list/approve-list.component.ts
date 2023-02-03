import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {debounceTime} from "rxjs";
import {ColumnModel, PaginatorModel} from '@models/core';
// import {ApprovesHttpService} from '@services/uic';
import {BreadcrumbService, CoreService, MessageService} from '@services/core';
import {MenuItem} from "primeng/api";
// import { ApproveModel, SelectApproveDto } from '@models/uic';
import { AuthService } from '@services/auth';
// import { ApproveModel, SelectApproveDto } from '@models/uic';


@Component({
  selector: 'app-document-list',
  templateUrl: './approve-list.component.html',
  // styleUrls: ['./document-list.component.scss'],
})
export class ApproveListComponent implements OnInit {
  columns: ColumnModel[];
  loaded$ = this.coreService.loaded$;
  // pagination$ = this.documentsHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: UntypedFormControl = new UntypedFormControl('');
  // selectedApproves: ApproveModel[] = [];
  // selectedApprove: SelectApproveDto = {};
  // documents: ApproveModel[] = [];
  actionButtons: MenuItem[] = [];

  constructor(
    public authService: AuthService,
    private coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private router: Router,
    // private documentsHttpService: ApprovesHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Approves'}
    ]);
    this.columns = this.getColumns();
    // this.actionButtons = this.getActionButtons();
    // this.pagination$.subscribe((pagination) => this.paginator = pagination);
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((_) => this.findAll());
  }

  ngOnInit(): void {
    this.findAll();
  }

  // checkState(document: ApproveModel): string {
  //   if (document.isEnable) return 'success';

  // return 'danger';
  // }

  findAll(page: number = 0) {
    // this.documentsHttpService.findAll(page, this.search.value).subscribe((documents) => this.documents = documents);
  }

  getColumns(): ColumnModel[] {
    return [
      {field: '', header: 'Requerimientos'},
      {field: '', header: 'Documento Subido'},
      {field: '', header: 'Estado'},
      {field: '', header: 'Requisitos'},
    ]
  }

  // getActionButtons(): MenuItem[] {
  //   return [
  //     {
  //       label: 'Update',
  //       icon: 'pi pi-pencil',
  //       command: () => {
  //         if (this.selectedApprove.id)
  //           this.redirectEditForm(this.selectedApprove.id);
  //       },
  //     },
  //     {
  //       label: 'Delete',
  //       icon: 'pi pi-trash',
  //       command: () => {
  //         if (this.selectedApprove.id)
  //           this.remove(this.selectedApprove.id);
  //       },
  //     },
  //   ];
  // }

  paginate(document: any) {
    this.findAll(document.page);
  }

  redirectCreateForm() {
    this.router.navigate(['/uic/approvedsForm', 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/uic/approveds', id]);
  }

  remove(id: string) {
    this.messageService.questionDelete()
      // .then((result) => {
      //   if (result.isConfirmed) {
      //     this.documentsHttpService.remove(id).subscribe((document) => {
      //       this.documents = this.documents.filter(item => item.id !== document.id);
      //       this.paginator.totalItems--;
      //     });
      //   }
      // });
  }

  // removeAll() {
  //   this.messageService.questionDelete().then((result) => {
  //     if (result.isConfirmed) {
  //       this.documentsHttpService.removeAll(this.selectedApproves).subscribe((documents) => {
  //         this.selectedApproves.forEach(documentDeleted => {
  //           this.documents = this.documents.filter(document => document.id !== documentDeleted.id);
  //           this.paginator.totalItems--;
  //         });
  //         this.selectedApproves = [];
  //       });
  //     }
  //   });
  // }

  // selectApprove(document: ApproveModel) {
  //   this.selectedApprove = document;
  // }
}
