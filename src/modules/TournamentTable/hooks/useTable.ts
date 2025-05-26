import { useTournament } from "@hooks/useTournament";
import { useSchedule } from "@modules/TournamentMatches/hooks/useSchedule";
import { useMemo } from "react";

export const useTable = () => {
  const { schedule, currentRound } = useSchedule();
  const { stats } = useTournament();

  const standings = useMemo(() => {
    if (!schedule) return [];

    // Procesar los partidos jugados
    for (const round of schedule.rounds.slice(0, currentRound - 1)) {
      for (const match of round.matches) {
        const home = stats[match.home];
        const away = stats[match.away];

        const isPlayed = match.homePoints !== null && match.awayPoints !== null;
        if (!isPlayed) continue;

        home.battles++;
        away.battles++;

        home.pointsF += match.homePoints;
        home.pointsA += match.awayPoints;

        away.pointsF += match.awayPoints;
        away.pointsA += match.homePoints;

        if (match.homePoints > match.awayPoints) {
          home.wins++;
          away.losses++;
        } else if (match.homePoints < match.awayPoints) {
          away.wins++;
          home.losses++;
        } else {
          home.draws++;
          away.draws++;
        }
      }
    }

    // Calcular diferencia y ordenar
    const result = Object.values(stats).map((character, index) => ({
      id: Object.keys(stats)[index],
      ...character,
      diffP: character.pointsF - character.pointsA,
    }));

    result.sort((a, b) => {
      const pointsA = a.wins * 3 + a.draws;
      const pointsB = b.wins * 3 + b.draws;
      if (pointsB !== pointsA) return pointsB - pointsA;

      if (b.diffP !== a.diffP) return b.diffP - a.diffP;
      if (b.pointsF !== a.pointsF) return b.pointsF - a.pointsF;
      if (b.pointsA !== a.pointsA) return a.pointsA - b.pointsA;
      return b.wins - a.wins;
    });

    // Asignar posición
    result.forEach((character, index) => {
      character.position = index + 1;
    });

    return result;
  }, [schedule, currentRound, stats]);

  return { standings };
};
