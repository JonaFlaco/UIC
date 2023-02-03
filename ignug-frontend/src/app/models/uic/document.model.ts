import { CatalogueModel ,PlanningModel } from "@models/uic";

export interface DocumentModel {
  id: string;
  name: string;
  // names: CatalogueModel[];
  // plannings: PlanningModel[];
  // endDate: Date;
  // isEnable: boolean;
  // sort: number;
  // startDate: Date;
}

export interface CreateDocumentDto extends Omit<DocumentModel, 'id'> {
}

export interface UpdateDocumentDto extends Partial<Omit<DocumentModel, 'id'>> {
}

export interface ReadDocumentDto extends Partial<DocumentModel> {
}

export interface SelectDocumentDto extends Partial<DocumentModel> {
}
