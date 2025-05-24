import { memo } from "react";
import { FormInput } from "@components/form/FormInput";
import { useTournamentStoreForm } from "../../hooks/useTournamentStoreForm";

export const NameSlide = memo(() => {
  const { name, handleChangeName } = useTournamentStoreForm();

  return (
    <div className="flex flex-col items-center mb-5 text-center justify-center h-full animate-fade-in">
      <h3 className="text-4xl font-semibold text-white">ENTER YOUR TOURNAMENT NAME</h3>
      <div className="flex flex-col items-center mt-10">
        <p className="leading-loose text-xl max-w-3xl text-gray-300">
          Give your tournament a name to kick things off — it can be something serious, funny, or just plain epic.
          <span className="text-amber-400"> This name will appear across your entire local experience</span>, so make it
          memorable!
        </p>
        <FormInput
          id="tournament_name"
          name="name"
          value={name}
          placeholder="Ex. Teyvat League"
          className="rounded-xl h-14 text-xl mt-12 p-2.5"
          onChange={handleChangeName}
          required
        />
      </div>
    </div>
  );
});
