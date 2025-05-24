import { useTournament } from "@hooks/useTournament";
import { useEffect, useState } from "react";

export const useTournamentCategories = () => {
  const { config } = useTournament();

  const [imgError, setImgError] = useState(false);
  const [selectedCharacter, setselectedCharacter] = useState(config.characters[0]);
  const [loading, setLoading] = useState(true);

  const handleSelectCharacter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    setselectedCharacter(e.target.value);
    setImgError(false);
  };

  // If we got imgError we stop the loading state
  useEffect(() => {
    if (imgError) {
      setLoading(false);
    }
  }, [imgError]);

  return {
    imgError,
    setImgError,
    loading,
    setLoading,
    selectedCharacter,
    handleSelectCharacter,
  };
};
