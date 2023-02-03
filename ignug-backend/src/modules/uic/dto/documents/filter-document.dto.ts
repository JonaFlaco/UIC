import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterDocumentDto extends PaginationDto {
    @IsOptional()
    @IsString()
    readonly name: string;

}