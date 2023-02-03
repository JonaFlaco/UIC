import { Exclude, Expose } from 'class-transformer';
import { BaseProjectDto } from '@uic/dto';

@Exclude()
export class ReadProjectDto extends BaseProjectDto {
  
  @Expose()
  readonly id;
  @Expose()
  readonly title;
  @Expose()
  readonly description;
  @Expose()
  readonly approved;
  @Expose()
  readonly score;
  @Expose()
  readonly observation;
  @Expose()
  readonly projectPlan;
  @Expose()
  readonly enrollment;

}
