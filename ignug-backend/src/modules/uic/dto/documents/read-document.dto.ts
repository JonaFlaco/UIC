import { Exclude, Expose } from 'class-transformer';
import { BaseDocumentDto } from '@uic/dto';

@Exclude()
export class ReadDocumentDto extends BaseDocumentDto {

  @Expose()
  readonly id;
  
  // @Expose()
  // readonly code;

  @Expose()
  readonly name;

  // @Expose()
  // readonly modality;

  // @Expose()
  // readonly planning;

  // @Expose()
  // readonly registeredAt;

}