import { Exclude, Expose } from 'class-transformer';
import { BaseCatalogueDto } from '@uic/dto';
@Exclude()
export class ReadCatalogueDto extends BaseCatalogueDto {
  
  @Expose()
  readonly id;
  
  @Expose()
  readonly name;

  @Expose()
  readonly description;

  @Expose()
  readonly state;

  @Expose()
  readonly code;

  @Expose()
  readonly type;
}
