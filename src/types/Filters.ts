export interface FiltersType {
  gender: string;
  vision: string;
  nation: string;
  weapon: string;
  rarity: string;
}

export interface FiltersSelect {
  name: keyof FiltersType;
  variable: string[] | number[];
}
