import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterProjectDto extends PaginationDto {

  @IsString()
  @IsOptional()
  readonly title: string;
    
  
}