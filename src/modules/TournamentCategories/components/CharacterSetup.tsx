import { CharacterCategoriesCard } from "./CharacterCategoriesCard";

type CharacterSetupProps = {
  imgError: boolean;
  selectedCharacter: string;
};

export const CharacterSetup = ({ imgError, selectedCharacter }: CharacterSetupProps) => {
  return (
    <div className="flex items-stretch justify-center m-8 gap-4">
      <div className="w-[320px] h-[3/4]">
        {!imgError ? (
          <img
            src={`https://genshin.jmp.blue/characters/${selectedCharacter}/gacha-card`}
            alt="character"
            className="w-full h-full object-fill rounded-xl"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700 text-white rounded-xl shadow-2xl">
            Image not available
          </div>
        )}
      </div>
      <CharacterCategoriesCard key={selectedCharacter} characterId={selectedCharacter} />
    </div>
  );
};
