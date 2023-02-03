import {
  RequirementEntity,
  RequirementRequestEntity
} from '@uic/entities';
import {
  IsString,
  IsBoolean,
  IsDate,
  Allow,
} from 'class-validator';
import {
  isStringValidationOptions,
  isBooleanValidationOptions,
} from '@shared/validation';

export class BaseRequirementRequestDto {

  @IsBoolean(isBooleanValidationOptions())
  readonly approved: boolean;

  @IsString(isStringValidationOptions())
  readonly observations: string;

  // @IsDate()
  //   readonly registered_at: Date;

    @Allow()
    readonly name: RequirementEntity;
}
