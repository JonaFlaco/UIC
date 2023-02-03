import { Exclude, Expose } from 'class-transformer';
import { BaseEventDto } from '@uic/dto';
@Exclude()
export class ReadEventDto extends BaseEventDto {
  @Expose()
  readonly id;

  @Expose()
  readonly name;

  @Expose()
  readonly planning;

  @Expose()
  readonly startDate;

  @Expose()
  readonly endDate;

  @Expose()
  readonly sort;

  @Expose()
  readonly isEnable;
}
