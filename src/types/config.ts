import type { PreviewCharacter } from "./Character";

export type TournamentType =
  | "League" // Home and away league format, all characters play each other twice
  | "RoundRobin" // Single round-robin, each character plays each other once
  | "Elimination" // Knockout bracket, direct elimination
  | "GroupsElimination" // Group stage followed by knockout rounds (like Champions League/World Cup)
  | "Swiss" // Swiss system tournament format
  | "DoubleElimination" // Double elimination format
  | "RegionalGroups"; // Large regional group stage with different paths to next roundsase de grupos por regiones con pases diferenciados

export type EvaluationType = "manual" | "total" | "random";
export type EvaluationTypeOption = {
  key: EvaluationType;
  name: string;
  description: string;
};
export interface TournamentTypeOption {
  label: string;
  value: TournamentType;
  icon: string;
}
export interface TournamentConfig {
  name: string;
  type: TournamentType;
  evaluationType: EvaluationType;
  characters: string[];
  categories: CategoryType[];
}

export interface TournamentConfigManagement extends TournamentConfig {
  loading: boolean;
  charactersList: PreviewCharacter[];
}

export interface CategoryType {
  id: string;
  name: string;
  weight: string;
  native: boolean;
}
