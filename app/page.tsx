import { CinematicHome } from "@/components/cinematic-home";
import { CommercialSections } from "@/components/commercial-sections";
import { ExperienceSection } from "@/components/experience-section";
import { LocationSection } from "@/components/location-section";

export default function HomePage() {
  return (
    <CinematicHome
      sections={
        <>
          <ExperienceSection />
          <CommercialSections />
          <LocationSection />
        </>
      }
    />
  );
}
