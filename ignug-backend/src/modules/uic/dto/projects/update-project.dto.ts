import { PartialType } from '@nestjs/swagger';
import { BaseProjectDto } from '@uic/dto';

export class UpdateProjectDto extends PartialType(BaseProjectDto) {}
