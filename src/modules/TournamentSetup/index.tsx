/// <reference types="vite-plugin-svgr/client" />
import LCHEVRON from "@assets/images/icons/left-chevron.svg?react";
import RCHEVRON from "@assets/images/icons/right-chevron.svg?react";
import { useTournamentCarousel } from "./hooks/useTournamentCarousel.tsx";

export const TournamentSetup = () => {
  const { activeIndex, handleNext, handlePrev, isNextDisabled, slides, isFirst, isLast } = useTournamentCarousel();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-950 text-white">
      {/* CARROUSEL */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${activeIndex * 100}vw)` }}
      >
        {slides.map((Slide, index) => (
          <div key={index} className="min-w-screen flex items-center justify-center p-6 px-16">
            {Slide}
          </div>
        ))}
      </div>

      {/* LEFT ARROW */}
      {!isFirst && (
        <button onClick={handlePrev} className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2">
          <LCHEVRON className="w-14 h-14 fill-slate-300" />
        </button>
      )}
      {/* RIGHT ARROW */}
      {!isLast && (
        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <RCHEVRON className="w-14 h-14 fill-slate-300" />
        </button>
      )}
    </div>
  );
};
