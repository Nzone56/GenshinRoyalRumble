import { useTournament } from "@hooks/useTournament";
import { useSchedule } from "@modules/TournamentMatches/hooks/useSchedule";
import type { Match } from "@mytypes/Tournament";
import { useCharactersStore } from "@store/useCharactersStore";
import { useCharactersStatsStore } from "@store/useCharacterStatsStore";
import { useMemo, useState } from "react";

export const useCharacter = () => {
  const { config } = useTournament();

  const { charactersData, selectedCharacterIndex, setSelectedCharacterIndex, loading, setLoading } =
    useCharactersStore();
  const { stats } = useCharactersStatsStore();
  const { schedule, currentRound } = useSchedule();

  const currentCharacterId = config.characters[selectedCharacterIndex];

  const [cardNotAvailable, setCardNotAvailable] = useState(false);
  const characterIds = config.characters;

  // Get the current character based on the selected index
  const currentCharacter = useMemo(() => {
    if (!characterIds.length) return null;
    return charactersData[characterIds[selectedCharacterIndex]];
  }, [charactersData, characterIds, selectedCharacterIndex]);

  // Get the previous character based on the selected index
  const prevCharacter = useMemo(() => {
    if (!characterIds.length) return null;
    let prevIndex = selectedCharacterIndex - 1;
    if (selectedCharacterIndex === 0) {
      prevIndex = characterIds.length - 1;
    }
    return charactersData[characterIds[prevIndex]];
  }, [charactersData, characterIds, selectedCharacterIndex]);

  // Get the next character based on the selected index
  const nextCharacter = useMemo(() => {
    if (!characterIds.length) return null;
    let nextIndex = selectedCharacterIndex + 1;
    if (selectedCharacterIndex === characterIds.length - 1) {
      nextIndex = 0;
    }
    return charactersData[characterIds[nextIndex]];
  }, [charactersData, characterIds, selectedCharacterIndex]);

  // Handles the event when the user clicks on the next character button
  const handleNextCharacter = () => {
    if (characterIds.length === 0) return;
    setCardNotAvailable(false);
    setSelectedCharacterIndex(selectedCharacterIndex === characterIds.length - 1 ? 0 : selectedCharacterIndex + 1);
    setLoading(false);
  };

  // Handles the event when the user clicks on the previous character button
  const handlePrevCharacter = () => {
    if (characterIds.length === 0) return;
    setCardNotAvailable(false);
    setSelectedCharacterIndex(selectedCharacterIndex === 0 ? characterIds.length - 1 : selectedCharacterIndex - 1);
    setLoading(false);
  };

  
  const getAllMatches = () => {
    if(!schedule) return []
    const allMatches = schedule?.rounds
      .flatMap((r) => r.matches)
      .filter((match: Match) => match?.home === currentCharacter?.id || match?.away === currentCharacter?.id);
    
      return allMatches
  }

  const getLastMatches = () => {
    const playedRounds = schedule?.rounds.filter((r) => r.id < currentRound);
    if (!playedRounds) return [];
    const allMatches = playedRounds
      .flatMap((r) => r.matches)
      .filter((match: Match) => match?.home === currentCharacter?.id || match?.away === currentCharacter?.id);

    return allMatches.slice(-3);
  };

  const getNextMatches = () => {
    const upcomingRounds = schedule?.rounds.filter((r) => r.id >= currentRound);
    if (!upcomingRounds) return [];
    const allMatches = upcomingRounds
      .flatMap((r) => r.matches)
      .filter((match: Match) => match?.home === currentCharacter?.id || match?.away === currentCharacter?.id);

    return allMatches.slice(0, 3);
  };

  return {
    charactersStats: stats,
    cardNotAvailable,
    setCardNotAvailable,
    characterIds,
    charactersData,
    loading,
    setLoading,
    selectedCharacterIndex,
    currentCharacter,
    currentCharacterId,
    nextCharacter,
    prevCharacter,
    handleNextCharacter,
    handlePrevCharacter,
    setSelectedCharacterIndex,
    getLastMatches,
    getNextMatches,
    getAllMatches,
  };
};
