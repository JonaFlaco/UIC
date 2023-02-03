import { PartialType } from '@nestjs/swagger';
import { BaseCatalogueDto } from '@uic/dto';

export class UpdateCatalogueDto extends PartialType(BaseCatalogueDto) {}
