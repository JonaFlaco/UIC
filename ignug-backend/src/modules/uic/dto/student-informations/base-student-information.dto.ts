import { StudentEntity } from '@uic/entities';
import { IsNotEmpty, Allow, IsString } from 'class-validator';
import { isNotEmptyValidationOptions } from '@shared/validation';

export class BaseStudentInformationDto {
  //@IsNotEmpty(isNotEmptyValidationOptions())
  //readonly studentInformation: StudentInformationEntity;

  // @Allow()
  // readonly student: StudentEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly companyWork: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly companyArea: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly companyPosition: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly relationLaboralCarrer: string;
}
