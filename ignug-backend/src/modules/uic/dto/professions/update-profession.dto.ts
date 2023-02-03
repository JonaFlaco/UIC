import { PartialType } from '@nestjs/swagger';
import { BaseProfessionDto } from '@uic/dto';

export class UpdateProfessionDto extends PartialType(BaseProfessionDto) {}

