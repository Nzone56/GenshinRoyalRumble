import type { EvaluationTypeOption } from "@mytypes/config";

export const evaluationTypes: EvaluationTypeOption[]  = [
  {
    key: "manual",
    name: "You Choose",
    description: "You manually select the winner in each match."
  },
  {
    key: "total",
    name: "Total Weighted Score",
    description: "The winner is determined by summing all attribute values multiplied by their category weights."
  },
  {
    key: "random",
    name: "Weighted Random Attributes",
    description: "In each match, 5 random attributes are selected — 2 of them favor the home contestant (if applicable). Each attribute's difference is multiplied by its category weight, and the winner is based on the final weighted score."
  }
];
