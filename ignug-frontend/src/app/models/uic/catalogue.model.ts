export interface CatalogueModel {
  id: string;
  name: string;
  code:string;
  description:string;
  state: boolean;
  type:string;
}

export interface CreateCatalogueDto extends Omit<CatalogueModel, 'id'> {
}

export interface UpdateCatalogueDto extends Partial<Omit<CatalogueModel, 'id'>> {
}

export interface SelectCatalogueDto extends Partial<CatalogueModel> {
}
