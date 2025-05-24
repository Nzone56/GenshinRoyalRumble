import { CategoryField } from "./CategoryField";
import { useTournament } from "@hooks/useTournament";

export const CharacterCategoriesCard = ({ characterId }: { characterId: string }) => {
  const { characters, categories } = useTournament();

  const characterData = characters[characterId];
  const characterCategories = categories[characterId] || {};

  const placeholderCategories = [
    {
      id: "1",
      name: "Attack",
      weight: "0.5",
      native: true,
    },
    {
      id: "2",
      name: "Defense",
      weight: "0.3",
      native: true,
    },
    {
      id: "3",
      name: "Speed",
      weight: "0.2",
      native: true,
    },
    {
      id: "4",
      name: "Intelligence",
      weight: "0.1",
      native: false,
    },
    {
      id: "5",
      name: "Agility",
      weight: "0.4",
      native: false,
    },
    {
      id: "6",
      name: "Speed",
      weight: "0.2",
      native: true,
    },
    {
      id: "7",
      name: "Intelligence",
      weight: "0.1",
      native: false,
    },
    {
      id: "8",
      name: "Agility",
      weight: "0.4",
      native: false,
    },
  ];

  return (
    <div key={characterData.id} className="flex flex-col items-center bg-gray-800 rounded-xl p-4 shadow-md">
      <h3 className="text-lg font-bold">{characterData.name}</h3>
      <div className="flex flex-col ">
        {placeholderCategories.map((category) => (
          <CategoryField
            key={category.id}
            character={{ categories: characterCategories, id: characterData.id }}
            category={category}
          />
        ))}
      </div>
    </div>
  );
};
