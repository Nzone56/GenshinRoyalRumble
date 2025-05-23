import { useTournament } from "@hooks/useTournament";
import { Tab } from "./Tab";
import { useNavigate } from "react-router";


export const Header = () => {
  const { tournamentName } = useTournament();
  const tabs = ["Table", "Stats", "Characters", "Categories", "Settings"];
  const navigate = useNavigate();

  const goHome = () => {
    navigate(`tournament/home`);
  };

  return (
    <div className="flex justify-between items-center w-full">
      <h2
        className={`${location.pathname === `/tournament/home` ? "text-amber-400" : " text-white hover:text-amber-400"} text-3xl font-semibold cursor-pointer transition-colors duration-300`}
        onClick={goHome}
      >
        {tournamentName}
      </h2>
      <div className="flex gap-4 items-center ">
        {tabs.map((tab) => (
          <Tab key={tab} title={tab} selected={location.pathname === `/tournament/${tab.toLowerCase()}`} />
        ))}
      </div>
    </div>
  );
};
