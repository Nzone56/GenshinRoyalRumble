import { useEffect, useRef } from "react";
import { useCharacter } from "../hooks/useCharacter";
import "./style.css";

type props = {
  nextAnimation: boolean;
  prevAnimation: boolean;
  setNextAnimation: (value: boolean) => void;
  setPrevAnimation: (value: boolean) => void;
};

export const CharacterSelectedPreview = ({
  nextAnimation,
  prevAnimation,
  setNextAnimation,
  setPrevAnimation,
}: props) => {
  const imgStyles = "absolute h-full w-full object-fill";
  const { currentCharacter, nextCharacter, prevCharacter, handleNextCharacter, handlePrevCharacter } = useCharacter();

  const incomingImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const node = incomingImgRef.current;
    if (!node) return;

    const handleAnimEnd = () => {
      if (nextAnimation) handleNextCharacter();
      if (prevAnimation) handlePrevCharacter();

      setPrevAnimation(false);
      setNextAnimation(false);
    };

    node.addEventListener("animationend", handleAnimEnd);
    return () => node.removeEventListener("animationend", handleAnimEnd);
    //eslint-disable-next-line
  }, [nextAnimation, prevAnimation]);

  return (
    <div className="relative mt-4 h-[640px] w-[340px] perspective">
      {/* Previous character */}
      {prevCharacter && (
        <img
          src={prevCharacter?.images.card}
          alt="Previous Character"
          className={`${prevAnimation ? "prev-to-curr-slide" : "hidden"} ${imgStyles}`}
          ref={prevAnimation ? incomingImgRef : null}
        />
      )}

      {/* Current character */}
      <img
        src={currentCharacter?.images.card}
        alt="Current Character"
        className={`${nextAnimation ? "next-slide" : ""} ${prevAnimation ? "prev-slide" : ""} ${imgStyles}`}
      />

      {/* Next character */}
      {nextCharacter && (
        <img
          src={nextCharacter?.images.card}
          alt="Next Character"
          className={`${nextAnimation ? "next-to-curr-slide" : "hidden"} ${imgStyles}`}
          ref={nextAnimation ? incomingImgRef : null}
        />
      )}
    </div>
  );
};
