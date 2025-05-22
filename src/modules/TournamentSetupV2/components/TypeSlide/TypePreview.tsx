import FORBIDDEN from "@assets/images/icons/forbidden.svg?react";
import { TypesDescription } from "./TypeVariables";

type TypePreviewProps = {
  selectedType: string;
};

export const TypePreview = ({ selectedType }: TypePreviewProps) => {


  return (
    <div className="flex flex-col mt-20 px-8">
        <div className={`${selectedType !== "League" ? "visible" : "invisible"} flex items-center justify-center text-red-500 mb-4 `}>
          <FORBIDDEN className="w-8 h-8 fill-red-500 mr-2" /> Yet not available
        </div>
      <span>{TypesDescription[selectedType as keyof typeof TypesDescription].description}</span>
      <span className="text-amber-400">
        {TypesDescription[selectedType as keyof typeof TypesDescription].requiredPlayers}
      </span>
    </div>
  );
};
