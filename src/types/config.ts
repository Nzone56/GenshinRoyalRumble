type TournamentType = "League" | "RoundRobin" | "Elimination" | "GroupsElimination" | "Sides";
export interface TournamentConfig {
  name: string;
  type: TournamentType;
  characters: string[];
  categories: string[];
}
