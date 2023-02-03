import { StudentModel } from "./student.model";

export interface StudentInformationModel {
  id: string;
  // student: StudentModel[];
  companyArea: string;
  companyPosition: string;
  relationLaboralCareer: string;
  companywork: string;
}

export interface CreateStudentInformationDto extends Omit<StudentInformationModel, 'id'> {
}

export interface UpdateStudentInformationDto extends Partial<Omit<StudentInformationModel, 'id'>> {
}

export interface ReadStudentInformationDto extends Partial<StudentInformationModel> {
}

export interface SelectStudentInformationDto extends Partial<StudentInformationModel> {
}
