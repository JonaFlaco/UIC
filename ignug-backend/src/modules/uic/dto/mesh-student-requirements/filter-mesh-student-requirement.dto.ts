import { IsString, IsOptional } from 'class-validator';
import { PaginationDto } from '@core/dto';

export class FilterMeshStudentRequirementDto extends PaginationDto {

    @IsString({ message: 'El campo observation debe ser un string' })
    @IsOptional()
    readonly observations: string;


    // @IsString({ message: 'El campo observation debe ser un string' })
    // @IsOptional()
    // readonly observation: string;

}