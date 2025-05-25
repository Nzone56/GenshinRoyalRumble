import { fetchCharacter, preloadCharacterImages } from "@helpers/fetchCharacters";
import { useCharactersStore } from "@store/useCharactersStore";
import { useCharactersStatsStore } from "@store/useCharacterStatsStore";
import { useTournamentStore } from "@store/useTournamentStore";
import { useCallback, useEffect } from "react";

export const useTournament = () => {
  const { id, config, loading, started: tournamentStarted, setTournament, setLoading } = useTournamentStore();
  const { charactersData, setCharactersData, hasLoadedCharacters, setHasLoadedCharacters } = useCharactersStore();
  const { categories, setCategoryValue, setInitialCharacterStatsData } = useCharactersStatsStore();

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
    if (hasLoadedCharacters || !config.characters?.length || Object.keys(charactersData).length > 0) {
      return;
    }

    let cancelled = false;

    const loadCharacters = async () => {
      try {
        setLoading(true);
        const characters = await Promise.all(config.characters.map((id) => fetchCharacter(id)));

        if (cancelled) return;

        setCharactersData(characters);
        setInitialCharacterStatsData(
          characters,
          config.categories.map((cat) => cat.name),
        );

        setHasLoadedCharacters(true);
      } catch (error) {
        console.error("Error loading characters", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadCharacters();

    return () => {
      cancelled = true;
    };
  }, [
    config.characters,
    config.categories,
    hasLoadedCharacters,
    charactersData,
    setCharactersData,
    setInitialCharacterStatsData,
    setHasLoadedCharacters,
    setLoading,
  ]);

  useEffect(() => {
    if (config.characters.length > 0) {
      preloadCharacterImages(config.characters);
    }
  }, [config.characters]);

  return {
    id,
    loading,
    config,
    categories,
    tournamentStarted,
    setCategoryValue,
    tournamentName: config.name,
    characters: charactersData,
  };
};
