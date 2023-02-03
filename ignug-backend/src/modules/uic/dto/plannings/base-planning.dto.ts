  import {
    IsString,
    Allow,
    IsDate,
  } from 'class-validator';
  import {
    isNotEmptyValidationOptions,
    isStringValidationOptions,
  } from '@shared/validation';
import { ModalityEntity } from '@uic/entities';
  
  export class BasePlanningDto {
    @Allow()
    readonly nameModality: ModalityEntity;

    @IsString(isStringValidationOptions())
    readonly name: string;

    @IsString(isStringValidationOptions())  
    readonly description: string;

    @IsDate(isNotEmptyValidationOptions())
    readonly endDate: Date;
    //@IsDate(isDateValidationOptions)
    @IsDate(isNotEmptyValidationOptions())
    readonly startDate: Date;
  }
  