import type { PreviewCharacter } from "@mytypes/Character";
import { getNationImages, getVisionImages, getWeaponImages } from "@helpers/getIcons";
import STAR from "@assets/images/icons/star-fill.svg";

type CharacterCardProps = {
  character: PreviewCharacter;
};

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const visionImages = getVisionImages();
  const weaponImages = getWeaponImages();
  const nationImages = getNationImages();

  const nationIcon = nationImages[character.nation.toLowerCase()] || nationImages["unknown"];

  return (
    <div className="relative bg-gray-700 flex-grow flex-shrink-0 basis-[200px] max-w-[250px] p-3 rounded cursor-pointer overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-contain bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${nationIcon})`, backgroundSize: "50% auto" }}
      />
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
    </div>
  );
};
