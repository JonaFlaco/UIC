import { IsBoolean, IsNotEmpty, IsString} from 'class-validator';
import { isBooleanValidationOptions } from '@shared/validation';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,

} from '@shared/validation';

export class BaseCatalogueDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly description: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean(isBooleanValidationOptions())
  readonly state: boolean;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly code: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly type: string;
}
