import { InstitutionEntity, CatalogueEntity } from '@core/entities';
import {
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
  minLengthValidationOptions,
} from '@shared/validation';

export class CareerDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly institution: InstitutionEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly modality: CatalogueEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly state: CatalogueEntity;

  @IsOptional()
  readonly type: CatalogueEntity;

  @IsString(isStringValidationOptions())
  @MinLength(3, minLengthValidationOptions())
  @MaxLength(10, maxLengthValidationOptions())
  readonly acronym: string;

  @IsString(isStringValidationOptions())
  @MinLength(3, minLengthValidationOptions())
  @MaxLength(20, maxLengthValidationOptions())
  readonly code: string;

  @IsString(isStringValidationOptions())
  readonly codeSniese: string;

  @IsString(isStringValidationOptions())
  readonly degree: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly logo: string;

  @IsString(isStringValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  readonly resolutionNumber: string;

  @IsString(isStringValidationOptions())
  readonly shortName: string;
}
