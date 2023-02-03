import { Exclude, Expose } from 'class-transformer';
import { BaseStudentInformationDto } from './base-student-information.dto';
@Exclude()
export class ReadStudentInformationDto extends BaseStudentInformationDto {
  // @Expose()
  // readonly student;
  
  @Expose()
  readonly id;
  @Expose()
  readonly companyWork;
  @Expose()
  readonly companyArea;
  @Expose()
  readonly companyPosition;
  @Expose()
  readonly relationLaboralCarrer;
}
