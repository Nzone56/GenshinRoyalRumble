/// <reference types="vite-plugin-svgr/client" />
import CHECK from "@assets/images/icons/check.svg?react";
import { Card } from "./Card";

type CharacterCardProps = {
  group: { name: string; id: string };
  isSelected: boolean;
  handleAddGroupCard: (characterId: string) => void;
};

export const CharacterGroupCard = ({ group, isSelected, handleAddGroupCard }: CharacterCardProps) => {
  return (
    <Card isSelected={isSelected} onClick={() => handleAddGroupCard(group.id)} className="">
      <div className="absolute inset-0 bg-center bg-contain bg-no-repeat opacity-10" />
      {isSelected && <CHECK className="absolute -top-2 -left-2 w-4 h-4 fill-blue-500" />}
      <div className="relative z-10 flex justify-center items-center h-full">
        <span className="">{group.name}</span>
      </div>
    </Card>
  );
};
