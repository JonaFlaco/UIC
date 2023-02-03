import { Exclude, Expose } from 'class-transformer';
import { BaseRequirementRequestDto } from '@uic/dto';

@Exclude()
export class ReadRequirementRequestDto extends BaseRequirementRequestDto {
  @Expose()
  readonly id;
  
  @Expose()
  readonly approved;

  @Expose()
  readonly observations;

  @Expose()
  readonly name;

  // @Expose()
  // readonly registered_at;

}
