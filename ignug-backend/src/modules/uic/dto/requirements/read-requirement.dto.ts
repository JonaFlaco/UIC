import { Exclude, Expose } from 'class-transformer';
import { BaseRequirementDto } from '@uic/dto';

@Exclude()
export class ReadRequirementDto extends BaseRequirementDto {

  @Expose()
  readonly id;
  
  @Expose()
  readonly name;

  @Expose()
  readonly required;

  @Expose()
  readonly solicited;

  @Expose()
  readonly isEnable;

  @Expose()
  readonly description;


}
