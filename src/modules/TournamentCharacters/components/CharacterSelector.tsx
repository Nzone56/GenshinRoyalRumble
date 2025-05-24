import LCHEVRON from "@assets/images/icons/left-chevron.svg?react";
import RCHEVRON from "@assets/images/icons/right-chevron.svg?react";
import { useCharacter } from "../hooks/useCharacter";

type props = {
  setNextAnimation: (value: boolean) => void;
  setPrevAnimation: (value: boolean) => void;
};

export const CharacterSelector = ({ setNextAnimation, setPrevAnimation }: props) => {
  const { currentCharacter, loading, setLoading } = useCharacter();

  const nextSlide = () => {
    setLoading(true);
    setNextAnimation(true);
    setPrevAnimation(false);
  };

  const prevSlide = () => {
    setLoading(true);
    setPrevAnimation(true);
    setNextAnimation(false);
  };

  const iconsStyles = `w-6 h-6  ${loading ? "fill-gray-700" : "fill-slate-300 hover:fill-amber-500"}`;
  return (
    <div className="flex items-center">
      <button className="cursor-pointer" onClick={prevSlide} disabled={loading} aria-label="Previous Character">
        <LCHEVRON className={iconsStyles} />
      </button>
      <span className="text-xl w-[275px] px-4">{currentCharacter?.name}</span>
      <button className="cursor-pointer" onClick={nextSlide} disabled={loading} aria-label="Next Character">
        <RCHEVRON className={iconsStyles} />
      </button>
    </div>
  );
};
