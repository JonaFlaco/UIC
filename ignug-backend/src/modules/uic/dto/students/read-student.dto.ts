import { Exclude, Expose } from 'class-transformer';
import { BaseStudentDto } from '@uic/dto';

@Exclude()
export class ReadStudentDto extends BaseStudentDto {

  @Expose()
  readonly observation;
}
