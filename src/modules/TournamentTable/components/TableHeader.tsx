import { columns } from "../helpers/TableVariables";
import type { TableColumn } from "../hooks/useTableFilters";

type Props = {
  visibleColumns: Record<TableColumn, boolean>;
};

export const TableHeader = ({ visibleColumns }: Props) => (
  <tr className="text-amber-400 uppercase text-xs">
    <th className="p-2">Pos</th>

    {columns.map(
      ({ key, label }) =>
        visibleColumns[key] && (
          <th key={key} className="p-2">
            {label}
          </th>
        ),
    )}
  </tr>
);
