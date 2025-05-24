import { FormInput } from "@components/form/FormInput";
import { useTournament } from "@hooks/useTournament";

type CategoryFieldProps = {
  character: {
    id: string;
    categories: Record<string, number>;
  };
  category: {
    id: string;
    name: string;
    weight: string;
    native: boolean;
  };
};
export const CategoryField = ({ character, category }: CategoryFieldProps) => {
  const { setCategoryValue } = useTournament();

  return (
    <div className="flex items-center justify-between p-2">
      <span className="text-sm">
        {category.name} <span className="text-amber-400">({category.weight})</span>
      </span>
      <FormInput
        id={`tournament_category_${category.name}_${character.id}`}
        name={`category_${category.id}`}
        type="number"
        min="0"
        max="10"
        step="0.1"
        sizeClass="w-[70px] "
        className="ml-2 px-2 py-1"
        disabled={false}
        value={character.categories[category.name] || 0}
        onChange={(e) => {
          let num = parseFloat(e.target.value);
          console.log(num);
          if (isNaN(num)) return;
          if (num < 0) num = 0;
          if (num > 10) num = 10;
          num = Math.round(num * 10) / 10;
          setCategoryValue(character.id, category.name, num);
        }}
      />
    </div>
  );
};
