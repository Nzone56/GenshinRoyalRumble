import { useCallback, useEffect, useState } from "react";
import type { PreviewCharacter } from "@mytypes/Character";
import { fetchCharacters } from "@helpers/fetchCharacters";
import type { CategoryType, TournamentConfig } from "@mytypes/config";
import { generateId } from "@helpers/generators";

const initialCategory = {
  name: "",
  weight: "",
  native: false,
};

export const useTournamentForm = () => {
  const [formConfig, setFormConfig] = useState<TournamentConfig>({
    name: "",
    type: "League",
    characters: [],
    categories: [],
  });

  const [characters, setCharacters] = useState<PreviewCharacter[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([{ id: generateId(), ...initialCategory }]);
  const [disabledAdd, setDisabledAdd] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  
  const [loading, setLoading] = useState(true);

  const handleChangeForm = useCallback(({ target: { name, value } }: { target: { name: string; value: string } }) => {
    setFormConfig((prev) => ({ ...prev, [name]: value.slice(0,20) }));
  }, []);

  const handleAddCharacter = useCallback((id: string) => {
    setFormConfig((prev) => {
      const isSelected = prev.characters.findIndex((item) => item === id) !== -1;
      if (isSelected) {
        return { ...prev, characters: prev.characters.filter((item) => item !== id) };
      } else {
        return { ...prev, characters: [...prev.characters, id] };
      }
    });
  }, []);

  const handleAddGroupCard = useCallback((id: string) => {
    if (id === "all") {
      if (formConfig.characters.length === characters.length) {
        return setFormConfig((prev) => ({ ...prev, characters: [] }));
      } else {
        setFormConfig((prev) => ({ ...prev, characters: characters.map((char) => char.id) }));
      }
    }
  }, [characters, formConfig.characters]);

  const handleChangeCategory = useCallback((event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const { name, type, value } = event.target;
    const newCategories = [...categories];

    if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;
      newCategories[index] = {...newCategories[index], [name]: checked, name: ""};
    } else if (type === "number" && name === "weight") {
      // Permitir borrar
      if (value === "") {
        newCategories[index] = {...newCategories[index], [name]: value};
      } else {
        let num = parseFloat(value);
        if (isNaN(num)) return;

        // Limit between 0 and 10
        if (num < 0) num = 0;
        if (num > 10) num = 10;

        // Round 0.1
        num = Math.round(num * 10) / 10;
        newCategories[index] = {...newCategories[index], [name]: String(num)};
      }
    } else {
      newCategories[index] = { ...newCategories[index], [name]: value};
    }

    setCategories(newCategories);
  }, [categories]);
  
  const handleAddCategory = useCallback(() => {
    const newCategories = [...categories];
    newCategories.push({ id: generateId(), ...initialCategory });

    setCategories(newCategories);
  }, [categories]);

  const handleStartTorunament = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formConfig);
  };

  // Get all the characters
  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const data = await fetchCharacters();
        setCharacters(data);
      } catch (err) {
        console.error("Error", err);
      } finally {
        setLoading(false);
      }
    };
    loadCharacters();
  }, []);

  // Watch if we can enable add Category, only when the previus are filled
  useEffect(() => {
    setDisabledAdd(
      !categories
        .map((category) => Object.values(category).every((value) => value !== ""))
        .every((category) => category),
    );
  }, [categories]);

  // Manage form submit button
  useEffect(() => {
    const hasAName = formConfig.name !== "" 
    const hasAtLeast4Chars = formConfig.characters.length >= 4
    const hasAtLeast1TCategory = formConfig.categories.length >= 1 && !disabledAdd

    if(hasAName && hasAtLeast1TCategory && hasAtLeast4Chars){
      setDisabledSubmit(false)
    } else {
      setDisabledSubmit(true)
    }
  }, [formConfig, disabledAdd]);
  
  return {
    formConfig,
    characters,
    categories,
    handleChangeForm,
    handleAddCharacter,
    handleAddGroupCard,
    handleAddCategory,
    handleChangeCategory,
    handleStartTorunament,
    disabledAdd,
    disabledSubmit,
    loading,
  };
};
