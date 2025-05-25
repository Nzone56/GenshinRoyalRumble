import type { TournamentConfig } from "./Config";

export interface Tournament {
  id: string;
  config: TournamentConfig;
  started: boolean;
  round: number;
  loading: boolean;
}

export interface Match {
  id: string;
  home: string;
  away: string;
  homePoints: number;
  awayPoints: number;
  mathcweek: number;
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
}
