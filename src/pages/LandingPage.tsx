// import { TournamentSetup } from "@modules/TournamentSetup";
import { useSectionScroll } from "@hooks/useSectionScroll";
import "../assets/styles/tailwind.css";
import { WelcomeBanner } from "@modules/TournamentIntroduction/components/WelcomeBanner";
import { TournamentInstructions } from "@modules/TournamentIntroduction/components/TournamentInstructions";
import { TournamentSetupV2 } from "@modules/TournamentSetupV2";
import { LoadingLogo } from "@components/ui/LoadingLogo";
import { useTournamentStoreForm } from "@modules/TournamentSetupV2/hooks/useTournamentStoreForm";

export const LandingPage = () => {
  const { loading } = useTournamentStoreForm();
  const sections = [<WelcomeBanner />, <TournamentInstructions />, <TournamentSetupV2 />];

  const containerRef = useSectionScroll(!loading ? sections.length : 0, 500);

  if (loading) return <LoadingLogo />;

  return (
    <div ref={containerRef} className="h-screen w-screen overflow-hidden no-scrollbar">
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
