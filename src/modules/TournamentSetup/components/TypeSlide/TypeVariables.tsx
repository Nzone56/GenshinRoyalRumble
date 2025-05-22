export const TypesDescription = {
  League: {
    description:"Each team plays every other team twice following the website's custom and unique rules.",
    requiredPlayers: "Minimum 4 players, even numbers only (4, 6, 8, ...)",
  },
  RoundRobin: {
    description: "Each player faces every other player once. No eliminations.",
    requiredPlayers: "Minimum 4 players, even numbers only (4, 6, 8, ...)",
  },
  Elimination: {
    description: "Single-elimination bracket. One loss means you're out. Only one champion.",
    requiredPlayers: "Exactly 4, 8, 16, 32, ... players (powers of 2)",
  },
  GroupsElimination: {
    description: "Group stage followed by a knockout stage for the top performers.",
    requiredPlayers: "8, 16, 32, ... players (must be divisible into even groups)",
  },
  Swiss: {
    description: "All players play the same number of rounds against opponents with similar performance.",
    requiredPlayers: "Minimum 4 players, preferably an even number",
  },
  DoubleElimination: {
    description: "Players must lose twice to be eliminated. Includes winners and losers brackets.",
    requiredPlayers: "Exactly 4, 8, 16, 32, ... players (powers of 2)",
  },
  RegionalGroups: {
    description: "Players are divided into regional groups. Top players advance to finals.",
    requiredPlayers: "8, 16, 32, ... players (multiples of 4 or 8 for balanced groups)",
  },
};



