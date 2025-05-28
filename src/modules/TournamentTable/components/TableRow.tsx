import { getNationImages, getVisionImages, getWeaponImages } from "@helpers/getIcons";
import type { CharacterTable } from "@mytypes/Tournament";
import type { TableColumn } from "../hooks/useTableFilters";
import LINE from "@assets/images/icons/line.svg?react";
import ARROWUP from "@assets/images/icons/arrow-up.svg?react";
import ARROWDOWN from "@assets/images/icons/arrow-down.svg?react";
import { useNavigate } from "react-router";
import { useCharacter } from "@modules/TournamentCharacters/hooks/useCharacter";

type TableRowProps = {
  character: CharacterTable;
  visibleColumns: Record<TableColumn, boolean>;
};

export const TableRow = ({ character, visibleColumns }: TableRowProps) => {
  const navigate = useNavigate();

  const { characterIds, setSelectedCharacterIndex } = useCharacter();

  const visionImages = getVisionImages();
  const weaponImages = getWeaponImages();
  const nationImages = getNationImages();

  const columns: { key: TableColumn; label: string; render: () => React.ReactNode }[] = [
    {
      key: "nation",
      label: "Nation",
      render: () => {
        const src = nationImages[character.nation.toLowerCase()] || nationImages["unknown"];
        return <img src={src} alt={character.nation} className="w-12 h-12 rounded-full" />;
      },
    },
    {
      key: "vision",
      label: "Vision",
      render: () => {
        const src = visionImages[character.vision.toLowerCase()];
        return <img src={src} alt={character.vision} className="w-12 h-12 rounded-full" />;
      },
    },
    {
      key: "weapon",
      label: "Weapon",
      render: () => {
        const src = weaponImages[character.weapon.toLowerCase()];
        return <img src={src} alt={character.weapon} className="w-12 h-12 rounded-full" />;
      },
    },
    {
      key: "icon",
      label: "Icon",
      render: () => <img src={character.icon} alt={character.name} className="w-12 h-12 rounded-full" />,
    },
    {
      key: "name",
      label: "Character",
      render: () => <span className="truncate">{character.name}</span>,
    },
    {
      key: "battles",
      label: "PJ",
      render: () => character.battles,
    },
    {
      key: "wins",
      label: "W",
      render: () => character.wins,
    },
    {
      key: "draws",
      label: "D",
      render: () => character.draws,
    },
    {
      key: "losses",
      label: "L",
      render: () => character.losses,
    },
    {
      key: "pointsF",
      label: "PF",
      render: () => character.pointsF,
    },
    {
      key: "pointsA",
      label: "PA",
      render: () => character.pointsA,
    },
    {
      key: "diffP",
      label: "PD",
      render: () => character.diffP,
    },
    {
      key: "points",
      label: "PTS",
      render: () => character.points,
    },
  ];

  const getPrevPositionIcon = () => {
    if (character.prevPosition == null || character.prevPosition === character.position) {
      return <LINE className="w-8 h-8 rounded-full fill-gray-300" />;
    }

    if (character.prevPosition > character.position) {
      return <ARROWUP className="w-8 h-8 rounded-full fill-green-400" />;
    }

    return <ARROWDOWN className="w-8 h-8 rounded-full fill-red-400" />;
  };

  const handleSelectCharacter = () => {
    setSelectedCharacterIndex(characterIds.findIndex((char: string) => char === character.id) - 1);
    navigate("/tournament/characters");
  };

  return (
    <tr
      className="hover:bg-gray-700 border-t border-gray-600 cursor-pointer transition duration-300"
      onClick={handleSelectCharacter}
    >
      <td className="p-2 ">{character.position}</td>

      {columns.map(({ key, render }) =>
        visibleColumns[key] ? (
          <td key={key} className="p-2">
            {render()}
          </td>
        ) : null,
      )}
      <td>{getPrevPositionIcon()}</td>
    </tr>
  );
};
