import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterProjectPlanDto extends PaginationDto {
    @IsString()
    @IsOptional()
    readonly title: string;

}