import { useState } from "react";
import { useCharacter } from "../hooks/useCharacter";
import LCHEVRON from "@assets/images/icons/left-chevron.svg?react";
import RCHEVRON from "@assets/images/icons/right-chevron.svg?react";
import './style.css'

export const CharacterSelectedPreview = () => {
  const imgStyles = "absolute h-full w-full object-cover transition-opacity duration-500";
  const { currentCharacter, nextCharacter, prevCharacter, loading } = useCharacter();

  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  
  const nextSlide = () => {
    setNext(true)
    setPrev(false)
  };

  const prevSlide = () => {
    setPrev(true)
    setNext(false)
  };

  const reset = () => {
    setPrev(false)
    setNext(false)
  }

  return (
    <>
      <div className="flex items-center">
        <button className="cursor-pointer" onClick={prevSlide} disabled={loading}>
          <LCHEVRON className={`w-4 h-4  ${loading ? "fill-gray-700" : "fill-slate-300 hover:fill-amber-500"}`} />
        </button>
        <span className="w-[200px] px-4" onClick={reset}>{currentCharacter?.name}</span>
        <button className="cursor-pointer" onClick={nextSlide} disabled={loading}>
          <RCHEVRON className={`w-4 h-4  ${loading ? "fill-gray-700" : "fill-slate-300 hover:fill-amber-500"}`} />
        </button>
      </div>
      <div className="relative mt-4 h-[400px] w-[300px] perspective">
        <div className="relative h-full w-full transition-all duration-700 ease-in-out">
          {/* Previous character */}
          {prevCharacter && (
            <img
              src={prevCharacter?.images.card}
              alt="Previous Character"
              className={`${next ? "prev-to-next-slide" : ""} ${prev ? "" : ""} absolute h-full w-full object-cover z-10 transition-all duration-700 ease-in-out`}
            />
          )}

          {/* Current character */}
          <img
            src={currentCharacter?.images.card}
            alt="Current Character"
            className={`${next ? "next-slide" : ""} ${prev ? "prev-slide" : ""} absolute h-full w-full object-cover z-10 transition-all duration-700 ease-in-out`}
          />

          {/* Next character */}
          {nextCharacter && (
            <img
              src={nextCharacter?.images.card}
              alt="Next Character"
              className="absolute h-full w-full object-cover opacity-40 transform translate-x-[60%] rotate-y-[30deg] scale-90 transition-all duration-700 ease-in-out"
            />
          )}
        </div>
      </div>
    </>
  );
};
