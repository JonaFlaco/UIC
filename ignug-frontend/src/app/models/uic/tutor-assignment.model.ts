import { CatalogueModel, ProjectModel } from '@models/uic';
export interface TutorAssignmentModel{
  id:string;
  projects:ProjectModel[];
  //teachers:TeacherModel[];
  types:CatalogueModel[];
  observations:string;
}
export interface CreateTutorAssignmentDto extends Omit<TutorAssignmentModel, 'id'> {
}

export interface UpdateTutorAssignmentDto extends Partial<Omit<TutorAssignmentModel, 'id'>> {
}

export interface SelectTutorAssignmentDto extends Partial<TutorAssignmentModel> {
}
