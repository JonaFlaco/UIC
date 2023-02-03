import { CatalogueEntity } from '@core/entities';
import { ProjectPlanEntity } from '@uic/entities';
import { IsNotEmpty, Allow, IsOptional } from 'class-validator';
import { isNotEmptyValidationOptions, maxLengthValidationOptions} from '@shared/validation';

export class BaseStudentDto {

 /*@IsNotEmpty(isNotEmptyValidationOptions())
  @Allow()
  readonly meshStudentId: MeshStudentEntity;*/

  //@IsNotEmpty(isNotEmptyValidationOptions())
  @Allow()
  readonly proyectPlanId: ProjectPlanEntity;

  @IsOptional()
  observation: string;
}
