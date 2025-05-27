import type { TournamentConfig } from "./config";

export interface Tournament {
  id: string;
  config: TournamentConfig;
  started: boolean;
  round: number;
  loading: boolean;
}

export interface CategoryComparison {
  category: string;
  homeRaw: number;
  awayRaw: number;
  weight: number;
  homeWeighted: number;
  awayWeighted: number;
  difference: number;
}

export interface Match {
  id: string;
  home: string;
  away: string;
  homePoints: number;
  awayPoints: number;
  round: number;
  categoriesResults: CategoryComparison[]
}

export interface Round {
  id: number;
  title?: string;
  matches: Match[];
  isKnockout?: boolean;
}

export interface Schedule {
  id: string;
  rounds: Round[];
}
export interface CharacterStats {
  position: number;
  battles: number;
  wins: number;
  draws: number;
  pointsF: number;
  pointsA: number;
  diffP: number;
  losses: number;
  points: number;
  prevPosition: number | null;
}

export interface CharacterTable extends CharacterStats {
  id: string;
  name: string;
  nation: string;
  icon: string;
  weapon: string;
  vision: string;
  position: number;
  rarity: number;
}
