import { useState } from "react";
import { CharacterSelectedPreview } from "./CharacterSelectedPreview";
import { CharacterSelector } from "./CharacterSelector";

export const CharacterCarrousel = () => {
  const [nextAnimation, setNextAnimation] = useState(false);
  const [prevAnimation, setPrevAnimation] = useState(false);

  return (
    <div className="flex flex-col items-center m-4">
      <CharacterSelector setNextAnimation={setNextAnimation} setPrevAnimation={setPrevAnimation} />
      <CharacterSelectedPreview
        nextAnimation={nextAnimation}
        prevAnimation={prevAnimation}
        setNextAnimation={setNextAnimation}
        setPrevAnimation={setPrevAnimation}
      />
    </div>
  );
};
