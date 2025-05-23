import type { TournamentConfig } from "./Config";

export interface Tournament {
  id: string,
  config: TournamentConfig
  loading: boolean;
}