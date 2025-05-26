import { useTournament } from "@hooks/useTournament";
import type { Match, Round, Schedule } from "@mytypes/Tournament";
import { useScheduleStore } from "@store/useScheduleStore";
import { useCallback, useEffect } from "react";

export const useSchedule = () => {
  const {
    schedule,
    setSchedule,
    currentRound,
    setCurrentRound,
    selectedRound,
    setSelectedRound,
    loading,
    setLoading,
    resetSchedule,
  } = useScheduleStore();
  const { config } = useTournament();

  const generateSchedule = useCallback(() => {
    const characterIds = config.characters;
    if (characterIds.length < 2) return;

    const half = Math.floor(characterIds.length / 2);
    const firstLeg: Round[] = [];

    const rotated = [...characterIds];

    for (let round = 0; round < rotated.length - 1; round++) {
      const matches: Match[] = [];

      for (let i = 0; i < half; i++) {
        const home = rotated[i];
        const away = rotated[rotated.length - 1 - i];

        matches.push({
          id: `${round + 1}-${i + 1}`,
          home,
          away,
          homePoints: 0,
          awayPoints: 0,
          round: round + 1,
          categoriesResults: [],
        });
      }

      firstLeg.push({ id: round + 1, matches });

      // rotate (keep first fixed)
      const rest = rotated.slice(1);
      rest.unshift(rest.pop()!);
      rotated.splice(1, rotated.length - 1, ...rest);
    }

    const secondLeg: Round[] = firstLeg.map((round, roundIndex) => {
      const newRoundId = firstLeg.length + roundIndex + 1;
      const matches = round.matches.map((match, i) => ({
        ...match,
        id: `${newRoundId}-${i + 1}`,
        round: newRoundId,
        home: match.away,
        away: match.home,
        homePoints: 0,
        awayPoints: 0,
      }));

      return {
        id: newRoundId,
        matches,
      };
    });

    const fullSchedule: Schedule = {
      id: `${config.name}-schedule`,
      rounds: [...firstLeg, ...secondLeg],
    };

    setSchedule(fullSchedule);
  }, [config.characters, config.name, setSchedule]);

  useEffect(() => {
    if (Object.keys(config.characters).length > 1 && (!schedule || schedule.rounds.length === 0)) {
      console.log("GEnerate Schedule");
      generateSchedule();
    }
  }, [config.characters, schedule, generateSchedule]);

  const updateRound = (updatedRound: Round) => {
    if (!schedule) return;
  
    const updatedRounds = schedule.rounds.map((round) =>
      round.id === updatedRound.id ? updatedRound : round
    );
  
    const updatedSchedule = { ...schedule, rounds: updatedRounds };
    console.log(updatedSchedule);
    setSchedule(updatedSchedule);
    setCurrentRound(currentRound + 1)
  };
  
  const markRoundAsCompleted = () => {
    if (!schedule) return;
    setCurrentRound(currentRound + 1);
  };

  return {
    schedule,
    currentRound,
    selectedRound,
    loading,
    setSchedule,
    setSelectedRound,
    setLoading,
    resetSchedule,
    // updateMatch,
    updateRound,
    markRoundAsCompleted,
  };
};
