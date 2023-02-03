import { PartialType } from '@nestjs/swagger';
import { BaseEventDto } from '@uic/dto';

export class UpdateEventDto extends PartialType(BaseEventDto) {}
