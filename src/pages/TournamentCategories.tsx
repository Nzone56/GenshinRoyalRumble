import { LoadingLogo } from "@components/ui/LoadingLogo";
import { useTournament } from "@hooks/useTournament";
import { CharacterCategoriesCard } from "@modules/TournamentCategories/components/CharacterCategoriesCard";

export const TournamentCategories = () => {
  const { config, characters, categories } = useTournament();

  console.log(categories);
  if (Object.keys(characters).length === 0) return <LoadingLogo />;

  return (
    <div className="m-8">
      <span className="text-lg">
        Antes de empezar el torneo tienes que definir el valor de cada categoria para cada personaje{" "}
        <span className="text-amber-400"> este valor no podra ser cambiado una vez empiece el torneo</span>
      </span>
      <div className="flex flex-wrap items-center justify-around m-8 gap-4">
        {config.characters.map((characterId: string) => (
          <CharacterCategoriesCard key={characterId} characterId={characterId} />
        ))}
      </div>
    </div>
  );
};
