import { RequirementModel } from "./requirement.model";

export interface RequirementFormatModel {
  nameFormat:string;
  document:string;
  required:boolean;

}
export interface CreateRequirementRequestDto extends Omit<RequirementFormatModel, 'id'> {
}

export interface UpdateRequirementRequestDto extends Partial<Omit<RequirementFormatModel, 'id'>> {
}

export interface SelectRequirementRequestDto extends Partial<RequirementFormatModel> {
}

//export interface ReadRequirementRequestDto extends Partial<RequirementFormatModel> {
//}
