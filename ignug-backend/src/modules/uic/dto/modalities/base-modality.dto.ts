import { CatalogueEntity } from "@uic/entities";
import { isBooleanValidationOptions, isStringValidationOptions } from "@shared/validation";
import { Allow, IsString, IsOptional, IsBoolean, } from "class-validator";

export class BaseModalityDto {

    //  @Allow()
    //  readonly state : CatalogueEntity;
    
    @IsString(isStringValidationOptions())
    readonly description: string;

    @IsString(isStringValidationOptions())
    readonly name: string;

    @IsBoolean(isBooleanValidationOptions())
  readonly state: boolean;
}