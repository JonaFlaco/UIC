import { IsString, IsOptional} from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterRequirementDto extends PaginationDto {

  @IsString()
  @IsOptional()
  readonly name: string;


}
