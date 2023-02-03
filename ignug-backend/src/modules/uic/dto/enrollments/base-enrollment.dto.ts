import {
  CatalogueEntity,
  ModalityEntity,
  PlanningEntity,

  } from '@uic/entities';
  import {
    IsString,
    Allow,
    IsNotEmpty,
  } from 'class-validator';
  import {
    isNotEmptyValidationOptions,
    isStringValidationOptions,

  } from '@shared/validation';
  
  export class BaseEnrollmentDto {
    @Allow()
    readonly modality : ModalityEntity;

    @Allow()
    readonly planning : PlanningEntity;
    
    @Allow()
    readonly stateId : CatalogueEntity;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString( isStringValidationOptions() )
    readonly code: string; 

    @IsString( isStringValidationOptions() )
    readonly observation: string;

    // @IsNotEmpty(isNotEmptyValidationOptions())
    // @IsDate()
    // readonly registeredAt: Date;

}
  