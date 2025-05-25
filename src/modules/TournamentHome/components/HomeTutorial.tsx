import { useTournament } from "@hooks/useTournament";

export const HomeTutorial = () => {
  const { config, categories } = useTournament();

  const filledCharacters =
    Object.keys(categories).length > 0
      ? config.characters
          .map((curr) => Object.values(categories[curr]).every((value: number) => value > 0))
          .filter((value) => value)
      : [];

  const handleStartTournament = () => {};

  return (
    <div className="m-8 flex flex-col gap-8">
      <h3 className="text-2xl font-bold">
        Welcome to <span className="text-amber-400">{config.name}!</span>
      </h3>

      <p className="text-base leading-relaxed">
        This is the HUB! Here you’ll find five main pages, along with a home button — just click your tournament name in
        the top-left corner to return to the homepage.
      </p>

      <p className="text-base leading-relaxed">
        <span className="text-amber-400 font-medium">Table</span> shows the tournament bracket and standings.{" "}
        <span className="text-amber-400 font-medium">Matches</span> displays the schedule, including previous and
        upcoming games. <span className="text-amber-400 font-medium">Characters</span> lets you view stats for each
        participant. <span className="text-amber-400 font-medium">Categories</span> is where you define character
        attributes. Finally, <span className="text-amber-400 font-medium">Settings</span> allows you to customize your
        tournament experience!
      </p>
      <div className="flex flex-col">
        <span className="text-base">
          To start the tournament, please make sure every character has their categories filled.
        </span>
        <span className="text-sm text-gray-500">
          Progress: {filledCharacters.length}/{config.characters.length} characters completed
        </span>
      </div>
      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={handleStartTournament}
          disabled={filledCharacters.length < config.characters.length}
          className={`
            px-8 py-3 w-1/2 rounded-xl text-white font-semibold transition duration-300
            ${
              filledCharacters.length < config.characters.length
                ? "bg-gray-400 cursor-not-allowed scale-100"
                : "bg-amber-400 hover:scale-110 cursor-pointer"
            }
          `}
        >
          Start {config.name}
        </button>
      </div>
    </div>
  );
};
