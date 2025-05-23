import LCHEVRON from "@assets/images/icons/left-chevron.svg?react";
import RCHEVRON from "@assets/images/icons/right-chevron.svg?react";
import { useCharacter } from "../hooks/useCharacter";

export const CharacterSelector = () => {
  const { currentCharacter, handleNextCharacter, handlePrevCharacter, loading } = useCharacter();

  return (
    <div className="flex items-center">
      <button className="cursor-pointer" onClick={handlePrevCharacter} disabled={loading}>
        <LCHEVRON className={`w-4 h-4  ${loading ? "fill-gray-700" : "fill-slate-300 hover:fill-amber-500"}`} />
      </button>
      <span className="w-[200px] px-4">{currentCharacter?.name}</span>
      <button className="cursor-pointer" onClick={handleNextCharacter} disabled={loading}>
        <RCHEVRON className={`w-4 h-4  ${loading ? "fill-gray-700" : "fill-slate-300 hover:fill-amber-500"}`} />
      </button>
    </div>
  );
};
