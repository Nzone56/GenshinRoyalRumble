import { useTournament } from "@hooks/useTournament";
import { useCallback } from "react";


export const useTable = () => {
  const { stats } = useTournament();

  const getStandings = useCallback(() => {
    // Asignar posición
    return Object.entries(stats)
    .map(([id, data]) => ({
      id,
      ...data
    }))
    .sort((a, b) => a.position - b.position);
  }, [stats])
  
  return { getStandings };
};
