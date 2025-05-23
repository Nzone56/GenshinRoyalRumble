import { CharacterSelectedPreview } from "./CharacterSelectedPreview";
import { CharacterSelector } from "./CharacterSelector";

export const CharacterCarrousel = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[30%] my-4 mx-28">
      {/* <CharacterSelector /> */}
      <CharacterSelectedPreview />
    </div>
  );
};
