//import {PermissionModel} from './modality.model';

import { ModalityModel } from "./modality.model";

export interface PlanningModel {
  id: string;
  description: string;
  endDate: Date;
  name: string;
  startDate: Date;
  nameModalities: ModalityModel[];
  }

export interface CreatePlanningDto extends Omit<PlanningModel, 'id'> {
}

export interface UpdatePlanningDto extends Partial<Omit<PlanningModel, 'id'>> {
}

export interface ReadPlanningDto extends Partial<PlanningModel> {
}

export interface SelectPlanningDto extends Partial<PlanningModel> {
}
