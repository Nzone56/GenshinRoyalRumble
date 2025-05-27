import { useEffect, useState } from "react";
import { RoundMatches } from "@modules/TournamentMatches/components/RoundMatches";
import { RoundTabs } from "@modules/TournamentMatches/components/RoundTabs";

export const TournamentMatches = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`m-8 transition-all duration-500 ease-out transform ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <h3 className="text-2xl">Fixtures</h3>
      <RoundTabs />
      <RoundMatches />
    </div>
  );
};
