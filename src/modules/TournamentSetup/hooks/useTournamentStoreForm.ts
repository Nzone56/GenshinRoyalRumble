import { fetchCharacters } from "@helpers/fetchCharacters";
import { generateId } from "@helpers/generators";
import type { EvaluationType, TournamentType } from "@mytypes/config";
import { useConfigStore } from "@store/useConfigStore";
import { useCallback, useEffect, useState } from "react";
import { charactersValidationRules } from "../variables/SetupVariables";
import { useNavigate } from "react-router";

const initialCategory = {
  name: "",
  weight: "",
  native: false,
};

export const useTournamentStoreForm = () => {
  const {
    name,
    type,
    characters,
    categories,
    reset,
    loading,
    charactersList,
    evaluationType,
    setName,
    setType,
    setCharacters,
    setCategories,
    setLoading,
    setCharactersList,
    setEvaluationType,
  } = useConfigStore();

  const [disabledAdd, setDisabledAdd] = useState(false);
  const [charactersValidation, setCharactersValidation] = useState<{ isValid: boolean; message: string }>({
    isValid: true,
    message: "",
  });
  const navigate = useNavigate();

  // Change the form for name
  const handleChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.slice(0, 20);
      setName(value);
    },
    [setName],
  );

  // Change the form for type
  const handleChangeType = useCallback(
    (selecterType: TournamentType) => {
      setType(selecterType);
    },
    [setType],
  );

  // Change the form for Characters
  const handleAddCharacter = useCallback(
    (id: string) => {
      const isSelected = characters.includes(id);
      if (isSelected) {
        setCharacters(characters.filter((item: string) => item !== id));
      } else {
        setCharacters([...characters, id]);
      }
    },
    [characters, setCharacters],
  );

  // Change the form for Categories
  const handleChangeCategory = useCallback(
    (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, index: number) => {
      const { name, type, value } = event.target;
      const newCategories = [...categories];

      if (type === "checkbox") {
        const checked = (event.target as HTMLInputElement).checked;
        newCategories[index] = {
          ...newCategories[index],
          [name]: checked,
          name: "", // reset name on checkbox toggle
        };
      } else if (type === "number" && name === "weight") {
        if (value === "") {
          newCategories[index] = { ...newCategories[index], [name]: value };
        } else {
          let num = parseFloat(value);
          if (isNaN(num)) return;
          if (num < 0) num = 0;
          if (num > 10) num = 10;
          num = Math.round(num * 10) / 10;
          newCategories[index] = { ...newCategories[index], [name]: String(num) };
        }
      } else {
        newCategories[index] = { ...newCategories[index], [name]: value };
      }

      setCategories(newCategories);
    },
    [categories, setCategories],
  );

  // Change the form for Evaluation Type
  const handleChangeEvaluation = useCallback(
    (type: EvaluationType) => {
      setEvaluationType(type);
    },
    [setEvaluationType],
  );

  /* Function that adds multiple characters from the same group
  If the group is "all" it will add all characters */
  const handleAddGroupCard = useCallback(
    (id: string) => {
      if (id === "all") {
        if (characters.length === charactersList.length) {
          setCharacters([]);
        } else {
          setCharacters(charactersList.map((char) => char.id));
        }
      }
    },
    [characters, charactersList, setCharacters],
  );

  // Function that adds a new category
  const handleAddCategory = useCallback(() => {
    const newCategories = [...categories, { id: generateId(), ...initialCategory }];
    setCategories(newCategories);
  }, [categories, setCategories]);

  const handleDeleteCategory = useCallback(
    (index: number) => {
      const updated = [...categories];
      updated.splice(index, 1);
      setCategories(updated);
    },
    [categories, setCategories],
  );

  // Finish setup and start the tournament
  const handleStartTournament = () => {
    localStorage.setItem(
      "Tournament",
      JSON.stringify({ id: generateId(), name, type, characters, categories, evaluationType }),
    );
    navigate("/tournament/home");
  };

  // Fetch Characters
  useEffect(() => {
    const loadCharacters = async () => {
      if (charactersList.length > 0) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchCharacters();
        setCharactersList(data);
      } catch (err) {
        console.error("Error loading characters", err);
      } finally {
        setLoading(false);
      }
    };
    loadCharacters();
    //eslint-disable-next-line
  }, []);

  // Watch if we can enable "Add Category"
  useEffect(() => {
    const canAdd = categories.every((category) => Object.values(category).every((value) => value !== ""));
    setDisabledAdd(!canAdd);
  }, [categories]);

  // Validate if we have enough characters depending of the selected tournament type
  useEffect(() => {
    const validator = charactersValidationRules[type];
    if (!validator) {
      setCharactersValidation({ isValid: false, message: "Unknown tournament type." });
      return;
    }

    const result = validator(characters.length);
    setCharactersValidation(result);
  }, [characters, type]);

  return {
    name,
    type,
    characters,
    categories,
    charactersList,
    loading,
    evaluationType,
    handleChangeName,
    handleChangeType,
    handleChangeEvaluation,
    handleAddCharacter,
    handleAddGroupCard,
    handleAddCategory,
    handleDeleteCategory,
    handleChangeCategory,
    handleStartTournament,
    disabledAdd,
    charactersValidation,
    reset,
  };
};
