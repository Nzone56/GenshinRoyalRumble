import { TournamentSetup } from "@modules/TournamentSetup";
import { useSectionScroll } from "@hooks/useSectionScroll";
import "../assets/styles/tailwind.css";
import { WelcomeBanner } from "@modules/TournamentIntroduction/components/WelcomeBanner";
import { TournamentInstructions } from "@modules/TournamentIntroduction/components/TournamentInstructions";

export const LandingPage = () => {
  const sections = [ <WelcomeBanner />,<TournamentInstructions />, <TournamentSetup />];
  const containerRef = useSectionScroll(sections.length, 500);

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-hidden no-scrollbar"
    >
      <div style={{ height: `${sections.length * 100}vh` }}>
        {sections.map((Section, index) => (
          <div key={index} className="h-screen w-full">
            {Section}
          </div>
        ))}
      </div>
    </div>
  );
};