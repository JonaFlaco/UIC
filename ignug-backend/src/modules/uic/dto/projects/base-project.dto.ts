  import {
    IsString,
    Allow,
    IsBoolean,
    IsNumber,
    IsNotEmpty,
    Max,
    max,
    IsInt,
    Min,
  } from 'class-validator';
  import {isNotEmptyValidationOptions, isStringValidationOptions, isBooleanValidationOptions, isNumberValidationOptions} from '@shared/validation';
import { EnrollmentEntity, ProjectPlanEntity } from '@uic/entities';
  
  export class BaseProjectDto {

    @Allow()
    readonly enrollment: EnrollmentEntity;

    @Allow()
    readonly projectPlan: ProjectPlanEntity;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString(isStringValidationOptions())
    readonly title: string;
    
   
    @IsBoolean(isBooleanValidationOptions())
    readonly approved: boolean;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString(isStringValidationOptions())
    readonly description: string;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsNumber({}, isNumberValidationOptions())
    @IsInt()
    @Min(0)
    @Max(100)
    readonly score: number;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString(isStringValidationOptions())
    readonly observation: string;
  }
  