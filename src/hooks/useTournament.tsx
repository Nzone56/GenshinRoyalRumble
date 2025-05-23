import { fetchCharacter, preloadCharacterImages } from "@helpers/fetchCharacters";
import { useCharactersStore } from "@store/useCharactersStore";
import { useTournamentStore } from "@store/useTournamentStore";
import { useCallback, useEffect } from "react";

export const useTournament = () => {
  const { id, config, loading, setTournament, setLoading } = useTournamentStore();
  const { charactersData, setCharactersData } = useCharactersStore();

  const getTournament = useCallback(() => {
    const storagedTournament = localStorage.getItem("Tournament");
    if (storagedTournament) {
      const parsed = JSON.parse(storagedTournament);
      const { id, ...rest } = parsed;
      setTournament(id, rest);
    }
  }, [setTournament]);
  
  // Get Tournament
  useEffect(() => {
    if (!id) {
      setLoading(true);
      getTournament();
    }
  }, [id, getTournament, setLoading]);

  // Fetch Characters
  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        const characters = await Promise.all(
          config.characters.map((id) => fetchCharacter(id))
        );
        setCharactersData(characters);
      } catch (error) {
        console.error("Error loading characters", error);
      } finally {
        setLoading(false);
      }
    };
    if(Object.keys(charactersData).length === 0){
      loadCharacters();
    }
  }, [config.characters, charactersData, setCharactersData, setLoading]);


  useEffect(() => {
    if (config.characters.length > 0) {
      preloadCharacterImages(config.characters);
    }
  }, [config.characters]);

  return {
    id,
    loading,
    config,
    tournamentName: config.name,
    characters: charactersData
  };
};
