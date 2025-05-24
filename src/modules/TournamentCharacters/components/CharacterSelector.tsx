import LCHEVRON from "@assets/images/icons/left-chevron.svg?react";
import RCHEVRON from "@assets/images/icons/right-chevron.svg?react";
import { useCharacter } from "../hooks/useCharacter";
import { useState } from "react";
import { FormSelect } from "@components/form/FormSelect";

type props = {
  setNextAnimation: (value: boolean) => void;
  setPrevAnimation: (value: boolean) => void;
};

export const CharacterSelector = ({ setNextAnimation, setPrevAnimation }: props) => {
  const { charactersData, currentCharacter, loading, setLoading, setCharacterById } = useCharacter();
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCharacterById(e.target.value);
    setIsEditing(false);
  };

  const iconsStyles = `w-6 h-6  ${loading ? "fill-gray-700" : "fill-slate-300 hover:fill-amber-500"}`;
  return (
    <div className="flex items-center">
      <button className="cursor-pointer" onClick={prevSlide} disabled={loading} aria-label="Previous Character">
        <LCHEVRON className={iconsStyles} />
      </button>
      <div className="flex items-center justify-center w-[275px] h-[38px] px-4 text-xl">
        {isEditing ? (
          <FormSelect
            autoFocus
            value={currentCharacter?.id}
            onChange={handleSelectChange}
            onBlur={() => setIsEditing(false)}
            width="w-full"
            padding="py-1 px-2.5"
          >
            {Object.keys(charactersData).map((key) => (
              <option key={charactersData[key].id} value={charactersData[key].id}>
                {charactersData[key].name}
              </option>
            ))}
          </FormSelect>
        ) : (
          <span onClick={() => setIsEditing(true)} className="cursor-pointer">
            {currentCharacter?.name}
          </span>
        )}
      </div>
      <button className="cursor-pointer" onClick={nextSlide} disabled={loading} aria-label="Next Character">
        <RCHEVRON className={iconsStyles} />
      </button>
    </div>
  );
};
