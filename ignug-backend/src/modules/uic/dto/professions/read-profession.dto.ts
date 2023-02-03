import { Exclude, Expose } from 'class-transformer';
import { BaseProfessionDto } from '@uic/dto';

@Exclude()
export class ReadProfessionDto extends BaseProfessionDto {

  @Expose()
  readonly id;
  
  // @Expose()
  // readonly code;

  @Expose()
  readonly career;

  // @Expose()
  // readonly modality;

  // @Expose()
  // readonly planning;

  // @Expose()
  // readonly registeredAt;

}