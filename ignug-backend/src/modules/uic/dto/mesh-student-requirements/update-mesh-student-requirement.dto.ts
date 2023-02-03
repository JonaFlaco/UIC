import { PartialType } from '@nestjs/swagger';
import { BaseMeshStudentRequirementDto } from '@uic/dto';

export class UpdateMeshStudentRequirementDto extends PartialType(BaseMeshStudentRequirementDto) {}

