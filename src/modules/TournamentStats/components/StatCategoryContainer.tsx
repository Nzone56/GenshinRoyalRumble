import type { TopPerformance } from "@modules/TournamentTable/hooks/useTable";
import React from "react";



type CategoryTopListProps = {
  data: Record<string, TopPerformance[]>;

};



export const CategoryTopList: React.FC<CategoryTopListProps> = ({ data }) => {
  console.log(Object.entries(data))
  return (
    <div className="category-top-list w-full max-w-4xl mx-auto my-8">
      {Object.entries(data).map(([category, performances]) => (
        <div key={category} className="mb-6 border-b border-gray-300 pb-4">
          <h3 className="text-xl font-semibold mb-2">{category}</h3>
          <ul>
            {performances.map(({ character, value }, idx) => (
              <li key={idx} className="flex justify-between py-1">
                <span>{character}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
