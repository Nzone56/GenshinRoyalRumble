import { useTournamentStoreForm } from "@modules/TournamentSetup/hooks/useTournamentStoreForm";

export const TournamentPage = () => {
  const { name, type, characters, categories } = useTournamentStoreForm();
  console.log({ name, type, characters, categories });
  return (
    <div className="flex flex-col items-center py-5 text-center bg-gray-950 w-full min-h-screen">
      <h2 className="text-4xl font-semibold text-white">{name || "ROYAL RUMBLE"}</h2>
    </div>
  );
};
