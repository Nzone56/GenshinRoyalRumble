import { fetchCharacter } from "@helpers/fetchCharacters";
import { roundNumber } from "@helpers/functions";
import type { CharacterStats } from "@mytypes/Tournament";
import { useCharactersStore } from "@store/useCharactersStore";
import { useCharactersStatsStore } from "@store/useCharacterStatsStore";
import { useScheduleStore } from "@store/useScheduleStore";
import { useTournamentStore } from "@store/useTournamentStore";
import { useCallback, useEffect } from "react";

export const useTournament = () => {
  const {
    id,
    config,
    loading,
    started: tournamentStarted,
    setTournament,
    setLoading,
    setStarted,
  } = useTournamentStore();
  const { charactersData, setCharactersData, hasLoadedCharacters, setHasLoadedCharacters } = useCharactersStore();
  const { categories, stats, setStats, setCategoryValue, setCategories, setInitialStats, setInitialCategories } =
    useCharactersStatsStore();
  const { schedule, currentRound } = useScheduleStore();

  const getTournament = useCallback(() => {
    const storagedTournament = localStorage.getItem("Tournament");

    if (storagedTournament) {
      const parsed = JSON.parse(storagedTournament);
      const { id, ...rest } = parsed;
      setTournament(id, rest);
    }
  }, [setTournament]);

  const handleStartTournament = () => {
    localStorage.setItem("categories", JSON.stringify(categories));
    setStarted(!tournamentStarted);
  };

  const calculateStandings = () => {
    if (!schedule) return [];

    // Create a fresh copy of the stats object with zeroed values
    const newStats: Record<string, CharacterStats> = {};

    for (const id in stats) {
      newStats[id] = {
        position: 0,
        battles: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        pointsF: 0,
        pointsA: 0,
        diffP: 0,
        points: 0,
      };
    }

    // Process all matches up to the current round
    for (const round of schedule.rounds.slice(0, currentRound - 1)) {
      for (const match of round.matches) {
        const isPlayed = match.homePoints !== null && match.awayPoints !== null;
        if (!isPlayed) continue;

        const home = newStats[match.home];
        const away = newStats[match.away];

        // Update battles
        home.battles++;
        away.battles++;

        // Update points scored and received
        home.pointsF += match.homePoints!;
        home.pointsA += match.awayPoints!;

        away.pointsF += match.awayPoints!;
        away.pointsA += match.homePoints!;

        // Update results
        if (match.homePoints! > match.awayPoints!) {
          home.wins++;
          away.losses++;
        } else if (match.homePoints! < match.awayPoints!) {
          away.wins++;
          home.losses++;
        } else {
          home.draws++;
          away.draws++;
        }
      }
    }

    // Calculate diffP and points
    const resultStats = Object.entries(newStats).map(([id, data]) => {
      const points = data.wins * 3 + data.draws;
      const pointsF = roundNumber(data.pointsF);
      const pointsA = roundNumber(data.pointsA);
      const diffP = roundNumber(pointsF - pointsA);
      return {
        id,
        ...data,
        pointsF,
        pointsA,
        diffP,
        points,
      };
    });

    // Sort based on points, then diffP, then pointsF, then pointsA, then wins
    resultStats.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.diffP !== a.diffP) return b.diffP - a.diffP;
      if (b.pointsF !== a.pointsF) return b.pointsF - a.pointsF;
      if (b.pointsA !== a.pointsA) return a.pointsA - b.pointsA;
      return b.wins - a.wins;
    });

    // Assign positions based on sorted order
    resultStats.forEach((entry, index) => {
      newStats[entry.id].position = index + 1;
      newStats[entry.id].points = entry.points;
      newStats[entry.id].diffP = entry.diffP;
      newStats[entry.id].pointsF = entry.pointsF;
      newStats[entry.id].pointsA = entry.pointsA;
    });

    // Update the state with new standings
    setStats(newStats);
  };

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
        setInitialStats(characters);
        const storageedCategories = localStorage.getItem("categories");
        if (storageedCategories) {
          const parsedCategories = JSON.parse(storageedCategories);

          setCategories(parsedCategories);

          // const downloadJSON = (data, filename) => {
          //   const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
          //   const url = URL.createObjectURL(blob);
          //   const a = document.createElement("a");
          //   a.href = url;
          //   a.download = filename;
          //   a.click();
          //   URL.revokeObjectURL(url);
          // };

          // downloadJSON(parsedCategories, "categories.json");
        } else {
          setInitialCategories(
            characters,
            config.categories.map((cat) => cat.name),
          );
        }

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
    setInitialCategories,
    setInitialStats,
    setHasLoadedCharacters,
    setLoading,
    setCategories,
  ]);

  useEffect(() => {
    if (config.characters.length > 0) {
      // preloadCharacterImages(config.characters);
    }
  }, [config.characters]);

  return {
    id,
    loading,
    config,
    categories,
    stats,
    calculateStandings,
    tournamentStarted,
    setCategoryValue,
    tournamentName: config.name,
    characters: charactersData,
    handleStartTournament,
  };
};
