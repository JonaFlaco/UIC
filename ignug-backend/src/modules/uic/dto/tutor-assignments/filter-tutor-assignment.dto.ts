import { PaginationDto } from '@core/dto';
import { IsOptional, IsString } from 'class-validator';

export class FilterTutorAssignmentDto extends PaginationDto {

    @IsString()
    @IsOptional()
    readonly observation: string;
}
