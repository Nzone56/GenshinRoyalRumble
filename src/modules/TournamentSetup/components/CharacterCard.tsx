/// <reference types="vite-plugin-svgr/client" />
import type { PreviewCharacter } from "@mytypes/Character";
import { getNationImages, getVisionImages, getWeaponImages } from "@helpers/getIcons";
import STAR from "@assets/images/icons/star-fill.svg";
import CHECK from "@assets/images/icons/check.svg?react";
import { Card } from "./Card";
import { memo } from "react";

type CharacterCardProps = {
  character: PreviewCharacter;
  isSelected: boolean;
  handleAddCharacter: (characterId: string) => void;
};

const visionImages = getVisionImages();
const weaponImages = getWeaponImages();
const nationImages = getNationImages();

export const CharacterCard = memo(({ character, isSelected, handleAddCharacter }: CharacterCardProps) => {

  const nationIcon = nationImages[character.nation.toLowerCase()] || nationImages["unknown"];
  return (
    <Card isSelected={isSelected} onClick={() => handleAddCharacter(character.id)}>
      <div
        className="absolute inset-0 bg-center bg-contain bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${nationIcon})`, backgroundSize: "50% auto" }}
      />
      {isSelected && <CHECK className="absolute -top-2 -left-2 w-4 h-4 fill-blue-500" />}
      <div className="relative z-10 flex justify-between">
        <div className="flex">
          <img src={visionImages[character.vision.toLowerCase()]} className="w-5" />
          <img src={weaponImages[character.weapon.toLowerCase()]} className="w-5" />
        </div>
        <div className="flex items-center justify-center space-x-1">
          <span className="inline-flex items-center text-sm leading-none">{character.rarity}</span>
          <img
            src={STAR}
            alt="star"
            className="w-4 h-4 inline-block align-middle"
            style={{ verticalAlign: "middle" }}
          />
        </div>
      </div>

      <span className="relative z-10">{character.name}</span>
    </Card>
  );
});
