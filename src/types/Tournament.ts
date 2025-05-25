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
  round: number;
}

export interface Round {
  id: number;
  title?: string;
  matches: Match[];
  isKnockout?: boolean;
}

export interface Schedule {
  id: string;
  currentRound: number;
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
}
