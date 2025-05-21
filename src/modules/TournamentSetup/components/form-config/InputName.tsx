// InputName.tsx
import React, { memo } from "react";
import { FormLabel } from "@components/form/FormLabel";
import { FormInput } from "@components/form/FormInput";

interface InputMemoProps {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const InputName = memo(({ value, onChange }: InputMemoProps) => {
  return (
    <fieldset className="flex flex-col items-center mb-5">
      <FormLabel htmlFor="tournament_name">Tournament Name</FormLabel>
      <FormInput
        id="tournament_name"
        name="name"
        value={value}
        placeholder=""
        onChange={onChange}
        required
      />
    </fieldset>
  );
});