import type { TournamentConfig } from "./Config";

export interface Tournament {
  id: string;
  config: TournamentConfig;
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
