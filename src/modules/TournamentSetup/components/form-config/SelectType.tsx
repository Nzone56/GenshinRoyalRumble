import { FormLabel } from "@components/form/FormLabel";
import { FormSelect } from "@components/form/FormSelect";
import { tournametTypes } from "@modules/TournamentSetup/variables/SetupVariables";
import React, { memo } from "react";

interface SelectTypeProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const SelectType = memo(({ value, onChange }: SelectTypeProps) => {
  return (
    <fieldset className="flex flex-col items-center mb-5">
      <FormLabel htmlFor="tournament_type">Tournament Type</FormLabel>
      <FormSelect id="tournament_type" name="type" value={value} onChange={onChange}>
        {tournametTypes.map((type) => (
          <option id={type} key={type} value={type} disabled={type !== "League"}>
            {type}
          </option>
        ))}
      </FormSelect>
    </fieldset>
  );
});
