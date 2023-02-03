import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {debounceTime} from "rxjs";
import {ColumnModel, PaginatorModel} from '@models/core';
import {StudentsHttpService} from '@services/uic';
import {BreadcrumbService, CoreService, MessageService} from '@services/core';
import {MenuItem} from "primeng/api";
import {SelectStudentDto, StudentModel } from '@models/uic';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentListComponent implements OnInit {
  columns: ColumnModel[];
  loaded$ = this.coreService.loaded$;
  pagination$ = this.studentsHttpService.pagination$;
  paginator: PaginatorModel = this.coreService.paginator;
  search: UntypedFormControl = new UntypedFormControl('');
  selectedStudents: StudentModel[] = [];
  selectedStudent: SelectStudentDto = {};
  students: StudentModel[] = [];
  actionButtons: MenuItem[] = [];

  constructor(
    private coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    public messageService: MessageService,
    private router: Router,
    private studentsHttpService: StudentsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Students'}
    ]);
    this.columns = this.getColumns();
    this.actionButtons = this.getActionButtons();
    this.pagination$.subscribe((pagination) => this.paginator = pagination);
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((_) => this.findAll());
  }

  ngOnInit() {
    this.findAll();
  }

  checkState(student: StudentModel): string {
    if (student.id) return 'danger';

    return 'success';
  }

  findAll(page: number = 0) {
    this.studentsHttpService.findAll(page, this.search.value).subscribe((students) => this.students = students);
  }

  getColumns(): ColumnModel[] {
    return [
      {field: 'companyArea', header: 'Company Area'},
      {field: 'companyPosition', header: 'Company Position'},
      {field: 'relationLaboralCareer', header: 'Relation Laboral Career'},
      {field: 'observation', header: 'Company work'},

    ]
  }

  getActionButtons(): MenuItem[] {
    return [
      {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: () => {
          if (this.selectedStudent.id)
            this.redirectEditForm(this.selectedStudent.id);
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          if (this.selectedStudent.id)
            this.remove(this.selectedStudent.id);
        },
      },
    ];
  }

  paginate(event: any) {
    this.findAll(event.page);
  }

  redirectCreateForm() {
    this.router.navigate(['/uic/students', 'new']);
  }

  redirectEditForm(id: string) {
    this.router.navigate(['/uic/students', id]);
  }

  remove(id: string) {
    this.messageService.questionDelete()
      .then((result) => {
        if (result.isConfirmed) {
          this.studentsHttpService.remove(id).subscribe((student) => {
            this.students = this.students.filter(item => item.id !== student.id);
            this.paginator.totalItems--;
          });
        }
      });
  }

  removeAll() {
    this.messageService.questionDelete().then((result) => {
      if (result.isConfirmed) {
        this.studentsHttpService.removeAll(this.selectedStudents).subscribe((students) => {
          this.selectedStudents.forEach(studentDeleted => {
            this.students = this.students.filter(student => student.id !== studentDeleted.id);
            this.paginator.totalItems--;
          });
          this.selectedStudents = [];
        });
      }
    });
  }

  selectStudent(student: StudentModel) {
    this.selectedStudent = student;
  }
}
