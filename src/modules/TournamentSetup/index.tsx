/// <reference types="vite-plugin-svgr/client" />
import LCHEVRON from "@assets/images/icons/left-chevron.svg?react";
import RCHEVRON from "@assets/images/icons/right-chevron.svg?react";
import { useState } from "react";
import { CategoriesSlide } from "./components/CategoriesSlide";
import { NameSlide } from "./components/NameSlide";
import { useTournamentStoreForm } from "./hooks/useTournamentStoreForm";
import { TypeSlide } from "./components/TypeSlide";
import { CharactersSlide } from "./components/CharactersSlide";
import { EvaluationTypeSlide } from "./components/EvaluationTypeSlide.tsx";
import { SummarySlide } from "./components/SummarySlide/index.tsx";

const slides = [
  <NameSlide key="name" />,
  <TypeSlide key="type" />,
  <EvaluationTypeSlide key="evaluation" />,
  <CategoriesSlide key="categories" />,
  <CharactersSlide key="characters" />,
  <SummarySlide key="summary" />,
];

const SECTIONS = slides.length;
const NAME_SLIDE_INDEX = slides.findIndex((slide) => slide.key === "name");
const TYPE_SLIDE_INDEX = slides.findIndex((slide) => slide.key === "type");
const EVALUATION_SLIDE_INDEX = slides.findIndex((slide) => slide.key === "evaluation");
const CATEGORIES_SLIDE_INDEX = slides.findIndex((slide) => slide.key === "categories");
const CHARACTERS_SLIDE_INDEX = slides.findIndex((slide) => slide.key === "characters");

export const TournamentSetup = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { name, type, evaluationType, charactersValidation, disabledAdd } = useTournamentStoreForm();

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
      {activeIndex !== 0 && (
        <button
          onClick={handlePrev}
          className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <LCHEVRON className="w-14 h-14 fill-slate-300" />
        </button>
      )}
      {/* RIGHT ARROW */}
      {activeIndex !== SECTIONS - 1 && (
        <button
          onClick={handleNext}
          disabled={
            (activeIndex === TYPE_SLIDE_INDEX && type !== "League") ||
            (activeIndex === NAME_SLIDE_INDEX && name === "") ||
            (activeIndex === EVALUATION_SLIDE_INDEX && evaluationType !== "random") ||
            (activeIndex === CATEGORIES_SLIDE_INDEX && disabledAdd) ||
            (activeIndex === CHARACTERS_SLIDE_INDEX && !charactersValidation.isValid)
          }
          className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <RCHEVRON className="w-14 h-14 fill-slate-300" />
        </button>
      )}
    </div>
  );
};
