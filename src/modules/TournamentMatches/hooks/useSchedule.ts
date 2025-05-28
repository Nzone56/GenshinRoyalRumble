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

  const shuffle = <T>(array: T[]): T[] => {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  const generateScheduleBerger = useCallback(() => {
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

  const generateScheduleLeague = useCallback(() => {
    const characterIds = config.characters;
    if (characterIds.length < 2) return;
  
    const half = Math.floor(characterIds.length / 2);
    const rotated = shuffle(characterIds); 
    const firstLeg: Round[] = [];
  
    // Home/Away streak per team
    const streakMap = Object.fromEntries(characterIds.map(id => [id, { home: 0, away: 0 }]));
  
    for (let round = 0; round < rotated.length - 1; round++) {
      let matches: Match[] = [];
  
      for (let i = 0; i < half; i++) {
        let home = rotated[i];
        let away = rotated[rotated.length - 1 - i];
  
        // Check if are more than 2 hme/away consecutive matches
        const homeStreak = streakMap[home].home;
        const awayStreak = streakMap[away].away;
  
        //  If true, invert
        if (homeStreak >= 2 || awayStreak >= 2) {
          [home, away] = [away, home];
        }
  
        // Update streaks
        streakMap[home].home++;
        streakMap[home].away = 0;
        streakMap[away].away++;
        streakMap[away].home = 0;
  
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
      
      matches = shuffle(matches) // Shuffle the matches for the round

      firstLeg.push({ id: round + 1, matches });
  
      // Rotate the array execpt the first one 
      const rest = rotated.slice(1);
      rest.unshift(rest.pop()!);
      rotated.splice(1, rotated.length - 1, ...rest);
    }
  
    // Second round: shuffle the first round order
    const shuffledFirstLeg = [...firstLeg].sort(() => Math.random() - 0.5);
    const secondLeg: Round[] = shuffledFirstLeg.map((round, roundIndex) => {
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
      generateScheduleLeague();
    }
  }, [config.characters, schedule, generateScheduleLeague]);

  const updateRound = (updatedRound: Round) => {
    if (!schedule) return;

    const updatedRounds = schedule.rounds.map((round) => (round.id === updatedRound.id ? updatedRound : round));

    const updatedSchedule = { ...schedule, rounds: updatedRounds };
    setSchedule(updatedSchedule);
    setCurrentRound(currentRound + 1);
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
    generateScheduleBerger,
  };
};
