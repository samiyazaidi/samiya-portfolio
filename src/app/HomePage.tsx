import { MotionConfig } from "framer-motion";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { HeroSection } from "../components/hero/HeroSection";
import { ProjectSection } from "../components/projects/ProjectSection";
import { SkillsSection } from "../components/skills/SkillsSection";
import { WhatIDoSection } from "../components/services/WhatIDoSection";
import { JourneySection } from "../components/journey/JourneySection";
// import { RobotController } from "../components/robot/RobotController";
import { Reveal } from "../components/ui/Reveal";

export default function App() {
  const sections = [WhatIDoSection, ProjectSection, SkillsSection, JourneySection];

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed top-2 left-2 z-50 -translate-y-24 rounded-full bg-primary px-5 py-3 text-xs text-text-primary focus:translate-y-0"
      >
        Skip to content
      </a>
      {/* <RobotController> */}
        <SiteHeader />
        <main id="main">
          <HeroSection />
          {sections.map((Section) => (
            <Reveal key={Section.name}>
              <Section />
            </Reveal>
          ))}
        </main>
        <SiteFooter />
      {/* </RobotController> */}
    </MotionConfig>
  );
}
