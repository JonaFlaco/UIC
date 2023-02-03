import { ProjectPlanModel } from "@models/uic";
//import { MeshStudentModel } from "@models/ignug";

export interface StudentModel {
    id: string;
    //meshStudentId: MeshStudentModel;
    projectPlanId:ProjectPlanModel;
    observation?: string;
  }
  
  export interface CreateStudentDto extends Omit<StudentModel, 'id'> {
  }
  
  export interface UpdateStudentDto extends Partial<Omit<StudentModel, 'id'>> {
  }
  
  export interface ReadStudentDto extends Partial<StudentModel> {
  }
  
  export interface SelectStudentDto extends Partial<StudentModel> {
  }
  