/// <reference types="vite-plugin-svgr/client" />
import LCHEVRON from "@assets/images/icons/left-chevron.svg?react";
import RCHEVRON from "@assets/images/icons/right-chevron.svg?react";
import { useState } from "react";
import { CategoriesSlide } from "./components/CategoriesSlide";

import { NameSlide } from "./components/NameSlide";
import { useTournamentStoreForm } from "./hooks/useTournamentStoreForm";
import { TypeSlide } from "./components/TypeSlide";
import { CharactersSlide } from "./components/CharactersSlide";

const SECTIONS = 4;
const slides = [
  <NameSlide key="name" />,
  <TypeSlide key="type" />,
  <CategoriesSlide key="categories" />,
  <CharactersSlide key="characters" />,
];

export const TournamentSetupV2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { handleStartTournament, disabledSubmit } = useTournamentStoreForm();

  const handleNext = () => {
    if (activeIndex < SECTIONS - 1) setActiveIndex(activeIndex + 1);
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

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
      <button
        onClick={handlePrev}
        disabled={activeIndex === 0}
        className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <LCHEVRON className="w-14 h-14 fill-slate-300" />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={handleNext}
        disabled={activeIndex === SECTIONS - 1}
        className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <RCHEVRON className="w-14 h-14 fill-slate-300" />
      </button>

      {/* SUBMIT BUTTON   */}
      {activeIndex === SECTIONS - 1 && (
        <div className="absolute bottom-10 w-full flex justify-center">
          <button
            type="button"
            disabled={disabledSubmit}
            onClick={handleStartTournament}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Create Tournament
          </button>
        </div>
      )}
    </div>
  );
};
