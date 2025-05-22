import { useState } from "react";
import { useTournamentStoreForm } from "../hooks/useTournamentStoreForm";
import { NameSlide } from "../components/NameSlide";
import { TypeSlide } from "../components/TypeSlide";
import { CategoriesSlide } from "../components/CategoriesSlide";
import { CharactersSlide } from "../components/CharactersSlide";
import { SummarySlide } from "../components/SummarySlide";
import { EvaluationTypeSlide } from "../components/EvaluationTypeSlide.tsx";

export const useTournamentCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { name, type, evaluationType, charactersValidation, disabledAdd } = useTournamentStoreForm();


  const slides = [
    <NameSlide key="name" />,
    <TypeSlide key="type" />,
    <EvaluationTypeSlide key="evaluation" />,
    <CategoriesSlide key="categories" />,
    <CharactersSlide key="characters" />,
    <SummarySlide key="summary" />,
  ];

  const SECTIONS = slides.length;

  const NAME_SLIDE_INDEX = 0;
  const TYPE_SLIDE_INDEX = 1;
  const EVALUATION_SLIDE_INDEX = 2;
  const CATEGORIES_SLIDE_INDEX = 3;
  const CHARACTERS_SLIDE_INDEX = 4;

  const handleNext = () => {
    if (activeIndex < SECTIONS - 1) setActiveIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex((prev) => prev - 1);
  };

  const isNextDisabled =
    (activeIndex === NAME_SLIDE_INDEX && name === "") ||
    (activeIndex === TYPE_SLIDE_INDEX && type !== "League") ||
    (activeIndex === EVALUATION_SLIDE_INDEX && evaluationType !== "random") ||
    (activeIndex === CATEGORIES_SLIDE_INDEX && disabledAdd) ||
    (activeIndex === CHARACTERS_SLIDE_INDEX && !charactersValidation.isValid);

  return {
    activeIndex,
    handleNext,
    handlePrev,
    isNextDisabled,
    slides,
    isFirst: activeIndex === 0,
    isLast: activeIndex === SECTIONS - 1,
  };
};
