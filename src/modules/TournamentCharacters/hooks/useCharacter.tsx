import { useTournament } from "@hooks/useTournament";
import { useCharactersStore } from "@store/useCharactersStore";
import { useMemo } from "react";

export const useCharacter = () => {
  const { config } = useTournament();

  const { charactersData, selectedCharacterIndex, setSelectedCharacterIndex, loading, setLoading } =
    useCharactersStore();
  const currentCharacterId = config.characters[selectedCharacterIndex];

  const characterIds = config.characters;

  // Get the current character based on the selected index
  const currentCharacter = useMemo(() => {
    if (!characterIds.length) return undefined;
    return charactersData[characterIds[selectedCharacterIndex]];
  }, [charactersData, characterIds, selectedCharacterIndex]);

  // Get the previous character based on the selected index
  const prevCharacter = useMemo(() => {
    if (!characterIds.length) return undefined;
    let prevIndex = selectedCharacterIndex - 1;
    if (selectedCharacterIndex === 0) {
      prevIndex = characterIds.length - 1;
    }
    return charactersData[characterIds[prevIndex]];
  }, [charactersData, characterIds, selectedCharacterIndex]);

  // Get the next character based on the selected index
  const nextCharacter = useMemo(() => {
    if (!characterIds.length) return undefined;
    let nextIndex = selectedCharacterIndex + 1;
    if (selectedCharacterIndex === characterIds.length - 1) {
      nextIndex = 0;
    }
    return charactersData[characterIds[nextIndex]];
  }, [charactersData, characterIds, selectedCharacterIndex]);

  // Handles the event when the user clicks on the next character button
  const handleNextCharacter = () => {
    if (characterIds.length === 0) return;
    setSelectedCharacterIndex(selectedCharacterIndex === characterIds.length - 1 ? 0 : selectedCharacterIndex + 1);
    setLoading(false);
  };

  // Handles the event when the user clicks on the previous character button
  const handlePrevCharacter = () => {
    if (characterIds.length === 0) return;
    setSelectedCharacterIndex(selectedCharacterIndex === 0 ? characterIds.length - 1 : selectedCharacterIndex - 1);
    setLoading(false);
  };

  const setCharacterById = (id: string) => {
    setSelectedCharacterIndex(characterIds.findIndex((char: string) => char === id));
  };

  return {
    charactersData,
    loading,
    setLoading,
    selectedCharacterIndex,
    setCharacterById,
    currentCharacter,
    currentCharacterId,
    nextCharacter,
    prevCharacter,
    handleNextCharacter,
    handlePrevCharacter,
  };
};
