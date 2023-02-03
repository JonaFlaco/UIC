import { PartialType } from '@nestjs/swagger';
import { BaseModalityDto } from '@uic/dto';

export class UpdateModalityDto extends PartialType(BaseModalityDto) {}
