import { motion } from "framer-motion";
import { ArrowDownRight, Code2, Layers3, Smartphone } from "lucide-react";
import { portfolio } from "../../data/portfolio";
import { Button, CVButton } from "../ui/Button";
import { WelcomeAnimation } from "./WelcomeAnimation";
import { WorkspaceIllustration } from "./WorkspaceIllustration";
export function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-clip bg-linear-to-br from-primary via-primary to-secondary pt-10 pb-8 lg:pt-12 lg:pb-10"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-5 px-5 sm:px-8 md:grid-cols-[1.1fr_1fr] lg:gap-10 lg:px-10">
        <motion.div
          initial={{ opacity: 1, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="relative z-10"
        >
          <WelcomeAnimation />
          <p className="mb-4 text-[9px] font-semibold tracking-[0.2em] text-accent-strong uppercase">
            Full-stack developer · Web & mobile
          </p>
          <h1
            id="hero-title"
            className="max-w-[650px] font-display text-[clamp(2.8rem,4.5vw,4.2rem)] leading-[0.99] tracking-[-0.035em] text-text-primary"
          >
            Building thoughtful{" "}
            <em className="font-normal text-dark-primary">web and mobile</em>{" "}
            experiences that turn ideas into real-world products.
          </h1>
          <p className="mt-5 max-w-[500px] text-[13px] leading-[1.9] text-text-secondary sm:text-sm">
            {portfolio.intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="#projects">View My Work</Button>
            <CVButton />
          </div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 border-t border-border/80 pt-4 text-[10px] text-text-secondary">
            {[
              { Icon: Code2, label: "Web applications" },
              { Icon: Smartphone, label: "Mobile experiences" },
              { Icon: Layers3, label: "Backend systems" },
            ].map(({ Icon, label }) => (
              <span key={label} className="flex items-center gap-2">
                <Icon aria-hidden="true" size={13} className="text-dark-primary" />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
        <div className="relative -mt-3 md:mt-0">
          <WorkspaceIllustration />
        </div>
      </div>
      <div className="mx-auto mt-5 flex max-w-7xl items-center justify-between px-5 text-[10px] text-text-secondary sm:px-8 lg:px-10">
        <p>Thoughtful by design. Practical by nature.</p>
        <a
          href="#projects"
          className="flex items-center gap-2 rounded-full py-2 text-dark-primary"
        >
          Explore the work
          <ArrowDownRight size={16} />
        </a>
      </div>
    </section>
  );
}
