import { Exclude, Expose } from 'class-transformer';
import { BasePlanningDto } from '@uic/dto';

@Exclude()
export class ReadPlanningDto extends BasePlanningDto {
  
  @Expose()
  readonly id;
  
  @Expose()
  readonly name;

  @Expose()
  readonly description;

  @Expose()
  readonly startDate;

  @Expose()
  readonly endDate;

  @Expose()
  readonly nameModality;
}
