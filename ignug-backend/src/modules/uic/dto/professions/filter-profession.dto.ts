import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterProfessionDto extends PaginationDto {
    @IsOptional()
    @IsString()
    readonly career: string;

}