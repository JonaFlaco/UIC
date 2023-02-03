import { PlanningModel } from "./planning.model";
import { CatalogueModel } from "./catalogue.model";
export interface ProjectPlanModel {
    id: string;
    // tutor_id:
    planning?:PlanningModel[];
    state?:CatalogueModel[];
    approvedAt: Date;
    assignedAt: Date;
    actCode: string;
    description: string;
    observation:string;
    title:string;
    tutorApprovedAt:Date;
}
export interface CreateProjectPlanDto extends Omit<ProjectPlanModel, 'id'> {
}

export interface UpdateProjectPlanDto extends Partial<Omit<ProjectPlanModel, 'id'>> {
}

export interface SelectProjectPlanDto extends Partial<ProjectPlanModel> {
}
