
export interface RequirementModel{
  id:string;
  //careerId:CareerModel[];
  name:string;
  required:boolean;
  solicited:boolean;
  isEnable:boolean;
  description:string;
}

export interface CreateRequirementDto extends Omit<RequirementModel, 'id'> {
}

export interface UpdateRequirementDto extends Partial<Omit<RequirementModel, 'id'>> {
}

export interface SelectRequirementDto extends Partial<RequirementModel> {
}
