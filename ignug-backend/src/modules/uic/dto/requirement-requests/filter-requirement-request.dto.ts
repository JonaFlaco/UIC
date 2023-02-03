import { PaginationDto } from "@core/dto";
import { isStringValidationOptions } from "@shared/validation";
import { IsOptional, IsString } from "class-validator";

export class FilterRequirementRequestDto extends PaginationDto {
    
    @IsOptional()
    @IsString(isStringValidationOptions())
    readonly observation: string;
    
}