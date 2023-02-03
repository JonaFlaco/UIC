import { PartialType } from '@nestjs/swagger';
import { BaseDocumentDto } from '@uic/dto';

export class UpdateDocumentDto extends PartialType(BaseDocumentDto) {}

