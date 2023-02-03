import { Exclude, Expose } from 'class-transformer';
import { BaseProjectPlanDto } from '@uic/dto';

@Exclude()
export class ReadMeshStudentRequirementDto extends BaseProjectPlanDto {
  
  @Expose()
  readonly id;
 
  @Expose()
  readonly approved;

  @Expose()
  readonly observations;

  @Expose()
  readonly requirement;

}