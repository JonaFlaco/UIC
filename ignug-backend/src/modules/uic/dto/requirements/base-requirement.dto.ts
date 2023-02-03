import { isBooleanValidationOptions, isNotEmptyValidationOptions, isStringValidationOptions } from '@shared/validation';
import {
  IsString,
  IsBoolean,
  Allow,
  IsNotEmpty,
} from 'class-validator';
export class BaseRequirementDto {
  // @Allow()
  // readonly career: CareerEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly name: string;

  @IsBoolean(isBooleanValidationOptions())
  readonly required: boolean;

  @IsBoolean(isBooleanValidationOptions())
  readonly solicited: boolean;

  @IsBoolean(isBooleanValidationOptions())
  readonly isEnable: boolean;

  @IsString(isStringValidationOptions())
  readonly description: string;

  

}
