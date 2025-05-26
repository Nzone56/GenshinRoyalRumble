import { getNationImages, getVisionImages, getWeaponImages } from "@helpers/getIcons";
import type { CharacterTable } from "@mytypes/Tournament";
import type { TableColumn } from "../hooks/useTableFilters";

type TableRowProps = {
  character: CharacterTable;
  visibleColumns: Record<TableColumn, boolean>;
};

export const TableRow = ({ character, visibleColumns }: TableRowProps) => {
  const visionImages = getVisionImages();
  const weaponImages = getWeaponImages();
  const nationImages = getNationImages();

  // Define un array con las columnas que quieres mostrar y cómo renderizarlas
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

  return (
    <tr className="hover:bg-gray-700 border-t border-gray-600">
      <td className="p-2 ">{character.position}</td>

      {columns.map(({ key, render }) =>
        visibleColumns[key] ? (
          <td key={key} className="p-2">
            {render()}
          </td>
        ) : null,
      )}
    </tr>
  );
};
