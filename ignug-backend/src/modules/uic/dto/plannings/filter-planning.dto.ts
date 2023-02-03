import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterPlanningDto extends PaginationDto {
  @IsString({ message: 'El campo observation debe ser un string' })
    @IsOptional()
    readonly description: string;
}
