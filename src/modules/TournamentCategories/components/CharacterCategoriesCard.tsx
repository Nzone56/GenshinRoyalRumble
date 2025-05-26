import { CategoryField } from "./CategoryField";
import { useTournament } from "@hooks/useTournament";

export const CharacterCategoriesCard = ({ characterId }: { characterId: string }) => {
  const { config, characters, categories } = useTournament();

  const characterData = characters[characterId];
  const characterCategories = categories[characterId] || {};

  return (
    <div key={characterData.id} className="flex flex-col items-center bg-gray-800 rounded-xl p-4 shadow-md">
      <h3 className="text-xl">CATEGORIES</h3>
      <div className="flex flex-col mt-8">
        {config.categories.map((category) => (
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
