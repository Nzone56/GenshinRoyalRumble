import type { CharacterStats } from "./Tournament";

export type VisionType = "Anemo" | "Geo" | "Electro" | "Dendro" | "Hydro" | "Pyro" | "Cryo";
export type NationType = "Mondstadt" | "Liyue" | "Inazuma" | "Sumeru" | "Fontaine" | "Natlan" | "Snezhnaya";
export type WeaponType = "Sword" | "Claymore" | "Bow" | "Polearm" | "Catalyst";
export type GenderType = "Male" | "Female";
export type RarityType = 5 | 4;
export interface PreviewCharacter {
  id: string;
  name: string;
  gender: GenderType;
  vision: VisionType;
  nation: NationType;
  weapon: WeaponType;
  rarity: RarityType;
}

export interface Character extends PreviewCharacter {
  title: string;
  description: string;
  images: {
    card: string;
    icon: string;
    iconside: string;
    portrait: string;
  };
}

export interface TournamentCharacter {
  id: string;
  name: string;
  stats: CharacterStats;
  categories: {
    [key: string]: number;
  };
}
