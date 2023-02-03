 import {
    IsString,
    IsBoolean,
    Allow,
    IsNotEmpty,
  } from 'class-validator';
  import {
    isStringValidationOptions,
    isBooleanValidationOptions,
    isNotEmptyValidationOptions,
  } from '@shared/validation';
import { RequirementEntity } from '@uic/entities';
  
  export class BaseMeshStudentRequirementDto {
    
    @IsBoolean( isBooleanValidationOptions() )
    readonly approved: boolean;

    @IsString( isStringValidationOptions() )
    readonly observations: string;

    @Allow()
    readonly requirement: RequirementEntity;

}
  