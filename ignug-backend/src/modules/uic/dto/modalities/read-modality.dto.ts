import { Exclude, Expose } from 'class-transformer';
import { BaseModalityDto } from '@uic/dto';

@Exclude()
export class ReadModalityDto extends BaseModalityDto {
  @Expose()
  readonly id;

  @Expose()
  readonly name;

  @Expose()
  readonly description;

  @Expose()
  readonly state;
}
