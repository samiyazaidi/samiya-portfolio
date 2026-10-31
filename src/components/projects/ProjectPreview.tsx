// import { ArrowUpRight } from "lucide-react";
// import type { Project } from "../../data/projects";
// import { safeDestination } from "../../lib/placeholders";

// export function ProjectPreview({ project }: { project: Project }) {
// const screenshot = project.screenshots[0] ?? null;

// const candidateLink = safeDestination(
//   project.links.find(
//     (item) => item.href && /^https:\/\//i.test(item.href)
//   )?.href ?? null
// );

// const link =
//   candidateLink && /^https:\/\//i.test(candidateLink)
//     ? candidateLink
//     : null;
 
//   return (
//     <div className="relative flex aspect-[1.72] items-center justify-center overflow-hidden border-b border-border/70 bg-linear-to-br from-primary via-secondary to-tertiary">
//      {screenshot ? (
//   <img
//     alt={screenshot.alt}
//     src={screenshot.src}
//     loading="lazy"
//     draggable={false}
//     className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
//   />
// ) : (
//         <svg
//           aria-hidden
//           viewBox="0 0 420 245"
//           className="h-full w-full transition duration-700 group-hover:scale-[1.035]"
//         >
//           <rect x="28" y="18" width="364" height="210" rx="12" fill="var(--color-surface)" stroke="var(--color-border)" />
//           <rect x="28" y="18" width="364" height="24" rx="12" fill="var(--color-tertiary)" />
//           <path d="M28 32h364v10H28Z" fill="var(--color-tertiary)" />
//           {[43, 53, 63].map((x) => (
//             <circle key={x} cx={x} cy="30" r="2.4" fill="var(--color-accent-strong)" />
//           ))}
//           {project.preview === "mobile" ? (
//             <>
//               <rect x="154" y="52" width="112" height="164" rx="16" fill="var(--color-dark-secondary)" />
//               <rect x="160" y="58" width="100" height="152" rx="11" fill="var(--color-primary)" />
//               <rect x="193" y="63" width="34" height="5" rx="3" fill="var(--color-tertiary)" />
//               <circle cx="181" cy="88" r="9" fill="var(--color-accent-soft)" />
//               <path d="M199 85h43m-43 8h27" stroke="var(--color-text-secondary)" strokeWidth="2.5" />
//               <rect x="171" y="109" width="78" height="35" rx="6" fill="var(--color-accent-soft)" />
//               {[153, 173, 193].map((y) => (
//                 <g key={y}>
//                   <rect x="171" y={y} width="12" height="10" rx="3" fill="var(--color-tertiary)" />
//                   <path d={`M191 ${y + 3}h49m-49 5h31`} stroke="var(--color-border)" strokeWidth="2" />
//                 </g>
//               ))}
//             </>
//           ) : (
//             <>
//               <rect x="28" y="42" width="49" height="186" fill="var(--color-dark-primary)" />
//               <rect x="40" y="56" width="23" height="10" rx="3" fill="var(--color-accent)" />
//               {[86, 103, 120, 137, 154].map((y) => (
//                 <path key={y} d={`M41 ${y}h22`} stroke="var(--color-on-dark-muted)" strokeWidth="3" opacity=".75" />
//               ))}
//               <rect x="95" y="57" width="106" height="7" rx="3" fill="var(--color-dark-primary)" />
//               <rect x="95" y="72" width="155" height="3" rx="2" fill="var(--color-border)" />
//               {[95, 191, 287].map((x, i) => (
//                 <g key={x}>
//                   <rect x={x} y="88" width="84" height="39" rx="5" fill={i === 0 ? "var(--color-accent-soft)" : "var(--color-secondary)"} />
//                   <rect x={x + 10} y="98" width="34" height="3" rx="1" fill="var(--color-accent)" />
//                   <rect x={x + 10} y="110" width="49" height="6" rx="2" fill={i === 0 ? "var(--color-dark-primary)" : "var(--color-tertiary)"} />
//                 </g>
//               ))}
//               <rect x="95" y="137" width="173" height="76" rx="5" fill="var(--color-secondary)" />
//               {project.preview === "energy" ? (
//                 <>
//                   <path d="M108 202h145M108 184h145M108 166h145" stroke="var(--color-border)" strokeWidth=".8" />
//                   <path d="m108 197 20-16 18 5 19-20 20 10 18-24 18 7 18-13 14 3" fill="none" stroke="var(--color-accent-strong)" strokeWidth="2.2" />
//                 </>
//               ) : (
//                 <>
//                   {[112, 139, 166, 193, 220].map((x, i) => (
//                     <rect key={x} x={x} y={174 - i * 5} width="15" height={29 + i * 5} rx="2" fill={i % 2 ? "var(--color-accent)" : "var(--color-dark-primary)"} />
//                   ))}
//                 </>
//               )}
//               <rect x="279" y="137" width="83" height="76" rx="5" fill="var(--color-secondary)" />
//               <circle cx="320" cy="174" r="21" fill="none" stroke="var(--color-tertiary)" strokeWidth="8" />
//               <path d="M320 153a21 21 0 1 1-20 27" fill="none" stroke="var(--color-accent-strong)" strokeWidth="8" />
//             </>
//           )}
//         </svg>
//       )}
//       {link && (
//         <a
//           href={link}
//           target="_blank"
//           rel="noopener noreferrer"
//           aria-label={`Open ${project.title} link`}
//           className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full border border-surface/70 bg-dark-primary text-on-dark shadow-md transition hover:scale-105 hover:bg-dark-secondary focus-visible:outline-accent-strong"
//         >
//           <ArrowUpRight size={16} />
//         </a>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { Apple,  Globe, Play } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Project, ProjectLinkKind } from "../../data/projects";

const LINK_ICONS: Record<ProjectLinkKind, LucideIcon> = {
  website: Globe,
  "app-store": Apple,
  github: Globe,
  demo: Play,
};

function hasPublicHttpsUrl(value: string | null): value is string {
  if (!value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function FallbackPreview({ project }: { project: Project }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 360"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`preview-bg-${project.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={project.preview === "mobile" ? "#f9e4dc" : "#e6edf4"} />
          <stop offset="100%" stopColor={project.preview === "energy" ? "#dce6d4" : "#f7f0e6"} />
        </linearGradient>
        <linearGradient id={`preview-screen-${project.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0f3f7" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill={`url(#preview-bg-${project.id})`} />
      <circle cx="70" cy="54" r="120" fill="#ffffff" opacity="0.34" />
      <circle cx="596" cy="324" r="170" fill="#ffffff" opacity="0.24" />
      {project.preview === "mobile" ? (
        <>
          <rect x="225" y="22" width="190" height="318" rx="27" fill="#152f4d" />
          <rect x="234" y="32" width="172" height="296" rx="20" fill={`url(#preview-screen-${project.id})`} />
          <rect x="281" y="38" width="78" height="8" rx="4" fill="#152f4d" />
          <circle cx="320" cy="92" r="25" fill="#e9eef2" />
          <path d="M298 91h44m-37 -9h30m-25 18h20" stroke="#8f3044" strokeWidth="4" strokeLinecap="round" />
          <text x="320" y="135" textAnchor="middle" fontSize="16" fontWeight="700" fill="#142f4d">MANTIS</text>
          <text x="320" y="154" textAnchor="middle" fontSize="9" letterSpacing="2" fill="#66748a">GENTS SALON</text>
          {[0, 1, 2].map((n) => (
            <g key={n}>
              <rect x="250" y={177 + n * 42} width="140" height="33" rx="7" fill="#ffffff" stroke="#e4e8ee" />
              <circle cx="268" cy={193 + n * 42} r="8" fill={n === 0 ? "#eac5b7" : n === 1 ? "#c6d5e3" : "#d6dfce"} />
              <rect x="283" y={187 + n * 42} width="62" height="5" rx="2.5" fill="#344a66" />
              <rect x="283" y={198 + n * 42} width="44" height="3" rx="1.5" fill="#a5afbd" />
            </g>
          ))}
        </>
      ) : (
        <>
          <rect x="42" y="34" width="556" height="294" rx="15" fill="#152f4d" />
          <rect x="51" y="43" width="538" height="276" rx="9" fill={`url(#preview-screen-${project.id})`} />
          <rect x="51" y="43" width="110" height="276" rx="9" fill="#142f4d" />
          <rect x="66" y="62" width="76" height="12" rx="4" fill="#e9eef2" opacity="0.85" />
          {[0, 1, 2, 3, 4].map((n) => (
            <g key={n} opacity={n === 0 ? 1 : 0.65}>
              <rect x="67" y={95 + n * 28} width="9" height="9" rx="2" fill={n === 0 ? "#a9c0d5" : "#e9eef2"} />
              <rect x="84" y={97 + n * 28} width={n === 2 ? 43 : 54} height="5" rx="2" fill="#e9eef2" />
            </g>
          ))}
          <rect x="180" y="60" width="152" height="10" rx="5" fill="#142f4d" />
          <rect x="180" y="82" width="130" height="5" rx="2.5" fill="#d5dce5" />
          {[0, 1, 2, 3].map((n) => (
            <g key={n}>
              <rect x={180 + n * 98} y="105" width="84" height="53" rx="7" fill={n === 0 ? "#e6efe5" : "#edf1f6"} />
              <circle cx={197 + n * 98} cy="122" r="5" fill={n === 2 ? "#dca27a" : "#7eaa9d"} />
              <rect x={208 + n * 98} y="119" width="39" height="5" rx="2.5" fill="#a0acbd" />
              <rect x={197 + n * 98} y="137" width="43" height="10" rx="3" fill="#314e6a" />
            </g>
          ))}
          <rect x="180" y="174" width="270" height="118" rx="8" fill="#ffffff" stroke="#e3e8ef" />
          <path d="M198 270H430M198 238H430M198 206H430" stroke="#e5eaf0" strokeWidth="1.5" />
          {project.preview === "energy" ? (
            <path d="M198 258 L232 240 L266 246 L298 211 L331 225 L365 197 L397 207 L430 190" fill="none" stroke="#6e9d88" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          ) : project.preview === "drive" ? (
            <g>
              <path d="M218 255 L237 225 L274 216 L306 225 L326 255 Z" fill="#b8c8d8" />
              <rect x="236" y="231" width="69" height="16" rx="6" fill="#d6e1ea" />
              <circle cx="242" cy="257" r="10" fill="#243c58" />
              <circle cx="303" cy="257" r="10" fill="#243c58" />
              <rect x="346" y="205" width="77" height="9" rx="4" fill="#dbe3ea" />
              <rect x="346" y="224" width="61" height="6" rx="3" fill="#dbe3ea" />
            </g>
          ) : (
            <g>
              {[0, 1, 2].map((n) => (
                <g key={n}>
                  <circle cx="204" cy={202 + n * 28} r="7" fill={n === 1 ? "#9caddf" : "#d7e0ed"} />
                  <rect x="221" y={197 + n * 28} width={n === 1 ? 113 : 156} height="9" rx="4.5" fill="#e6eaf2" />
                  <rect x={n === 1 ? 286 : 360} y={212 + n * 28} width={n === 1 ? 141 : 65} height="17" rx="8" fill="#dce5ff" />
                </g>
              ))}
            </g>
          )}
          <rect x="464" y="174" width="105" height="118" rx="8" fill="#edf1f6" />
          <circle cx="516" cy="228" r="25" fill="none" stroke="#c4d4e1" strokeWidth="10" />
          <path d="M516 203a25 25 0 0 1 22 38" fill="none" stroke="#6e9d88" strokeWidth="10" strokeLinecap="round" />
          <circle cx="516" cy="228" r="4" fill="#142f4d" />
        </>
      )}
    </svg>
  );
}

export function ProjectPreview({ project }: { project: Project }) {
  const [coverFailed, setCoverFailed] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);
  const showCover = Boolean(project.coverImage) && !coverFailed;
  const showFallbackImage = Boolean(project.fallbackImage) && !fallbackFailed;
  const isMantis = project.id === "mantis";
  const isEnergy = project.id === "az-energy-website";
  const isDriveHub = project.id === "drive-hub";
  const fitWholeWebsiteScreenshot = isEnergy || isDriveHub;
  const previewBackground = isEnergy
    ? "bg-[#080c0d]"
    : isDriveHub
      ? "bg-[#f4f0e8]"
      : "bg-linear-to-br from-primary via-secondary to-tertiary";

  useEffect(() => {
    setCoverFailed(false);
    setFallbackFailed(false);
  }, [project.coverImage, project.fallbackImage]);

  const imageError = () => setCoverFailed(true);
  const iconBase = "flex size-7 items-center justify-center rounded-full border border-white/80 bg-surface/95 text-dark-primary shadow-sm backdrop-blur-sm transition sm:size-8";

  return (
    <div className={`group/preview relative isolate aspect-[1.72] overflow-hidden border-b border-border/70 ${previewBackground}`}>
      {showCover && isMantis ? (
        <>
          {/* Blurred ambience fills the wide cover while the complete mobile page stays undistorted. */}
          <img
            src={project.coverImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            draggable={false}
            onError={imageError}
            className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-45 blur-xl"
          />
          <div className="absolute inset-0 bg-[#080b0d]/35" />
          <div className="absolute inset-y-2 left-1/2 aspect-[297/681] -translate-x-1/2 overflow-hidden rounded-[8px] border-[2px] border-[#171717] bg-[#080808] shadow-xl sm:inset-y-2">
            <img
              src={project.coverImage}
              alt="Mantis Gents Salon mobile website preview"
              loading="lazy"
              draggable={false}
              onError={imageError}
              className="h-full w-full object-contain object-top"
            />
          </div>
        </>
      ) : showCover ? (
        <img
          src={project.coverImage}
          alt={`${project.title} project preview`}
          loading="lazy"
          draggable={false}
          referrerPolicy="no-referrer"
          onError={imageError}
          className={`absolute inset-0 h-full w-full transition duration-700 ${fitWholeWebsiteScreenshot ? "object-contain object-center" : "object-cover object-center group-hover/preview:scale-[1.025]"}`}
        />
      ) : showFallbackImage ? (
        <img
          src={project.fallbackImage!}
          alt={`${project.title} visual fallback`}
          loading="lazy"
          draggable={false}
          referrerPolicy="no-referrer"
          onError={() => setFallbackFailed(true)}
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover/preview:scale-[1.025]"
        />
      ) : (
        <FallbackPreview project={project} />
      )}

      {/* Site / App Store / GitHub icons are always in the image's top-right corner. */}
      <div className="absolute right-2 top-2 z-10 flex items-center gap-1.5">
        {project.links.map((link) => {
          const Icon = LINK_ICONS[link.kind];
          const safeHref = hasPublicHttpsUrl(link.href) ? link.href : null;
          return safeHref ? (
            <a
              key={`${link.kind}-${link.label}`}
              href={safeHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              title={link.label}
              className={`${iconBase} hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong`}
            >
              <Icon size={15} aria-hidden="true" />
            </a>
          ) : (
            <span
              key={`${link.kind}-${link.label}`}
              aria-label={`${link.label}; public URL not added`}
              title={`${link.label} — public URL not added yet`}
              className={`${iconBase} cursor-not-allowed opacity-75`}
            >
              <Icon size={15} aria-hidden="true" />
            </span>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-[#142f4d]/25 to-transparent" />
    </div>
  );
}
