
import {
  IsString,
  Allow,
  IsOptional,
} from 'class-validator';
import {
  isStringValidationOptions,
} from '@shared/validation';
import { CatalogueEntity, ProjectEntity, ProjectPlanEntity } from '@uic/entities';

export class BaseTutorAssignmentDto {
  @Allow()
  readonly project: ProjectEntity;

  @Allow()
  readonly type: CatalogueEntity;

   @Allow()
   readonly projectPlan: ProjectPlanEntity;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly observation: string;

}
