import {
  CatalogueEntity,
  PlanningEntity,
  ProjectPlanEntity

  } from '@uic/entities';
  import {
    IsString,
    IsNotEmpty,
    Allow,
    IsDate,
  } from 'class-validator';
  import {
    isStringValidationOptions,
    isNotEmptyValidationOptions,
  } from '@shared/validation';
  
  export class BaseProjectPlanDto {
    
    @Allow()
    readonly planning: PlanningEntity;

    @Allow()
    readonly state: CatalogueEntity;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString( isStringValidationOptions() )
    readonly title: string;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString( isStringValidationOptions() )
    readonly description: string;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString( isStringValidationOptions() )
    readonly actCode: string; 

    @IsDate()
    readonly approvedAt: Date; 

    @IsDate()
    readonly assignedAt: Date;

    @IsDate()
    readonly tutorApprovedAt: Date;

    @IsString( isStringValidationOptions() )
    readonly observation: string;

}
  