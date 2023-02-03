import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterEnrollmentDto extends PaginationDto {
    @IsOptional()
    @IsString()
    readonly code: string;

}