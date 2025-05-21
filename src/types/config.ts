type TournamentType = "League" | "RoundRobin" | "Elimination" | "GroupsElimination" | "Sides";
export interface TournamentConfig {
  name: string;
  type: TournamentType;
  characters: string[];
  categories: CategoryType[];
}

export interface CategoryType {
  id: string;
  name: string;
  weight: string;
  native: boolean;
}