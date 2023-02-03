import { Exclude, Expose } from 'class-transformer';
import { BaseProjectPlanDto } from '@uic/dto';

@Exclude()
export class ReadProjectPlanDto extends BaseProjectPlanDto {

  @Expose()
  readonly id;

  @Expose()
  readonly title;

  @Expose()
  readonly description;

  @Expose()
  readonly actCode;

  @Expose()
  readonly approvedAt;

  @Expose()
  readonly assignedAt;

  @Expose()
  readonly tutorApprovedAt;

  @Expose()
  readonly observation;

  @Expose()
  readonly planning;
  
  @Expose()
  readonly state;

  

  
  
  

 

}