import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from 'framer-motion';

/* ------------------------------------------------------------------ *
 * WorkspaceIllustration
 *
 * One continuous SVG scene (viewBox 1200x800, fixed camera). Nothing is
 * ever swapped for another picture — every state change animates the
 * properties of the very same shapes:
 *
 *   • click the pendant lamp        → lights on/off
 *   • click the curtains / window   → curtains open/close
 *   • click the dresser drawer      → a little gift envelope pops out
 *
 * The lamp is the "working" switch: lights on = the woman appears and
 * her code starts scrolling; lights off = she rests, the code pauses
 * and the room settles into a softer, darker mood. The curtains are the
 * "daylight" switch: opening them slides both panels to the sides,
 * lets daylight in and calls the single bird in to land on the books;
 * closing them first sends the bird back out through the window.
 *
 * Both start OFF (lights out, curtains closed).
 * ------------------------------------------------------------------ */

/* ---------------------------------- timing ---------------------------------- */

const LIGHT_TRANSITION = { duration: 1.1, ease: 'easeInOut' } as const;
const WOMAN_TRANSITION = { duration: 0.9, ease: 'easeInOut' } as const;
const DAYLIGHT_TRANSITION = { duration: 1.0, ease: 'easeInOut' } as const;
const CURTAIN_DURATION_S = 0.8; // within the requested 600–1000 ms
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ENTER_DURATION_MS = 2600;
const EXIT_DURATION_MS = 2200;
const ENTRY_DELAY_MS = 900;
const EXIT_DELAY_MS = 600;

/** Handwritten cue style, used for the little prompts in the scene. */
const CURSIVE =
  "'Segoe Script', 'Bradley Hand', 'Snell Roundhand', 'Comic Sans MS', cursive";

/* ---------------------------------- palette --------------------------------- */

const C = {
  wallTop: '#f2f8fc',
  wallBottom: '#dfeaf4',
  floorTop: '#ecdfcb',
  floorBottom: '#e1d1b7',
  floorLine: '#d8c6ab',
  baseboard: '#f5efe3',

  navy: '#23365e',
  deskTopA: '#2a4069',
  deskTopB: '#1e3055',
  deskFront: '#1a2a4b',
  deskEdge: '#33497a',

  burgundy: '#8e3040',
  burgundyDark: '#712431',
  burgundyLight: '#a64454',

  curtainRod: '#1f3057',
  curtainBand: '#1b2b4f',

  chairA: '#f8f0df',
  chairB: '#e7dac4',

  hijabA: '#cd8d92',
  hijabB: '#b6727a',
  hijabC: '#9d5963',
  clothA: '#f6ecdb',
  clothB: '#e4d7c0',
  skin: '#c98d66',

  laptop: '#3b4769',
  laptopLight: '#4d5b86',
  laptopWell: '#2e385a',
  screenBg: '#141b2c',

  plant: '#7f9d7c',
  plantDark: '#6a8a6d',
  plantLight: '#a5bf9d',
  terracotta: '#c98a6b',
} as const;

const CODE = {
  ivory: '#efe6d6',
  blue: '#7fa8dd',
  sage: '#9fc29b',
  blush: '#e6b3ba',
  coral: '#ef9273',
  dim: '#616d90',
} as const;

/** The little gift: seal colour, exactly as requested. */
const SEAL = '#2a4069';

/* ----------------------------- curtain geometry ---------------------------- */

const CURTAIN_LEFT = 344;
const CURTAIN_RIGHT = 856;
const CURTAIN_WIDTH = 262;
const CURTAIN_OPEN_SCALE = 0.3; // gathered width factor when fully open
const CURTAIN_TOP = 56;
const CURTAIN_HEM = 458;

const n1 = (v: number) => Math.round(v * 10) / 10;

function curtainGeom(side: 'left' | 'right', open: number) {
  const s = 1 - (1 - CURTAIN_OPEN_SCALE) * open;
  const outer = side === 'left' ? CURTAIN_LEFT : CURTAIN_RIGHT;
  const w = CURTAIN_WIDTH * s;
  const inner = side === 'left' ? outer + w : outer - w;
  const hemDir = side === 'left' ? -1 : 1; // travelling from inner edge to outer edge
  return { outer, inner, w, hemDir };
}

/** Panel body: one closed path with an identical command structure in
 *  every state, so it is safe to rebuild frame by frame from the
 *  animated curtain progress value (no CSS transform quirks). */
function curtainBody(side: 'left' | 'right', open: number): string {
  const { outer, inner, w, hemDir } = curtainGeom(side, open);
  const hem = CURTAIN_HEM;
  const h = hemDir;
  return [
    `M ${n1(outer)},${CURTAIN_TOP}`,
    `L ${n1(inner)},${CURTAIN_TOP}`,
    // gently wavering leading edge
    `C ${n1(inner + 4)},168 ${n1(inner - 4)},312 ${n1(inner)},${hem - 6}`,
    // scalloped hem, inner edge → outer edge
    `C ${n1(inner + h * w * 0.08)},${hem + 15} ${n1(inner + h * w * 0.17)},${hem + 15} ${n1(inner + h * w * 0.24)},${hem}`,
    `C ${n1(inner + h * w * 0.33)},${hem + 17} ${n1(inner + h * w * 0.42)},${hem + 17} ${n1(inner + h * w * 0.5)},${hem + 3}`,
    `C ${n1(inner + h * w * 0.58)},${hem + 17} ${n1(inner + h * w * 0.67)},${hem + 17} ${n1(inner + h * w * 0.75)},${hem}`,
    `C ${n1(inner + h * w * 0.84)},${hem + 15} ${n1(inner + h * w * 0.93)},${hem + 15} ${n1(outer)},${hem - 4}`,
    `L ${n1(outer)},${CURTAIN_TOP}`,
    'Z',
  ].join(' ');
}

/** Rod-pocket band along the top of a panel. */
function curtainTopBand(side: 'left' | 'right', open: number): string {
  const { outer, inner } = curtainGeom(side, open);
  return `M ${n1(outer)},${CURTAIN_TOP} L ${n1(inner)},${CURTAIN_TOP} L ${n1(inner)},80 L ${n1(outer)},80 Z`;
}

/** Room-darkening overlay: a full-scene path with a hole punched over
 *  the actually visible part of the window (the gap between the panels),
 *  so daylight pours through the open curtains only. */
function overlayPath(open: number): string {
  const base = 'M 0,0 H 1200 V 800 H 0 Z';
  const s = 1 - (1 - CURTAIN_OPEN_SCALE) * open;
  const gapL = CURTAIN_LEFT + CURTAIN_WIDTH * s;
  const gapR = CURTAIN_RIGHT - CURTAIN_WIDTH * s;
  if (gapR - gapL < 4) return base;
  return `${base} M ${n1(gapL)},74 H ${n1(gapR)} V 414 H ${n1(gapL)} Z`;
}

/* -------------------------------- curtain folds -------------------------------- */

const CURTAIN_STOPS: Array<[number, string]> = [
  [0, '#1d2d53'],
  [0.09, '#26395f'],
  [0.2, '#2e4775'],
  [0.31, '#253a62'],
  [0.43, '#1e2f57'],
  [0.55, '#2b4371'],
  [0.66, '#23365e'],
  [0.78, '#1f3159'],
  [0.89, '#2a4170'],
  [1, '#22345f'],
];

/* ------------------------------ laptop code ------------------------------- */

type CodeSeg = { x: number; w: number; c: string };

const CODE_ROWS: CodeSeg[][] = [
  [
    { x: 636, w: 44, c: CODE.blue },
    { x: 684, w: 16, c: CODE.dim },
    { x: 704, w: 30, c: CODE.ivory },
  ],
  [
    { x: 644, w: 28, c: CODE.sage },
    { x: 676, w: 12, c: CODE.dim },
    { x: 692, w: 34, c: CODE.blush },
  ],
  [],
  [
    { x: 636, w: 22, c: CODE.coral },
    { x: 662, w: 40, c: CODE.ivory },
    { x: 706, w: 22, c: CODE.blue },
  ],
  [
    { x: 644, w: 50, c: CODE.sage },
    { x: 698, w: 30, c: CODE.dim },
  ],
  [
    { x: 652, w: 32, c: CODE.blush },
    { x: 688, w: 14, c: CODE.dim },
    { x: 706, w: 28, c: CODE.ivory },
  ],
  [
    { x: 636, w: 18, c: CODE.blue },
    { x: 658, w: 46, c: CODE.dim },
    { x: 708, w: 16, c: CODE.coral },
  ],
  [
    { x: 644, w: 56, c: CODE.ivory },
    { x: 704, w: 30, c: CODE.sage },
  ],
];

const CODE_ROW_H = 7.5;
const CODE_TOP = 410;
const CODE_ROWS_DRAWN = 22;
const CODE_SCROLL = CODE_ROW_H * CODE_ROWS.length; // 60 px → seamless loop

/* --------------------------------- skyline -------------------------------- */

const BUILDINGS: Array<[number, number, number, number]> = [
  [372, 318, 44, 96],
  [420, 348, 30, 66],
  [454, 302, 44, 112],
  [502, 338, 24, 76],
  [616, 330, 34, 84],
  [654, 352, 30, 62],
  [688, 322, 48, 92],
  [740, 346, 32, 68],
  [776, 306, 46, 108],
];

/* --------------------------------- helpers -------------------------------- */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const isActivationKey = (key: string) => key === 'Enter' || key === ' ';

/* -------------------------------- wall clock -------------------------------- */

const CLOCK = { cx: 1058, cy: 150, r: 58 };

/** Live analog wall clock + date. Ticks on its own so the rest of the
 *  scene never re-renders (and never restarts) because of the clock. */
function WallClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourAngle = ((hours % 12) + minutes / 60) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const secondAngle = seconds * 6;

  const timeLabel = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const dateLabel = now.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const { cx, cy, r } = CLOCK;

  const ticks = Array.from({ length: 12 }, (_, i) => {
    const rad = (i * 30 * Math.PI) / 180;
    const major = i % 3 === 0;
    const r1 = major ? 40 : 44.5;
    const r2 = 50;
    return (
      <line
        key={i}
        x1={cx + Math.sin(rad) * r1}
        y1={cy - Math.cos(rad) * r1}
        x2={cx + Math.sin(rad) * r2}
        y2={cy - Math.cos(rad) * r2}
        stroke="#4f6185"
        strokeWidth={major ? 3 : 1.5}
        strokeLinecap="round"
        opacity={major ? 0.9 : 0.55}
      />
    );
  });

  const numerals: Array<[string, number, number]> = [
    ['12', cx, cy - 26],
    ['3', cx + 30, cy + 5],
    ['6', cx, cy + 36],
    ['9', cx - 30, cy + 5],
  ];

  return (
    <g role="img" aria-label={`Wall clock: ${timeLabel}, ${dateLabel}`}>
      <ellipse cx={cx + 4} cy={cy + 7} rx={r} ry={r} fill="#0b1224" opacity="0.10" filter="url(#blurSm)" />
      <circle cx={cx} cy={cy} r={r} fill={C.navy} />
      <circle cx={cx} cy={cy} r={r - 7} fill="#2c4272" />
      <circle cx={cx} cy={cy} r={r - 10} fill="#f8f1e3" />
      <circle cx={cx} cy={cy} r={r - 10} fill="url(#clockSheen)" />
      {ticks}
      {numerals.map(([label, x, y]) => (
        <text
          key={label}
          x={x}
          y={y}
          textAnchor="middle"
          fontSize={13}
          fontWeight={600}
          fill="#5b6d8c"
        >
          {label}
        </text>
      ))}

      <g transform={`rotate(${hourAngle} ${cx} ${cy})`}>
        <rect x={cx - 3} y={cy - 27} width={6} height={32} rx={3} fill={C.navy} />
      </g>
      <g transform={`rotate(${minuteAngle} ${cx} ${cy})`}>
        <rect x={cx - 2} y={cy - 41} width={4} height={46} rx={2} fill={C.navy} />
      </g>
      <g transform={`rotate(${secondAngle} ${cx} ${cy})`}>
        <rect x={cx - 1} y={cy - 45} width={2} height={55} rx={1} fill={C.burgundy} />
        <circle cx={cx} cy={cy + 11} r={3.4} fill={C.burgundy} />
      </g>
      <circle cx={cx} cy={cy} r={5} fill={C.burgundy} />
      <circle cx={cx} cy={cy} r={1.8} fill="#f8f1e3" />

      <text
        x={cx}
        y={cy + r + 32}
        textAnchor="middle"
        fontSize={15}
        fontWeight={500}
        fill="#4f6185"
        letterSpacing="0.4"
      >
        {dateLabel}
      </text>
    </g>
  );
}

/* --------------------------------- skyline view -------------------------------- */

function Skyline() {
  const b1 = '#b3c6d8';
  const b2 = '#a2b7cc';
  const green = '#8fae86';
  const greenDark = '#799a7b';
  const win = '#93a9bf';
  const winOpacity = 0.5;

  return (
    <g>
      {/* mosque-like complex with domes and minarets */}
      <rect x={506} y={310} width={11} height={104} fill={b1} />
      <rect x={502} y={332} width={19} height={5} fill={b2} />
      <path d="M 506,310 A 5.5 7 0 0 1 517,310 Z" fill={green} />
      <circle cx={511.5} cy={304} r={2.4} fill={green} />

      <rect x={534} y={368} width={52} height={46} fill={b1} />
      <path d="M 534,372 A 26 26 0 0 1 586,372 Z" fill={green} />
      <circle cx={560} cy={343} r={3.6} fill={green} />
      <rect x={552} y={392} width={16} height={22} rx={8} fill={b2} />

      <rect x={598} y={324} width={11} height={90} fill={b2} />
      <rect x={594} y={346} width={19} height={5} fill={b1} />
      <path d="M 598,324 A 5.5 7 0 0 1 609,324 Z" fill={green} />
      <circle cx={603.5} cy={318} r={2.4} fill={green} />

      {/* distant buildings with tiny windows */}
      {BUILDINGS.map(([x, y, w, h], i) => {
        const cols = Math.max(1, Math.floor((w - 10) / 15));
        const rows = Math.max(2, Math.floor((h - 14) / 19));
        const windows: ReactNode[] = [];
        for (let r = 0; r < rows; r += 1) {
          for (let c = 0; c < cols; c += 1) {
            if ((r * 3 + c * 5 + i) % 4 === 0) continue;
            windows.push(
              <rect
                key={`${r}-${c}`}
                x={x + 7 + c * 15}
                y={y + 9 + r * 19}
                width={7}
                height={9}
                fill={win}
                opacity={winOpacity}
                rx={1}
              />,
            );
          }
        }
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} fill={i % 2 === 0 ? b1 : b2} />
            <rect x={x} y={y} width={w} height={5} fill="#c3d3e1" />
            {windows}
          </g>
        );
      })}

      {/* greenery along the horizon */}
      <rect x={366} y={404} width={468} height={10} fill={greenDark} />
      <ellipse cx={402} cy={402} rx={44} ry={24} fill={green} />
      <ellipse cx={466} cy={408} rx={54} ry={20} fill={greenDark} />
      <ellipse cx={648} cy={406} rx={56} ry={22} fill={green} />
      <ellipse cx={770} cy={402} rx={50} ry={26} fill={greenDark} />
      <ellipse cx={540} cy={410} rx={46} ry={16} fill={green} />
    </g>
  );
}

/* --------------------------- handwritten scene cues --------------------------- */

function SceneCue({
  x,
  y,
  text,
  anchor = 'start',
  size = 17,
  ink,
}: {
  x: number;
  y: number;
  text: string;
  anchor?: 'start' | 'middle';
  size?: number;
  ink: string;
}) {
  return (
    <motion.text
      key={text}
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontStyle="italic"
      fill={ink}
      fontFamily={CURSIVE}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.92 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ pointerEvents: 'none' }}
    >
      {text}
    </motion.text>
  );
}

/* ------------------------------- the little gift ------------------------------- */

const ENVELOPE_W = 420;
const ENVELOPE_H = 280;
/** The flap is drawn on a taller canvas so it can fold back above the
 *  envelope instead of being clipped by its own viewport. */
const FLAP_LIFT = 160;

const SERIF = "Georgia, 'Times New Roman', serif";

/** Pressed-wax edge for the seal. */
function waxEdge(cx: number, cy: number, r: number, bumps = 15, amp = 2.8): string {
  const steps = bumps * 8;
  const pts: string[] = [];
  for (let i = 0; i < steps; i += 1) {
    const a = (i / steps) * Math.PI * 2;
    const rr = r + amp * Math.sin(a * bumps);
    pts.push(`${n1(cx + rr * Math.cos(a))},${n1(cy + rr * Math.sin(a))}`);
  }
  return `M ${pts.join(' L ')} Z`;
}

/** Paper body of the envelope — the layer behind everything else. */
function EnvelopeBody() {
  return (
    <svg
      viewBox={`0 0 ${ENVELOPE_W} ${ENVELOPE_H}`}
      className="absolute inset-0 h-full w-full"
      style={{ zIndex: 10, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <rect x={2} y={2} width={416} height={276} rx={14} fill="#f7f0e0" stroke="#e3d7bf" strokeWidth={3} />
      <rect x={9} y={9} width={402} height={262} rx={9} fill="none" stroke="#f1e8d6" strokeWidth={2} />
    </svg>
  );
}

/** The flap: hinges along its own top edge and folds back when opened. */
function EnvelopeFlap({ open }: { open: boolean }) {
  return (
    <svg
      viewBox={`0 ${-FLAP_LIFT} ${ENVELOPE_W} ${ENVELOPE_H + FLAP_LIFT}`}
      className="absolute left-0 w-full"
      style={{
        top: `${(-FLAP_LIFT / ENVELOPE_H) * 100}%`,
        height: `${((ENVELOPE_H + FLAP_LIFT) / ENVELOPE_H) * 100}%`,
        zIndex: 15,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: '50% 0%' }}
        animate={{ scaleY: open ? 1 : -1 }}
        transition={{ duration: open ? 0.55 : 0.5, ease: EASE, delay: open ? 0 : 0.6 }}
      >
        <path
          d="M 8,5 L 412,5 C 336,45 258,102 210,152 C 162,102 84,45 8,5 Z"
          fill={open ? '#eadec4' : '#efe6d2'}
          stroke="#ddd0b6"
          strokeWidth={3}
          strokeLinejoin="round"
        />
        <path d="M 24,12 C 100,53 164,101 210,141" fill="none" stroke="#e5d9be" strokeWidth={2} />
      </motion.g>
    </svg>
  );
}

/** Front pocket — always drawn in front of the letter, so the sheet reads
 *  as coming out of the envelope instead of resting on top of it. */
function EnvelopeFront({ sealed }: { sealed: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${ENVELOPE_W} ${ENVELOPE_H}`}
      className="absolute inset-0 h-full w-full"
      style={{ zIndex: 30, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="waxSheen" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#5470a8" />
          <stop offset="0.45" stopColor={SEAL} />
          <stop offset="1" stopColor="#1b2b4c" />
        </linearGradient>
        <linearGradient id="pocketGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5eddb" />
          <stop offset="1" stopColor="#eee4cf" />
        </linearGradient>
      </defs>

      <path
        d="M 4,157 H 416 V 262 A 15,15 0 0 1 401,277 H 19 A 15,15 0 0 1 4,262 Z"
        fill="url(#pocketGrad)"
        stroke="#e3d7bf"
        strokeWidth={3}
      />
      <path d="M 6,160 H 414" stroke="#d9cbaf" strokeWidth={2} />
      <path d="M 7,273 L 76,167 M 413,273 L 344,167" fill="none" stroke="#e6dac1" strokeWidth={2} />

      {/* wax seal, with the SZ monogram pressed into it */}
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
        animate={{ opacity: sealed ? 1 : 0, scale: sealed ? 1 : 0.8 }}
        transition={{ duration: 0.3, delay: sealed ? 1.15 : 0 }}
      >
        <path d={waxEdge(210, 157, 34)} fill="url(#waxSheen)" />
        <path d={waxEdge(210, 157, 34)} fill="none" stroke="#182748" strokeWidth={1.2} opacity={0.5} />
        <circle cx={210} cy={157} r={27} fill="none" stroke="#728cc6" strokeWidth={1.6} opacity={0.7} />
        <circle cx={210} cy={157} r={23} fill="none" stroke="#1c2c4e" strokeWidth={1.4} opacity={0.45} />
        <text
          x={210.9}
          y={166.4}
          textAnchor="middle"
          fontSize={25}
          fontStyle="italic"
          fontWeight={700}
          letterSpacing={1.5}
          fill="#16233f"
          opacity={0.5}
          fontFamily={SERIF}
        >
          SZ
        </text>
        <text
          x={210}
          y={165.5}
          textAnchor="middle"
          fontSize={25}
          fontStyle="italic"
          fontWeight={700}
          letterSpacing={1.5}
          fill="#f6ecd9"
          fontFamily={SERIF}
        >
          SZ
        </text>
        <path d="M 188,177 Q 210,184 232,177" fill="none" stroke="#f6ecd9" strokeWidth={1.6} strokeLinecap="round" opacity={0.85} />
        <circle cx={181} cy={151} r={2} fill="#f6ecd9" opacity={0.7} />
        <circle cx={239} cy={151} r={2} fill="#f6ecd9" opacity={0.7} />
      </motion.g>

      <motion.g
        animate={{ opacity: sealed ? 1 : 0 }}
        transition={{ duration: 0.3, delay: sealed ? 1.15 : 0 }}
      >
        <text x={210} y={230} textAnchor="middle" fontSize={20} fontStyle="italic" fill="#6f4650" fontFamily={CURSIVE}>
          a little note, just for you
        </text>
        <text x={210} y={256} textAnchor="middle" fontSize={14} fontStyle="italic" fill="#97897a" fontFamily={CURSIVE}>
          tap the seal to read it
        </text>
      </motion.g>
    </svg>
  );
}

/** The note itself: one sheet of paper that slides up out of the envelope.
 *  Sized so the whole letter fits without scrolling (and the scrollbar is
 *  hidden anyway as a safety net on very small screens). */
const LETTER_BODY: string[] = [
  "You don't need a hire who needs three months to ramp up — you need the one who ships in three days.",
  "I read a codebase fast, then lift the weight nobody has had time for: the bug nobody owns, the pull request you were about to write, the complaint users keep repeating. Clear, tested, honest code — and I tell you where things stand before you have to ask.",
  "On day one you get work merged, not queued, judgement you can trust, and a teammate who raises the bar quietly.",
  "I can start now. If this is the team you're building, we should talk.",
];

function LetterSheet() {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 rounded-[12px] border-[3px] border-[#e3d7bf]"
        style={{
          background: 'linear-gradient(165deg, #fdfaf3 0%, #fbf6ea 50%, #f6efdd 100%)',
          boxShadow: '0 16px 36px rgba(8, 14, 28, 0.45)',
        }}
      />
      <div
        className="scroll-none relative flex h-full w-full flex-col overflow-y-auto"
        style={{ padding: '7% 8% 16%' }}
      >
        <span style={{ fontFamily: SERIF, fontSize: 'clamp(9.5px,2.1cqh,14.5px)', fontStyle: 'italic', color: '#3f3a33' }}>
          Dear future team,
        </span>
        {LETTER_BODY.map((paragraph) => (
          <span
            key={paragraph}
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(8.5px,1.85cqh,13px)',
              lineHeight: 1.55,
              color: '#4b453c',
              marginTop: '1.5cqh',
            }}
          >
            {paragraph}
          </span>
        ))}
        <span style={{ marginTop: 'auto', paddingTop: '2.2cqh' }}>
          <span style={{ display: 'block', fontFamily: SERIF, fontSize: 'clamp(9.5px,2.05cqh,14px)', fontStyle: 'italic', color: '#3f3a33' }}>
            Warmly,
          </span>
          <span style={{ display: 'block', fontFamily: CURSIVE, fontSize: 'clamp(22px,5.4cqh,38px)', lineHeight: 1.1, color: SEAL }}>
            SZ
          </span>
        </span>
      </div>
    </div>
  );
}

/* ------------------------------- main component ------------------------------- */

type BirdPhase = 'outside' | 'flying-in' | 'perched' | 'flying-out';
type FocusTarget = 'lamp' | 'curtains' | 'drawer' | null;

const BIRD_PERCH: [number, number] = [464, 428];

/** Flight path: the single bird drops in over the open window with a
 *  rightward sweep, then settles onto the book pile — facing the way it
 *  flies (into the room, toward the right). */
const BIRD_ENTER = {
  x: [466, 486, 500, 502, 486, 470, BIRD_PERCH[0]],
  y: [86, 124, 186, 248, 306, 368, BIRD_PERCH[1]],
  rot: [14, 19, 21, 15, 9, 4, 0],
  opacity: [0, 0.3, 1, 1, 1, 1, 1],
};

/** Same bird, taking off and fluttering back out through the top of the
 *  open window — mirrored so it faces the way it flies (to the left). */
const BIRD_EXIT = {
  x: [BIRD_PERCH[0], 459, 455, 452, 450, 449, 447],
  y: [BIRD_PERCH[1], 372, 306, 238, 172, 118, 74],
  rot: [0, 8, 14, 16, 12, 8, 4],
  opacity: [1, 1, 1, 1, 0.85, 0.5, 0],
};

export  function WorkspaceIllustration() {
  /* Both start off: lights out, curtains drawn. */
  const [lightsOn, setLightsOn] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [curtainShown, setCurtainShown] = useState(false);
  const [birdPhase, setBirdPhase] = useState<BirdPhase>('outside');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [letterOut, setLetterOut] = useState(false);
  const [focused, setFocused] = useState<FocusTarget>(null);

  /* ------------------------------ derived state ------------------------------ */

  // The lamp is the "working" switch: she only sits down while it is on.
  const womanVisible = lightsOn;
  // A softly darker room whenever the lamp is out; daylight takes the edge off.
  const darkness = lightsOn ? 0 : clamp01(curtainShown ? 0.46 : 0.6);
  const daylightIn = curtainShown;
  const wantBirdInside = curtainsOpen;
  // Light ink reads on the dim room, dark ink on the bright room.
  const hintInk = lightsOn ? '#6f4650' : '#f3e5c8';

  /* ------------------------------ bird state machine ------------------------- */

  // Phase durations: flying-in → perched, flying-out → outside.
  useEffect(() => {
    if (birdPhase === 'flying-in') {
      const t = window.setTimeout(() => setBirdPhase('perched'), ENTER_DURATION_MS);
      return () => window.clearTimeout(t);
    }
    if (birdPhase === 'flying-out') {
      const t = window.setTimeout(() => setBirdPhase('outside'), EXIT_DURATION_MS);
      return () => window.clearTimeout(t);
    }
  }, [birdPhase]);

  // The single bird enters when the window is open and leaves when it closes.
  useEffect(() => {
    if (wantBirdInside && birdPhase === 'outside') {
      const t = window.setTimeout(() => setBirdPhase('flying-in'), ENTRY_DELAY_MS);
      return () => window.clearTimeout(t);
    }
    if (!wantBirdInside && birdPhase === 'perched') {
      const t = window.setTimeout(() => setBirdPhase('flying-out'), EXIT_DELAY_MS);
      return () => window.clearTimeout(t);
    }
    // (if the curtains close mid-flight the phase timer lands it first,
    //  then this effect sends it back out — never a teleport)
  }, [wantBirdInside, birdPhase]);

  // Curtains only close once the bird has actually left the room.
  useEffect(() => {
    if (curtainsOpen) {
      setCurtainShown(true);
      return;
    }
    if (birdPhase === 'outside') setCurtainShown(false);
  }, [curtainsOpen, birdPhase]);

  /* --------------------------- curtain path animation ------------------------ */

  const curtainProgress = useMotionValue(curtainShown ? 1 : 0);
  useEffect(() => {
    const controls = animate(curtainProgress, curtainShown ? 1 : 0, {
      duration: CURTAIN_DURATION_S,
      ease: EASE,
    });
    return () => controls.stop();
  }, [curtainShown, curtainProgress]);

  const leftBodyD = useTransform(curtainProgress, (v) => curtainBody('left', v));
  const rightBodyD = useTransform(curtainProgress, (v) => curtainBody('right', v));
  const leftTopD = useTransform(curtainProgress, (v) => curtainTopBand('left', v));
  const rightTopD = useTransform(curtainProgress, (v) => curtainTopBand('right', v));
  const nightOverlayD = useTransform(curtainProgress, (v) => overlayPath(v));

  /* --------------------------------- gift ---------------------------------- */

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLetterOut(false);
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  const closeGift = () => {
    setLetterOut(false);
    setDrawerOpen(false);
  };

  /* --------------------------------- handlers -------------------------------- */

  const toggleLights = () => setLightsOn((v) => !v);
  const toggleCurtains = () => setCurtainsOpen((v) => !v);
  const toggleDrawer = () => {
    if (drawerOpen) setLetterOut(false);
    setDrawerOpen((v) => !v);
  };

  const birdTransition =
    birdPhase === 'flying-in'
      ? ({ duration: ENTER_DURATION_MS / 1000, ease: 'easeInOut' } as const)
      : birdPhase === 'flying-out'
        ? ({ duration: EXIT_DURATION_MS / 1000, ease: 'easeInOut' } as const)
        : ({ duration: 0.4, ease: 'easeOut' } as const);

  /* ---------------------------------- render --------------------------------- */

  return (
    <div className="relative aspect-[3/2] w-[min(100%,150dvh)] overflow-hidden rounded-xl sm:rounded-3xl">
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Illustration of a woman seen from behind, working on a laptop at a dark navy desk beside a window with navy curtains, a pendant lamp, plants, a wall clock and a small bird landing on a stack of books."
      >
        <title>Cozy workspace illustration</title>

        <defs>
          <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={C.wallTop} />
            <stop offset="0.55" stopColor="#e9f1f8" />
            <stop offset="1" stopColor={C.wallBottom} />
          </linearGradient>
          <linearGradient id="ceilingShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9fb4cc" stopOpacity="0.35" />
            <stop offset="1" stopColor="#9fb4cc" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={C.floorTop} />
            <stop offset="1" stopColor={C.floorBottom} />
          </linearGradient>

          <linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b9dbf0" />
            <stop offset="0.55" stopColor="#dceef8" />
            <stop offset="1" stopColor="#f7ead3" />
          </linearGradient>

          <linearGradient id="deskTopGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={C.deskTopA} />
            <stop offset="1" stopColor={C.deskTopB} />
          </linearGradient>
          <linearGradient id="deskSheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3c5891" stopOpacity="0.55" />
            <stop offset="1" stopColor="#3c5891" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="hijabGrad" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0" stopColor={C.hijabA} />
            <stop offset="0.55" stopColor={C.hijabB} />
            <stop offset="1" stopColor={C.hijabC} />
          </linearGradient>
          <linearGradient id="clothGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={C.clothA} />
            <stop offset="1" stopColor={C.clothB} />
          </linearGradient>
          <linearGradient id="chairGrad" x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0" stopColor={C.chairA} />
            <stop offset="1" stopColor={C.chairB} />
          </linearGradient>
          <linearGradient id="lampShadeGrad" x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0" stopColor={C.burgundyLight} />
            <stop offset="0.5" stopColor={C.burgundy} />
            <stop offset="1" stopColor={C.burgundyDark} />
          </linearGradient>

          <linearGradient id="curtainL" x1="0" y1="0" x2="1" y2="0">
            {CURTAIN_STOPS.map(([offset, stopColor]) => (
              <stop key={offset} offset={offset} stopColor={stopColor} />
            ))}
          </linearGradient>
          <linearGradient id="curtainR" x1="0" y1="0" x2="1" y2="0">
            {[...CURTAIN_STOPS].reverse().map(([offset, stopColor]) => (
              <stop key={offset} offset={offset} stopColor={stopColor} />
            ))}
          </linearGradient>

          <linearGradient id="coneGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe2ac" stopOpacity="0.5" />
            <stop offset="0.7" stopColor="#ffdca2" stopOpacity="0.14" />
            <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="shaftGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#eef6ff" stopOpacity="0.3" />
            <stop offset="1" stopColor="#eef6ff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="glowRadial" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#fff2d8" stopOpacity="0.9" />
            <stop offset="0.45" stopColor="#ffe8bd" stopOpacity="0.45" />
            <stop offset="1" stopColor="#ffe8bd" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="poolRadial" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffe3b4" stopOpacity="0.75" />
            <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="washRadial" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffdca8" stopOpacity="0.42" />
            <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="nightOverlay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0c1630" />
            <stop offset="0.6" stopColor="#13214a" />
            <stop offset="1" stopColor="#1b2c56" />
          </linearGradient>
          <radialGradient id="vignette" cx="0.5" cy="0.46" r="0.75">
            <stop offset="0.55" stopColor="#0c1630" stopOpacity="0" />
            <stop offset="1" stopColor="#0c1630" stopOpacity="0.32" />
          </radialGradient>
          <radialGradient id="clockSheen" cx="0.32" cy="0.26" r="0.85">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <clipPath id="glassClip">
            <rect x={366} y={74} width={468} height={340} rx={2} />
          </clipPath>
          <clipPath id="screenClip">
            <path d="M 626,502 L 746,502 L 741,410 L 631,410 Z" />
          </clipPath>

          <filter id="blurSm" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id="blurMd" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="curtainShadow" x="-25%" y="-10%" width="150%" height="130%">
            <feDropShadow dx="5" dy="6" stdDeviation="7" floodColor="#101a33" floodOpacity="0.26" />
          </filter>
        </defs>

        {/* ============================ 1. room shell ============================ */}
        <rect x={0} y={0} width={1200} height={665} fill="url(#wallGrad)" />
        <rect x={0} y={0} width={1200} height={46} fill="url(#ceilingShade)" />
        <rect x={0} y={665} width={1200} height={135} fill="url(#floorGrad)" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line
            key={i}
            x1={-60 + i * 196}
            y1={665}
            x2={10 + i * 196}
            y2={800}
            stroke={C.floorLine}
            strokeWidth={1.6}
            opacity={0.55}
          />
        ))}
        <line x1={0} y1={716} x2={1200} y2={716} stroke={C.floorLine} strokeWidth={1.4} opacity={0.4} />
        <rect x={0} y={648} width={1200} height={18} fill={C.baseboard} />
        <rect x={0} y={648} width={1200} height={3} fill="#e4d8c4" />

        {/* ============================ 2. window ============================ */}
        <g>
          <g clipPath="url(#glassClip)">
            <rect x={366} y={74} width={468} height={340} fill="url(#skyDay)" />
            <circle cx={470} cy={140} r={26} fill="#fdf4dd" />
            <circle cx={470} cy={140} r={42} fill="#fdf4dd" opacity={0.25} />
            <motion.g
              animate={{ x: [0, 46, 0] }}
              transition={{ duration: 52, repeat: Infinity, ease: 'easeInOut' }}
            >
              <g fill="#ffffff" opacity={0.8}>
                <ellipse cx={628} cy={144} rx={44} ry={15} />
                <ellipse cx={654} cy={133} rx={26} ry={14} />
                <ellipse cx={602} cy={135} rx={22} ry={12} />
              </g>
              <g fill="#ffffff" opacity={0.6}>
                <ellipse cx={762} cy={196} rx={34} ry={12} />
                <ellipse cx={784} cy={188} rx={20} ry={11} />
              </g>
            </motion.g>
            <Skyline />
            {/* glass sheen */}
            <path d="M 386,414 L 646,74 L 706,74 L 446,414 Z" fill="#ffffff" opacity={0.06} />
          </g>

          {/* frame, mullions, sill */}
          <path
            fillRule="evenodd"
            d="M 352,60 H 848 V 428 H 352 Z M 366,74 H 834 V 414 H 366 Z"
            fill={C.navy}
          />
          <rect x={596} y={74} width={8} height={340} fill={C.navy} />
          <rect x={366} y={240} width={468} height={8} fill={C.navy} />
          <rect x={352} y={60} width={496} height={7} fill="#2c4272" opacity={0.7} />
          <path d="M 342,428 L 858,428 L 866,446 L 334,446 Z" fill="#2b4068" />
          <path d="M 342,428 L 858,428 L 858,432 L 342,432 Z" fill="#3a548a" opacity={0.8} />

          {/* trailing vine draped over the window's top-left corner */}
          <g stroke={C.plant} fill="none" strokeLinecap="round">
            <path d="M 344,72 C 386,58 440,60 482,76" strokeWidth={4} stroke={C.plantDark} />
            <path d="M 372,64 C 366,96 372,128 386,158" strokeWidth={3} />
            <path d="M 424,62 C 424,100 432,130 446,152" strokeWidth={3} />
            <path d="M 462,70 C 466,94 472,110 484,126" strokeWidth={2.5} />
          </g>
          {[
            [368, 84],
            [374, 112],
            [384, 142],
            [420, 84],
            [428, 116],
            [442, 146],
            [460, 84],
            [470, 112],
            [478, 126],
            [398, 66],
            [448, 66],
          ].map(([x, y], i) => (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx={7}
              ry={4.5}
              fill={i % 3 === 0 ? C.plantLight : C.plant}
              transform={`rotate(${i % 2 === 0 ? -24 : 22} ${x} ${y})`}
            />
          ))}

          {/* small plant on the sill */}
          <g>
            <path d="M 704,428 L 752,428 L 747,398 L 709,398 Z" fill={C.terracotta} />
            <rect x={705} y={402} width={46} height={6} rx={3} fill="#d79b7c" />
            <g stroke={C.plantDark} fill="none" strokeWidth={3} strokeLinecap="round">
              <path d="M 728,398 C 726,382 718,372 708,366" />
              <path d="M 728,398 C 730,380 740,370 750,366" />
              <path d="M 728,398 C 728,384 728,376 728,364" />
            </g>
            <ellipse cx={707} cy={364} rx={8} ry={5} fill={C.plant} transform="rotate(-30 707 364)" />
            <ellipse cx={750} cy={364} rx={8} ry={5} fill={C.plantLight} transform="rotate(28 750 364)" />
            <ellipse cx={728} cy={360} rx={7} ry={9} fill={C.plant} />
          </g>
        </g>

        {/* ======================= 3. wall decor, left ======================= */}
        <g>
          <rect x={44} y={52} width={98} height={120} rx={3} fill="#f7f1e4" />
          <rect x={44} y={52} width={98} height={120} rx={3} fill="none" stroke="#dfd2ba" strokeWidth={4} />
          <g stroke={C.plantDark} fill="none" strokeWidth={2.4} strokeLinecap="round">
            <path d="M 93,158 C 92,124 92,96 93,74" />
            <path d="M 93,100 C 80,96 72,86 70,76" />
            <path d="M 93,118 C 106,114 114,104 116,94" />
            <path d="M 93,136 C 82,134 74,126 72,118" />
          </g>
          <ellipse cx={68} cy={74} rx={9} ry={5.5} fill={C.plant} transform="rotate(-38 68 74)" />
          <ellipse cx={118} cy={92} rx={9} ry={5.5} fill={C.plantLight} transform="rotate(34 118 92)" />
          <ellipse cx={70} cy={116} rx={8} ry={5} fill={C.plantLight} transform="rotate(-30 70 116)" />

          <rect x={150} y={112} width={86} height={100} rx={3} fill="#f3ece0" />
          <rect x={156} y={118} width={74} height={88} rx={2} fill="#e8efe9" />
          <path d="M 156,186 C 176,168 196,176 210,164 C 218,158 224,152 230,148 L 230,206 L 156,206 Z" fill="#b7c9b3" />
          <circle cx={212} cy={136} r={9} fill="#e9d9b6" />
          <rect x={150} y={112} width={86} height={100} rx={3} fill="none" stroke="#d9cbb2" strokeWidth={4} />

          {/* floating shelf with trailing plant */}
          <rect x={54} y={240} width={190} height={11} rx={3} fill={C.navy} />
          <rect x={54} y={240} width={190} height={4} rx={2} fill="#33497a" />
          <path d="M 76,240 L 128,240 L 123,206 L 81,206 Z" fill={C.terracotta} />
          <rect x={76} y={208} width={52} height={6} rx={3} fill="#d79b7c" />
          <g stroke={C.plantDark} fill="none" strokeWidth={3} strokeLinecap="round">
            <path d="M 102,206 C 100,188 92,178 82,172" />
            <path d="M 102,206 C 104,186 114,176 124,172" />
            <path d="M 108,244 C 122,264 128,292 126,322" />
            <path d="M 92,246 C 84,272 84,300 92,326" />
          </g>
          {[
            [78, 172],
            [126, 172],
            [128, 278],
            [127, 308],
            [90, 276],
            [92, 312],
            [110, 204],
          ].map(([x, y], i) => (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx={8}
              ry={5}
              fill={i % 2 === 0 ? C.plant : C.plantLight}
              transform={`rotate(${i % 2 === 0 ? -50 : 40} ${x} ${y})`}
            />
          ))}
          <rect x={148} y={218} width={30} height={22} rx={4} fill="#e9d9b6" />
          <rect x={152} y={214} width={22} height={6} rx={3} fill="#d9c9a4" />

          {/* pinned notes */}
          <g transform="rotate(-4 285 326)">
            <rect x={256} y={300} width={58} height={54} rx={2} fill="#f3e2b8" />
            <path d="M 266,316 H 304 M 266,328 H 300 M 266,340 H 296" stroke="#d9c48f" strokeWidth={3} strokeLinecap="round" />
          </g>
          <g transform="rotate(3 298 390)">
            <rect x={272} y={366} width={52} height={48} rx={2} fill="#f0d7d4" />
            <path d="M 281,382 H 315 M 281,394 H 311 M 281,406 H 305" stroke="#d9a9a6" strokeWidth={3} strokeLinecap="round" />
          </g>
        </g>

        {/* ======================= 4. wall decor, right ======================= */}
        <g>
          <rect x={876} y={74} width={86} height={102} rx={3} fill="#f7f1e4" />
          <rect x={882} y={80} width={74} height={90} rx={2} fill="#eef2e9" />
          <g stroke={C.plantDark} fill="none" strokeWidth={2.4} strokeLinecap="round">
            <path d="M 919,164 C 918,138 918,116 919,94" />
            <path d="M 919,120 C 906,116 898,108 896,98" />
            <path d="M 919,140 C 932,136 940,126 942,116" />
          </g>
          <ellipse cx={894} cy={96} rx={9} ry={5.5} fill={C.plant} transform="rotate(-36 894 96)" />
          <ellipse cx={944} cy={114} rx={9} ry={5.5} fill={C.plantLight} transform="rotate(32 944 114)" />
          <rect x={876} y={74} width={86} height={102} rx={3} fill="none" stroke="#dfd2ba" strokeWidth={4} />

          <rect x={884} y={214} width={104} height={76} rx={3} fill="#f5efe3" />
          <rect x={890} y={220} width={92} height={64} rx={2} fill="#efe7d7" />
          <path
            d="M 900,238 H 972 M 900,252 H 962 M 900,266 H 946"
            stroke="#a9b6c9"
            strokeWidth={4}
            strokeLinecap="round"
          />
          <rect x={884} y={214} width={104} height={76} rx={3} fill="none" stroke="#d9cbb2" strokeWidth={4} />

          <g transform="rotate(3 900 346)">
            <rect x={872} y={322} width={54} height={50} rx={2} fill="#e7eee6" />
            <path d="M 881,338 H 917 M 881,350 H 913 M 881,362 H 905" stroke="#b3c6b1" strokeWidth={3} strokeLinecap="round" />
          </g>
          <g transform="rotate(-4 964 372)">
            <rect x={940} y={348} width={48} height={46} rx={2} fill="#f3e2b8" />
            <path d="M 948,364 H 980 M 948,376 H 976 M 948,388 H 968" stroke="#d9c48f" strokeWidth={3} strokeLinecap="round" />
          </g>

          <WallClock />
        </g>

        {/* ======================= 5. curtains + rod ======================= */}
        <g filter="url(#curtainShadow)">
          <motion.path d={leftBodyD} fill="url(#curtainL)" />
          <motion.path d={rightBodyD} fill="url(#curtainR)" />
          <motion.path d={leftTopD} fill={C.curtainBand} />
          <motion.path d={rightTopD} fill={C.curtainBand} />
        </g>
        <g>
          <rect x={318} y={41} width={568} height={9} rx={4.5} fill={C.curtainRod} />
          <rect x={318} y={41} width={568} height={3} rx={1.5} fill="#33497a" opacity={0.8} />
          <rect x={332} y={37} width={7} height={17} rx={3} fill={C.curtainRod} />
          <rect x={865} y={37} width={7} height={17} rx={3} fill={C.curtainRod} />
          <circle cx={316} cy={45.5} r={9} fill="#2a3f6b" />
          <circle cx={888} cy={45.5} r={9} fill="#2a3f6b" />
        </g>

        {/* curtains are clickable: each panel area doubles as the switch */}
        <g
          role="button"
          tabIndex={0}
          aria-label={curtainsOpen ? 'Close the curtains' : 'Open the curtains'}
          className="cursor-pointer focus-visible:outline-none"
          onClick={toggleCurtains}
          onFocus={() => setFocused('curtains')}
          onBlur={() => setFocused(null)}
          onKeyDown={(e) => {
            if (isActivationKey(e.key)) {
              e.preventDefault();
              toggleCurtains();
            }
          }}
        >
          <rect x={344} y={40} width={256} height={420} fill="transparent" pointerEvents="all" />
          <rect x={600} y={40} width={256} height={420} fill="transparent" pointerEvents="all" />
          {focused === 'curtains' && (
            <rect
              x={346}
              y={44}
              width={508}
              height={412}
              rx={10}
              fill="none"
              stroke="#ffd79a"
              strokeWidth={2.5}
              strokeDasharray="7 6"
            />
          )}
        </g>

        {/* ==================== 6. pendant lamp (clickable) ==================== */}
        <g
          role="button"
          tabIndex={0}
          aria-label={lightsOn ? 'Turn the lights off' : 'Switch on the lights'}
          className="cursor-pointer focus-visible:outline-none"
          onClick={toggleLights}
          onFocus={() => setFocused('lamp')}
          onBlur={() => setFocused(null)}
          onKeyDown={(e) => {
            if (isActivationKey(e.key)) {
              e.preventDefault();
              toggleLights();
            }
          }}
        >
          <rect x={234} y={0} width={114} height={214} fill="transparent" pointerEvents="all" />
          <rect x={288} y={0} width={4} height={126} fill="#2a2f3e" />
          <path
            d="M 285,124 L 295,124 C 300,146 336,168 336,186 L 244,186 C 244,168 280,146 285,124 Z"
            fill="url(#lampShadeGrad)"
          />
          <path d="M 246,184 Q 290,194 334,184" stroke="#f6ead4" strokeWidth={3} fill="none" opacity={0.55} />
          <path d="M 288,128 C 292,150 316,168 328,180" stroke="#b6444f" strokeWidth={3} fill="none" opacity={0.5} />
          {focused === 'lamp' && (
            <rect
              x={238}
              y={4}
              width={106}
              height={206}
              rx={14}
              fill="none"
              stroke="#ffd79a"
              strokeWidth={2.5}
              strokeDasharray="7 6"
            />
          )}
        </g>

        {/* ========================== 7. the desk ========================== */}
        <g>
          <path d="M 142,462 L 1058,462 L 1058,470 L 142,470 Z" fill="#0b1224" opacity={0.12} />
          <ellipse cx={600} cy={706} rx={448} ry={22} fill="#0b1224" opacity={0.14} filter="url(#blurSm)" />
          <path d="M 142,468 L 1058,468 L 1088,566 L 112,566 Z" fill="url(#deskTopGrad)" />
          <path d="M 150,468 L 1050,468 L 1064,500 L 136,500 Z" fill="url(#deskSheen)" />
          <path d="M 112,566 L 1088,566 L 1087,570 L 113,570 Z" fill={C.deskEdge} opacity={0.75} />
          {/* daylight patch on the desktop, only while the curtains are open */}
          <motion.path
            d="M 374,470 L 826,470 L 866,564 L 336,564 Z"
            fill="#ffffff"
            initial={false}
            animate={{ opacity: daylightIn ? 0.11 : 0 }}
            transition={DAYLIGHT_TRANSITION}
          />
          <path d="M 112,566 L 1088,566 L 1076,608 L 124,608 Z" fill={C.deskFront} />
          <path d="M 112,566 L 1088,566 L 1087,572 L 113,572 Z" fill="#0f1a33" opacity={0.5} />
          <path d="M 152,608 L 190,608 L 184,702 L 158,702 Z" fill={C.burgundy} />
          <path d="M 152,608 L 164,608 L 160,702 L 158,702 Z" fill={C.burgundyLight} opacity={0.55} />
          <path d="M 1040,608 L 1078,608 L 1072,702 L 1046,702 Z" fill={C.burgundyDark} />
          <path d="M 1040,608 L 1052,608 L 1048,702 L 1046,702 Z" fill={C.burgundy} opacity={0.6} />

          {/* drawer unit — click to open the little gift */}
          <g
            role="button"
            tabIndex={0}
            aria-label={drawerOpen ? 'Close the drawer' : 'Open the drawer for a little gift'}
            className="cursor-pointer focus-visible:outline-none"
            onClick={toggleDrawer}
            onFocus={() => setFocused('drawer')}
            onBlur={() => setFocused(null)}
            onKeyDown={(e) => {
              if (isActivationKey(e.key)) {
                e.preventDefault();
                toggleDrawer();
              }
            }}
          >
            <rect x={872} y={612} width={158} height={88} rx={4} fill="#263a63" />
            <rect x={872} y={612} width={158} height={6} fill="#33497a" />
            <path d="M 872,644 H 1030 M 872,674 H 1030" stroke="#1a2a4b" strokeWidth={3} />
            <rect x={928} y={656} width={46} height={6} rx={3} fill="#e8d9bd" />
            <rect x={928} y={686} width={46} height={6} rx={3} fill="#e8d9bd" />
            {/* dark interior revealed as the top drawer slides out */}
            <rect x={878} y={616} width={146} height={26} rx={2} fill="#0f1830" />
            <motion.g
              animate={{ y: drawerOpen ? 34 : 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            >
              <rect x={872} y={612} width={158} height={34} rx={3} fill="#2c4470" />
              <rect x={872} y={612} width={158} height={5} rx={2} fill="#3d5a91" />
              <rect x={928} y={624} width={46} height={6} rx={3} fill="#e8d9bd" />
              <path d="M 872,644 H 1030" stroke="#1a2a4b" strokeWidth={3} />
            </motion.g>
            <rect x={864} y={604} width={174} height={104} fill="transparent" pointerEvents="all" />
            {focused === 'drawer' && (
              <rect
                x={866}
                y={606}
                width={170}
                height={100}
                rx={8}
                fill="none"
                stroke="#ffd79a"
                strokeWidth={2.5}
                strokeDasharray="7 6"
              />
            )}
          </g>
        </g>

        {/* ======================= 8. objects on the desk ======================= */}
        <g>
          {/* pencil cup */}
          <g>
            <ellipse cx={271} cy={518} rx={26} ry={6} fill="#0b1224" opacity={0.14} />
            <path d="M 250,470 L 292,470 L 288,516 L 254,516 Z" fill={C.terracotta} />
            <ellipse cx={271} cy={470} rx={21} ry={6} fill="#d79b7c" />
            <ellipse cx={271} cy={470} rx={16} ry={4} fill="#a86b50" />
            <rect x={251} y={486} width={40} height={7} fill="#b5765a" opacity={0.55} />
            <g strokeLinecap="round">
              <path d="M 262,476 L 255,442" stroke={CODE.coral} strokeWidth={5} />
              <path d="M 255,442 L 254,437" stroke="#e8d9bd" strokeWidth={5} />
              <path d="M 272,474 L 274,436" stroke={CODE.sage} strokeWidth={5} />
              <path d="M 274,436 L 274,431" stroke="#f2e6cf" strokeWidth={5} />
              <path d="M 281,476 L 289,446" stroke={CODE.blue} strokeWidth={5} />
              <path d="M 289,446 L 290,441" stroke="#e8d9bd" strokeWidth={5} />
            </g>
          </g>

          {/* notepad + pen */}
          <g transform="rotate(-3 330 510)">
            <path d="M 302,494 L 356,490 L 360,524 L 306,528 Z" fill="#f0e4c8" />
            <path d="M 302,494 L 356,490 L 357,498 L 303,502 Z" fill="#e2d3b0" />
            <path d="M 312,510 H 350 M 312,518 H 344" stroke="#cfc0a0" strokeWidth={2.5} strokeLinecap="round" />
            <path d="M 312,504 L 350,496" stroke={C.burgundy} strokeWidth={6} strokeLinecap="round" />
            <path d="M 350,496 L 357,494" stroke="#e8d9bd" strokeWidth={6} strokeLinecap="round" />
          </g>

          {/* book pile (the bird's landing spot) */}
          <g>
            <g transform="rotate(-1 422 507)">
              <rect x={372} y={494} width={100} height={26} rx={3} fill="#2c3f68" />
              <rect x={372} y={494} width={100} height={6} rx={3} fill="#37507f" />
              <rect x={464} y={497} width={7} height={20} rx={2} fill="#efe6d5" />
            </g>
            <g transform="rotate(1.4 426 482)">
              <rect x={380} y={470} width={92} height={24} rx={3} fill={CODE.sage} />
              <rect x={380} y={470} width={92} height={5} rx={2} fill="#b2cfae" />
              <rect x={465} y={473} width={6} height={18} rx={2} fill="#f2ead9" />
            </g>
            <g transform="rotate(-1.6 421 459)">
              <rect x={374} y={448} width={94} height={22} rx={3} fill="#e6c2bb" />
              <rect x={374} y={448} width={94} height={5} rx={2} fill="#efd4ce" />
              <rect x={462} y={451} width={6} height={16} rx={2} fill="#f7f1e6" />
            </g>
            <g transform="rotate(0.9 426 438)">
              <rect x={384} y={428} width={84} height={20} rx={3} fill={C.burgundy} />
              <rect x={384} y={428} width={84} height={5} rx={2} fill="#a4404f" />
              <rect x={462} y={431} width={5} height={14} rx={2} fill="#efe6d5" />
            </g>
          </g>

          {/* laptop */}
          <g transform="rotate(6 686 476)">
            <path d="M 616,506 L 756,506 L 766,548 L 606,548 Z" fill={C.laptop} />
            <path d="M 616,506 L 756,506 L 757,512 L 615,512 Z" fill={C.laptopLight} />
            <path d="M 626,516 L 748,516 L 754,542 L 620,542 Z" fill={C.laptopWell} />
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M ${632 + i * 2},${521 + i * 8} L ${744 - i * 2},${521 + i * 8}`}
                stroke="#414e78"
                strokeWidth={3.6}
                strokeLinecap="round"
                opacity={0.85}
              />
            ))}
            <path d="M 606,548 L 766,548 L 765,552 L 607,552 Z" fill="#2a3355" />

            <path d="M 620,506 L 752,506 L 746,404 L 626,404 Z" fill={C.laptop} />
            <path d="M 620,506 L 752,506 L 751,501 L 621,501 Z" fill={C.laptopLight} opacity={0.7} />
            <path d="M 626,404 L 746,404 L 745.5,409 L 626.5,409 Z" fill={C.laptopLight} opacity={0.6} />
            <path d="M 626,502 L 746,502 L 741,410 L 631,410 Z" fill={C.screenBg} />

            {/* screen content — clipped to the display, only runs while lit */}
            <g clipPath="url(#screenClip)">
              <motion.path
                d="M 626,502 L 746,502 L 741,410 L 631,410 Z"
                fill="#6ea6ff"
                initial={false}
                animate={{ opacity: lightsOn ? 0.12 : 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />
              <motion.g
                initial={false}
                animate={{ opacity: lightsOn ? 1 : 0.12 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <motion.g
                  animate={lightsOn ? { y: [0, -CODE_SCROLL] } : { y: 0 }}
                  transition={
                    lightsOn
                      ? { duration: 4.4, repeat: Infinity, ease: 'linear' }
                      : { duration: 0.5, ease: 'easeOut' }
                  }
                >
                  {Array.from({ length: CODE_ROWS_DRAWN }, (_, i) => {
                    const y = CODE_TOP + i * CODE_ROW_H;
                    return CODE_ROWS[i % CODE_ROWS.length].map((seg, j) => (
                      <rect
                        key={`${i}-${j}`}
                        x={seg.x}
                        y={y}
                        width={seg.w}
                        height={4.4}
                        rx={2.2}
                        fill={seg.c}
                      />
                    ));
                  })}
                </motion.g>
                <motion.rect
                  x={735}
                  y={447}
                  width={3}
                  height={9}
                  rx={1.5}
                  fill="#e7f0ff"
                  animate={{ opacity: lightsOn ? [1, 1, 0, 0] : 0 }}
                  transition={
                    lightsOn
                      ? { duration: 1.15, repeat: Infinity, ease: 'linear', times: [0, 0.5, 0.5, 1] }
                      : { duration: 0.4, ease: 'easeOut' }
                  }
                />
              </motion.g>
            </g>
          </g>

          {/* coffee mug with a burgundy heart */}
          <g>
            <ellipse cx={816} cy={528} rx={32} ry={7} fill="#0b1224" opacity={0.14} />
            <path
              d="M 846,492 C 862,492 864,514 848,516"
              stroke="#f6edde"
              strokeWidth={7}
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 790,486 L 842,486 L 838,520 C 838,524 834,526 830,526 L 802,526 C 798,526 794,524 794,520 Z"
              fill="#f6edde"
            />
            <path d="M 794,506 L 838,506 L 837,514 C 837,520 834,522 830,522 L 802,522 C 798,522 795,520 795,514 Z" fill="#eadcca" opacity={0.7} />
            <ellipse cx={816} cy={486} rx={26} ry={7} fill="#efe3d0" />
            <ellipse cx={816} cy={487} rx={21} ry={5} fill="#5e4033" />
            <path
              d="M 816,512 C 808,505 805,501 805,497.5 C 805,494.5 807.5,492.5 810,492.5 C 812.5,492.5 814.5,494 816,496.5 C 817.5,494 819.5,492.5 822,492.5 C 824.5,492.5 827,494.5 827,497.5 C 827,501 824,505 816,512 Z"
              fill={C.burgundy}
            />
          </g>
        </g>

        {/* ===================== 9. the seated woman ===================== */}
        <motion.g
          initial={false}
          animate={{ opacity: womanVisible ? 1 : 0 }}
          transition={WOMAN_TRANSITION}
          pointerEvents="none"
        >
          <path
            d="M 468,628 L 462,524 C 460,496 470,472 490,460 C 506,450 526,446 546,446 L 556,446 C 578,448 598,458 614,474 C 632,492 638,508 636,528 L 634,628 Z"
            fill="url(#clothGrad)"
          />
          <path
            d="M 604,478 C 622,496 632,510 634,530 L 633,628 L 616,628 C 618,556 614,510 604,478 Z"
            fill={C.clothB}
            opacity={0.55}
          />

          {/* hijab drape over shoulders and upper back */}
          <path
            d="M 505,404 C 486,424 476,452 476,478 C 476,504 484,524 496,540 L 594,540 C 606,524 614,504 614,478 C 614,452 604,424 585,404 Z"
            fill="url(#hijabGrad)"
          />
          <path
            d="M 503,374 C 503,330 521,314 546,314 C 571,314 589,330 589,374 C 589,400 578,416 546,416 C 514,416 503,400 503,374 Z"
            fill="url(#hijabGrad)"
          />
          <g stroke={C.hijabC} fill="none" strokeLinecap="round" opacity={0.4}>
            <path d="M 524,422 C 516,454 513,488 517,524" strokeWidth={3} />
            <path d="M 547,424 C 547,458 549,492 547,526" strokeWidth={2.5} />
            <path d="M 570,422 C 578,454 582,488 577,524" strokeWidth={3} />
            <path d="M 512,344 C 516,326 530,317 545,316" strokeWidth={4} opacity={0.5} />
          </g>
          <path
            d="M 496,470 C 496,496 502,518 512,536"
            stroke={C.hijabC}
            strokeWidth={8}
            fill="none"
            opacity={0.18}
            strokeLinecap="round"
          />
          <path
            d="M 596,470 C 596,496 591,518 582,536"
            stroke={C.hijabA}
            strokeWidth={7}
            fill="none"
            opacity={0.35}
            strokeLinecap="round"
          />

          {/* arms reaching to the keyboard + hands (kept below the screen's
              bottom edge so they read as resting on the keys) */}
          <path
            d="M 626,515 C 654,517 682,521 703,527"
            stroke={C.clothA}
            strokeWidth={25}
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 632,522 C 648,526 658,530 666,535"
            stroke={C.clothA}
            strokeWidth={23}
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx={713} cy={530} rx={13} ry={8.5} fill={C.skin} transform="rotate(16 713 530)" />
          <ellipse cx={675} cy={538} rx={12} ry={8} fill={C.skin} transform="rotate(16 675 538)" />
        </motion.g>

        {/* ===================== 10. chair (foreground) ===================== */}
        <g>
          <ellipse cx={551} cy={784} rx={126} ry={15} fill="#0b1224" opacity={0.16} filter="url(#blurSm)" />
          <path
            d="M 464,640 C 464,628 476,622 492,622 L 610,622 C 626,622 638,628 638,640 L 638,658 C 638,670 626,676 610,676 L 492,676 C 476,676 464,670 464,658 Z"
            fill="url(#chairGrad)"
          />
          <path
            d="M 464,640 C 464,628 476,622 492,622 L 610,622 C 626,622 638,628 638,640 L 638,646 L 464,646 Z"
            fill="#ffffff"
            opacity={0.35}
          />
          <path
            d="M 486,656 L 486,568 C 486,542 498,528 520,524 L 572,524 C 594,528 606,542 606,568 L 606,656 Z"
            fill="url(#chairGrad)"
          />
          <path
            d="M 486,656 L 486,568 C 486,542 498,528 520,524 L 528,524 C 506,530 496,544 496,568 L 496,656 Z"
            fill="#ffffff"
            opacity={0.4}
          />
          <path
            d="M 606,656 L 606,568 C 606,542 594,528 572,524 L 566,524 C 588,530 596,544 596,568 L 596,656 Z"
            fill={C.chairB}
            opacity={0.7}
          />
          <g stroke="#c9b99c" strokeWidth={1.4} opacity={0.35}>
            {[546, 566, 586, 606, 626, 646].map((y) => (
              <path key={y} d={`M 496,${y} H 596`} fill="none" />
            ))}
          </g>
          <path d="M 537,538 L 555,538 L 553,656 L 539,656 Z" fill="#dccdb2" />
          <path d="M 500,594 H 592" stroke="#dccdb2" strokeWidth={7} strokeLinecap="round" />
          <path d="M 537,538 L 543,538 L 542,656 L 539,656 Z" fill="#f2e8d5" opacity={0.7} />

          <rect x={534} y={670} width={26} height={56} rx={5} fill="#d9cbb4" />
          <rect x={538} y={670} width={7} height={56} rx={3} fill="#f2e8d5" opacity={0.7} />
          <path d="M 546,720 L 470,752 L 480,764 L 552,732 Z" fill="#e5d8c2" />
          <path d="M 554,720 L 630,752 L 620,764 L 548,732 Z" fill="#dcd0b8" />
          <path d="M 543,726 L 526,776 L 544,780 L 560,726 Z" fill="#e5d8c2" />
          <ellipse cx={472} cy={762} rx={11} ry={8} fill="#5f687c" />
          <ellipse cx={628} cy={762} rx={11} ry={8} fill="#5f687c" />
          <ellipse cx={534} cy={778} rx={11} ry={8} fill="#5f687c" />
        </g>

        {/* ================ 11. blurred bed corner (foreground) ================ */}
        <g filter="url(#blurMd)" opacity={0.97}>
          <path d="M -40,812 L -40,704 C 48,694 156,700 238,724 C 306,744 358,774 382,812 Z" fill="#f1e8d9" />
          <path d="M -40,744 C 44,732 152,740 228,766 C 288,786 336,806 356,812 L -40,812 Z" fill="#e6dac6" />
          <ellipse cx={44} cy={734} rx={104} ry={40} fill="#f9f3e8" transform="rotate(-6 44 734)" />
          <path d="M -40,812 L -40,788 C 40,778 130,790 190,812 Z" fill="#c79096" />
        </g>

        {/* ========================= 12. the single bird ========================= */}
        {birdPhase !== 'outside' && (
          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: '50% 62%' }}
            pointerEvents="none"
            initial={
              birdPhase === 'flying-in'
                ? { x: BIRD_ENTER.x[0], y: BIRD_ENTER.y[0], rotate: BIRD_ENTER.rot[0], opacity: 0 }
                : false
            }
            animate={
              birdPhase === 'flying-in'
                ? {
                    x: BIRD_ENTER.x,
                    y: BIRD_ENTER.y,
                    rotate: BIRD_ENTER.rot,
                    opacity: BIRD_ENTER.opacity,
                  }
                : birdPhase === 'flying-out'
                  ? {
                      x: BIRD_EXIT.x,
                      y: BIRD_EXIT.y,
                      rotate: BIRD_EXIT.rot,
                      opacity: BIRD_EXIT.opacity,
                    }
                  : { x: BIRD_PERCH[0], y: BIRD_PERCH[1], rotate: 0, opacity: 1 }
            }
            transition={birdTransition}
          >
            <motion.g
              style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
              animate={{
                y: birdPhase === 'perched' ? [0, -1.6, 0] : 0,
                // the same bird, mirrored while it flies back out, so it
                // always faces the direction it is travelling
                scaleX: birdPhase === 'flying-out' ? -1 : 1,
              }}
              transition={{
                y:
                  birdPhase === 'perched'
                    ? { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0.3 },
                scaleX: { duration: 0.3, ease: 'easeOut' },
              }}
            >
              <path d="M -6,-14 C -18,-16 -28,-13 -31,-8 C -26,-5 -16,-7 -8,-9 Z" fill="#5d7099" />
              <path
                d="M -2,-6 L -3,1 M 6,-6 L 6,1"
                stroke="#d39a6e"
                strokeWidth={2.4}
                strokeLinecap="round"
              />
              <ellipse cx={0} cy={-13} rx={16} ry={11} fill="#7f93b8" />
              <ellipse cx={3} cy={-9} rx={11} ry={6} fill="#ece5d6" />
              <circle cx={13} cy={-21} r={8.5} fill="#6c81a8" />
              <path d="M 20,-22 L 29,-19.5 L 20,-16.5 Z" fill="#e8a06a" />
              <circle cx={15.5} cy={-23} r={1.7} fill="#18203a" />
              <circle cx={16.1} cy={-23.6} r={0.6} fill="#ffffff" />
              <motion.g
                style={{ transformBox: 'fill-box', transformOrigin: '24% 64%' }}
                animate={birdPhase === 'perched' ? { rotate: 0 } : { rotate: [-54, 12, -54] }}
                transition={
                  birdPhase === 'perched'
                    ? { duration: 0.4, ease: 'easeOut' }
                    : { duration: 0.62, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                <path d="M -5,-17 C 3,-24 13,-22 16,-15 C 12,-9 2,-10 -5,-13 Z" fill="#5f7398" />
                <path
                  d="M -2,-16 C 5,-20 11,-19 13,-15"
                  stroke="#8ba0c4"
                  strokeWidth={1.6}
                  fill="none"
                  opacity={0.85}
                />
              </motion.g>
            </motion.g>
          </motion.g>
        )}

        {/* ================= 13. daylight shaft + vignette ================= */}
        <motion.g
          initial={false}
          animate={{ opacity: daylightIn ? 1 : 0 }}
          transition={DAYLIGHT_TRANSITION}
          pointerEvents="none"
        >
          <path d="M 384,414 L 816,414 L 968,664 L 232,664 Z" fill="url(#shaftGrad)" />
        </motion.g>
        <rect x={0} y={0} width={1200} height={800} fill="url(#vignette)" pointerEvents="none" />

        {/* ============ 14. room-darkening overlay (window gap punched) ============ */}
        <motion.path
          fillRule="evenodd"
          d={nightOverlayD}
          fill="url(#nightOverlay)"
          initial={false}
          animate={{ opacity: darkness }}
          transition={LIGHT_TRANSITION}
          pointerEvents="none"
        />

        {/* ============ 15. lamp light (above the darkness) ============ */}
        <motion.g initial={false} animate={{ opacity: lightsOn ? 1 : 0 }} transition={LIGHT_TRANSITION} pointerEvents="none">
          <ellipse cx={290} cy={306} rx={312} ry={278} fill="url(#washRadial)" />
          <path
            d="M 254,192 L 326,192 L 404,552 L 176,552 Z"
            fill="url(#coneGrad)"
            filter="url(#blurSm)"
            opacity={0.9}
          />
          <ellipse cx={292} cy={516} rx={252} ry={64} fill="url(#poolRadial)" />
          <circle cx={290} cy={198} r={64} fill="url(#glowRadial)" />
          <circle cx={290} cy={198} r={12} fill="#f6e6c6" />
          <circle cx={290} cy={197} r={8} fill="#fffaf0" />
        </motion.g>
        <motion.circle
          cx={290}
          cy={198}
          r={11}
          fill="#b8ac97"
          initial={false}
          animate={{ opacity: lightsOn ? 0 : 1 }}
          transition={LIGHT_TRANSITION}
          pointerEvents="none"
        />
        <motion.rect
          x={0}
          y={0}
          width={1200}
          height={800}
          fill="#ffcf8f"
          initial={false}
          animate={{ opacity: lightsOn ? 0.05 : 0 }}
          transition={LIGHT_TRANSITION}
          pointerEvents="none"
        />

        {/* ============ 16. handwritten prompts, close to their objects ============ */}
        <g pointerEvents="none">
          <SceneCue
            x={26}
            y={230}
            ink={hintInk}
            text={lightsOn ? 'switch off the lights to rest' : 'switch on the lights to start working'}
          />
          <SceneCue
            x={600}
            y={30}
            anchor="middle"
            ink={hintInk}
            text={curtainsOpen ? 'close the curtains and settle in' : 'open the curtains to let the daylight in'}
          />
          {!drawerOpen && (
            <SceneCue x={950} y={736} anchor="middle" size={16} ink={hintInk} text="open for a little gift" />
          )}
        </g>
      </svg>

      {/* --------------------------- the little gift --------------------------- */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="gift"
            className="absolute inset-0 z-20"
            style={{ containerType: 'size' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <button
              type="button"
              aria-label="Close the gift"
              onClick={closeGift}
              className="absolute inset-0 cursor-default bg-[#0b1224]/35"
            />

            {/* the envelope, resting at the foot of the scene */}
            <div className="absolute inset-x-0 flex justify-center" style={{ bottom: '4cqh' }}>
              <motion.div
                className="relative"
                style={{ width: '84cqh', aspectRatio: '3 / 2' }}
                initial={{ x: 80, y: 150, scale: 0.5, opacity: 0, rotate: 12 }}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
                exit={{ x: 80, y: 150, scale: 0.5, opacity: 0, rotate: 12 }}
                transition={{ type: 'spring', stiffness: 150, damping: 17 }}
                onClick={() => {
                  if (letterOut) setLetterOut(false);
                }}
              >
                <EnvelopeBody />
                <EnvelopeFlap open={!letterOut} />

                {/* the sheet is clipped by the envelope until it slides out */}
                <div
                  className="absolute inset-x-0 bottom-0 overflow-hidden"
                  style={{ height: '185%', pointerEvents: 'none', zIndex: 20 }}
                >
                  <motion.div
                    className="absolute cursor-pointer"
                    style={{
                      left: '14cqh',
                      width: '56cqh',
                      height: '66cqh',
                      bottom: '24cqh',
                      pointerEvents: 'auto',
                    }}
                    initial={false}
                    animate={{ y: letterOut ? '0%' : '90.9%' }}
                    transition={{
                      duration: letterOut ? 0.85 : 0.6,
                      ease: EASE,
                      delay: letterOut ? 0.35 : 0,
                    }}
                    onClick={() => {
                      if (window.getSelection()?.toString()) return;
                      setLetterOut(false);
                    }}
                  >
                    <LetterSheet />
                  </motion.div>
                </div>

                <EnvelopeFront sealed={!letterOut} />

                <button
                  type="button"
                  aria-label={letterOut ? 'Fold the letter back into the envelope' : 'Open the letter'}
                  onClick={() => setLetterOut((v) => !v)}
                  className="absolute inset-x-0 bottom-0 z-40 cursor-pointer rounded-b-[14px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffd79a]"
                  style={{ top: letterOut ? '56%' : 0 }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}