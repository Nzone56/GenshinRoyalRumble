import { useTournament } from "@hooks/useTournament";
import { useCharactersStore } from "@store/useCharactersStore";
import { useMemo } from "react";

export const useCharacter = () => {
  const { config } = useTournament();

  const { charactersData, selectedCharacterIndex, setSelectedCharacterIndex, loading, setLoading } = useCharactersStore();
  const currentCharacterId = config.characters[selectedCharacterIndex];
  
  const characterIds = config.characters;

  const currentCharacter = useMemo(() => {
    if (!characterIds.length) return undefined;
    return charactersData[characterIds[selectedCharacterIndex]];
  }, [charactersData, characterIds, selectedCharacterIndex]);

  const prevCharacter = useMemo(() => {
    if (!characterIds.length) return undefined;
    let prevIndex = selectedCharacterIndex - 1
    if(selectedCharacterIndex === 0){
      prevIndex = characterIds.length - 1
    }
    return charactersData[characterIds[prevIndex]];
  }, [charactersData, characterIds, selectedCharacterIndex]);

  const nextCharacter = useMemo(() => {
    if (!characterIds.length) return undefined;
    let nextIndex = selectedCharacterIndex + 1 
    if(selectedCharacterIndex === characterIds.length - 1){ 
      nextIndex = 0
    }
    return charactersData[characterIds[nextIndex]];
  }, [charactersData, characterIds, selectedCharacterIndex]);


  const handleNextCharacter = async () => {
    if (characterIds.length === 0) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSelectedCharacterIndex(
      selectedCharacterIndex === characterIds.length - 1
        ? 0
        : selectedCharacterIndex + 1
    );
    setLoading(false);
  };

  const handlePrevCharacter = async () => {
    if (characterIds.length === 0) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSelectedCharacterIndex(
      selectedCharacterIndex === 0
        ? characterIds.length - 1
        : selectedCharacterIndex - 1
    );
    setLoading(false);
  };

  return {
    loading,
    selectedCharacterIndex,
    currentCharacter,
    currentCharacterId,
    nextCharacter,
    prevCharacter,
    handleNextCharacter,
    handlePrevCharacter,
  };
};
