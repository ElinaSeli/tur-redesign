import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Page = "dashboard" | "course" | "task" | "archive-task";

// ─── Data ─────────────────────────────────────────────────────────────────────

const COURSE_TASKS = [
  {
    category: "Domácí úlohy I",
    items: [
      { id: 5, name: "Domácí úloha 5", score: 7.92, maxScore: 6.0, submitted: "27.04.2026 00:00:00", updated: "19.04.2026 12:39", deadline: "27.04.2026 11:59:59", lateDeadline: "15.05.2026 23:59:59", urgent: false },
      { id: 6, name: "Domácí úloha 6", score: 7.0, maxScore: 6.0, submitted: "28.04.2026 00:00:00", updated: "18.04.2026 10:11", deadline: "28.04.2026 11:59:59", lateDeadline: "15.05.2026 23:59:59", urgent: false },
      { id: 7, name: "Domácí úloha 7", score: 0.0, maxScore: 6.0, submitted: null, updated: null, deadline: "11.05.2026 13:11:13", lateDeadline: "18.05.2026 23:59:59", urgent: true },
    ],
  },
  {
    category: "Domácí úlohy II",
    items: [
      { id: 8, name: "Domácí úloha 8", score: 5.5, maxScore: 6.0, submitted: "30.04.2026 00:00:00", updated: "28.04.2026 15:22", deadline: "30.04.2026 11:59:59", lateDeadline: "15.05.2026 23:59:59", urgent: false },
    ],
  },
  {
    category: "Znalostní testy",
    items: [
      { id: 101, name: "Demo test 01", score: 1.0, maxScore: 1.0, submitted: "07.02.2026 00:00:00", updated: "07.02.2026 00:00:00", deadline: "14.02.2026 00:00:04", lateDeadline: null, urgent: false },
      { id: 102, name: "Demo test 02", score: null, maxScore: 1.0, submitted: null, updated: null, deadline: "14.02.2026 00:00:04", lateDeadline: null, urgent: false },
      { id: 103, name: "Demo test 03", score: null, maxScore: 1.0, submitted: null, updated: null, deadline: "19.04.2026 00:00:00", lateDeadline: null, urgent: false },
      { id: 201, name: "Test 01", score: 1.1, maxScore: 1.0, submitted: "19.02.2026 00:00:00", updated: "22.01.2026 12:16:09", deadline: "18.04.2026 00:00:00", lateDeadline: null, urgent: false },
      { id: 202, name: "Test 02", score: 1.1, maxScore: 1.0, submitted: "04.03.2026 00:00:00", updated: "18.04.2026 11:39:11", deadline: "18.04.2026 00:00:00", lateDeadline: null, urgent: false },
      { id: 203, name: "Test 03", score: 1.1, maxScore: 1.0, submitted: "25.03.2026 00:00:00", updated: "18.04.2026 11:39:11", deadline: "18.04.2026 11:23:59", lateDeadline: null, urgent: false },
    ],
  },
  {
    category: "Zkouška",
    items: [
      { id: 301, name: "Cvičení 03", score: 0.1, maxScore: 1.0, submitted: "27.01.2026 00:00:00", updated: "27.01.2026 00:00:00", deadline: "04.05.2026 11:23:13", lateDeadline: "18.05.2026 11:59:59", urgent: false },
      { id: 302, name: "Cvičení 04", score: 0.15, maxScore: 1.0, submitted: "27.01.2026 00:00:00", updated: "27.01.2026 00:00:00", deadline: "04.05.2026 11:23:13", lateDeadline: "18.05.2026 11:59:59", urgent: false },
      { id: 303, name: "Cvičení 05", score: 0.0, maxScore: 1.0, submitted: null, updated: null, deadline: "04.05.2026 11:23:13", lateDeadline: "18.05.2026 11:59:59", urgent: true },
      { id: 304, name: "Cvičení 06", score: 0.15, maxScore: 1.0, submitted: "27.01.2026 00:00:00", updated: "04.05.2026 08:00:00", deadline: "11.05.2026 11:23:13", lateDeadline: "18.05.2026 11:59:59", urgent: true },
      { id: 305, name: "Cvičení 07", score: 0.0, maxScore: 1.0, submitted: null, updated: null, deadline: "11.05.2026 11:23:13", lateDeadline: "18.05.2026 11:59:59", urgent: true },
      { id: 306, name: "Cvičení 08", score: 0.15, maxScore: 1.0, submitted: "27.01.2026 00:00:00", updated: "27.01.2026 00:00:00", deadline: "18.05.2026 11:23:13", lateDeadline: "18.05.2026 11:59:59", urgent: false },
      { id: 307, name: "Cvičení 09", score: 0.0, maxScore: 1.0, submitted: null, updated: null, deadline: "18.05.2026 11:23:13", lateDeadline: "18.05.2026 11:59:59", urgent: false },
      { id: 308, name: "Cvičení", score: 0.0, maxScore: 1.0, submitted: null, updated: null, deadline: "18.05.2026 11:59:59", lateDeadline: null, urgent: false },
      { id: 309, name: "Code review", score: 1.0, maxScore: 1.0, submitted: "10.05.2026 00:00:00", updated: "10.05.2026 00:00:00", deadline: "15.05.2026 11:09:59", lateDeadline: null, urgent: false },
    ],
  },
  {
    category: "Ostatní",
    items: [],
  },
];

// Each row: rank, isMe, scores per task, section pass (Z), totals
// Sections: DÚI (D1–D5), DÚ II (D6–D8), Znalostní testy (Q1–Q3), Zkouška (Z1–Z3), Ostatní (O1)
// null score = not submitted; Z column: true=pass, false=fail, null=pending
type ResultRow = {
  rank: number;
  isMe: boolean;
  du1: (number | null)[];  // D1-D5
  du1z: boolean | null;
  du2: (number | null)[];  // D6-D8
  du2z: boolean | null;
  qt: (number | null)[];   // Q1-Q3
  qtz: boolean | null;
  zk: (number | null)[];   // Z1-Z3
  zkz: boolean | null;
  ost: (number | null)[];  // O1
  ostz: boolean | null;
  total: number;
};

const RESULTS: ResultRow[] = [
  { rank: 1,  isMe: true,  du1: [5.5,4.5,5.0,5.0,5.0], du1z: true,  du2: [5.0,5.0,5.0], du2z: true,  qt: [1.1,1.1,1.1], qtz: true,  zk: [0.10,0.15,0.15], zkz: null, ost: [1.0], ostz: true,  total: 37.52 },
  { rank: 2,  isMe: false, du1: [5.5,4.5,5.0,5.0,5.0], du1z: true,  du2: [5.0,5.0,4.8], du2z: true,  qt: [1.1,1.1,1.0], qtz: true,  zk: [0.10,0.15,0.10], zkz: null, ost: [1.0], ostz: true,  total: 36.80 },
  { rank: 3,  isMe: false, du1: [5.0,4.5,5.0,4.5,5.0], du1z: true,  du2: [5.0,5.0,4.5], du2z: true,  qt: [0.8,1.1,1.0], qtz: true,  zk: [0.10,0.15,0.10], zkz: null, ost: [1.0], ostz: true,  total: 35.90 },
  { rank: 4,  isMe: false, du1: [4.5,4.0,5.0,4.5,5.0], du1z: true,  du2: [5.0,5.0,4.5], du2z: true,  qt: [1.0,1.1,1.0], qtz: true,  zk: [0.10,0.10,0.10], zkz: null, ost: [0.0], ostz: false, total: 34.20 },
  { rank: 5,  isMe: false, du1: [5.0,4.0,4.5,4.5,5.0], du1z: true,  du2: [5.0,5.0,4.0], du2z: true,  qt: [1.0,1.1,0.9], qtz: true,  zk: [0.15,0.10,0.10], zkz: null, ost: [0.0], ostz: false, total: 33.70 },
  { rank: 6,  isMe: false, du1: [4.5,4.0,4.5,4.0,5.0], du1z: true,  du2: [5.0,5.0,4.0], du2z: true,  qt: [0.8,0.9,0.9], qtz: true,  zk: [0.10,0.10,0.10], zkz: null, ost: [0.0], ostz: false, total: 32.40 },
  { rank: 7,  isMe: false, du1: [4.5,3.5,4.5,4.0,4.5], du1z: true,  du2: [4.5,4.5,3.5], du2z: true,  qt: [0.8,1.0,0.9], qtz: true,  zk: [0.10,0.10,0.10], zkz: null, ost: [0.0], ostz: false, total: 31.00 },
  { rank: 8,  isMe: false, du1: [4.0,4.0,4.0,4.0,4.5], du1z: true,  du2: [4.5,4.5,4.0], du2z: true,  qt: [0.8,0.9,0.8], qtz: false, zk: [0.10,0.10,0.00], zkz: null, ost: [0.0], ostz: false, total: 30.50 },
  { rank: 9,  isMe: false, du1: [4.0,3.5,4.0,3.5,4.5], du1z: true,  du2: [4.5,4.0,3.5], du2z: false, qt: [0.8,0.9,0.8], qtz: false, zk: [0.10,0.00,0.00], zkz: null, ost: [0.0], ostz: false, total: 29.10 },
  { rank: 10, isMe: false, du1: [3.5,3.5,4.0,3.5,4.0], du1z: false, du2: [4.0,4.0,3.5], du2z: false, qt: [0.7,0.8,0.7], qtz: false, zk: [0.10,0.00,0.00], zkz: null, ost: [0.0], ostz: false, total: 27.30 },
  { rank: 11, isMe: false, du1: [3.5,3.0,3.5,3.5,4.0], du1z: false, du2: [4.0,3.5,3.0], du2z: false, qt: [0.7,0.7,0.6], qtz: false, zk: [0.00,0.00,0.00], zkz: null, ost: [0.0], ostz: false, total: 25.50 },
  { rank: 12, isMe: false, du1: [3.0,3.0,3.5,3.0,4.0], du1z: false, du2: [3.5,3.5,3.0], du2z: false, qt: [0.6,0.7,0.6], qtz: false, zk: [0.00,0.00,0.00], zkz: null, ost: [0.0], ostz: false, total: 23.90 },
];

const TEST_SUBMISSIONS = [
  {
    id: 1,
    date: "18.04.2026 14:46:05",
    status: "Ohodnoceno",
    score: "7.9200",
    sections: [
      {
        title: "Hodnotitel: automat",
        overallStatus: "ok" as const,
        blocks: [
          {
            name: 'Test "Základní test s parametry podle úlohy"',
            status: "ok" as const,
            lines: [
              "  Dosaženo: 100.00 %, požadováno: 100.00 %",
              "  Celková doba běhu: 0.002 s (limit: 10.000 s)",
              "  Úspěch v zákazném testu, hodnocení: 100.00 %",
              "  [ OK ] Výsledek testu: 1.000 / 1.000",
            ],
          },
          {
            name: 'Test "Test mezních hodnot"',
            status: "ok" as const,
            lines: [
              "  Dosaženo: 100.00 %, požadováno: 100.00 %",
              "  Celková doba běhu: 0.228 s (limit: 9.998 s)",
              "  Úspěch v zákazném testu, hodnocení: 100.00 %",
              "  [ OK ] Výsledek testu: 1.000 / 1.000",
            ],
          },
          {
            name: 'Test "Test mezních hodnot 2/4"',
            status: "ok" as const,
            lines: [
              "  Dosaženo: 100.00 %, požadováno: 100.00 %",
              "  Celková doba běhu: 0.001 s (limit: 9.999 s)",
              "  [ OK ] Výsledek testu: 1.000 / 1.000",
            ],
          },
          {
            name: 'Test "Test nahrazení ID chyb s mem debugger"',
            status: "ok" as const,
            lines: [
              "  Dosaženo: 100.00 %, požadováno: 100.00 %",
              "  Celková doba běhu: 1.733 s (limit: 8.000 s)",
              "  [ OK ] Výsledek testu: 1.000 / 1.000",
            ],
          },
        ],
        summary: [
          "Celková hodnocení: 0.92 (= 1.00 * 1.00 * 0.92)",
          "Bonus za včasné odevzdání: 0.40",
          "Celkem bodů: 0.92 * 6.00 + 0.40 = 5.92",
        ],
      },
      {
        title: "SW metriky:",
        overallStatus: "ok" as const,
        blocks: [
          {
            name: "Kontrola SW metrik",
            status: "ok" as const,
            lines: [
              "  Všechny metriky v pořádku.",
              "  [ OK ] Výsledek: metrikový bonus +2.00",
            ],
          },
        ],
        summary: ["Celkový bonus za metriky: +2.00"],
      },
    ],
  },
  {
    id: 2,
    date: "18.04.2026 14:13:19",
    status: "Ohodnoceno",
    score: "0.0000",
    sections: [
      {
        title: "Hodnotitel: automat",
        overallStatus: "fail" as const,
        blocks: [
          {
            name: 'Test "Základní test s parametry podle úlohy"',
            status: "ok" as const,
            lines: [
              "  Dosaženo: 100.00 %, požadováno: 100.00 %",
              "  Celková doba běhu: 0.002 s (limit: 10.000 s)",
              "  [ OK ] Výsledek testu: 1.000 / 1.000",
            ],
          },
          {
            name: 'Test "Test mezních hodnot"',
            status: "ok" as const,
            lines: [
              "  Dosaženo: 100.00 %, požadováno: 100.00 %",
              "  Celková doba běhu: 0.133 s (limit: 9.998 s)",
              "  [ OK ] Výsledek testu: 1.000 / 1.000",
            ],
          },
          {
            name: 'Test "Test nahrazení ID chyb s mem debugger"',
            status: "fail" as const,
            lines: [
              "  Dosaženo: 91.30 %, požadováno: 100.00 %",
              "  Celková doba běhu: 0.001 s (limit: 9.999 s)",
              "  readBase(): no exception, invalid contents",
              "  [ FAIL ] Neúspěšný výstup [Zpřísněná nápověda (70 B)]",
              "  Neúspěšný výstup [27 B / 27 B]",
              "    headquarters.TacticalRoom",
            ],
          },
        ],
        summary: [
          "Celková hodnocení: 0.00 (= 1.00 * 1.00 * 0.00)",
          "Bonus za včasné odevzdání: 0.00",
          "Celkem bodů: 0.00 * 6.00 + 0.00 = 0.00",
        ],
      },
      {
        title: "SW metriky:",
        overallStatus: "fail" as const,
        blocks: [
          {
            name: "Kontrola SW metrik",
            status: "fail" as const,
            lines: [
              "  Příliš nízká úroveň modularizace.",
              "  [ FAIL ] Metrikový bonus: 0.00 (nesplněno)",
            ],
          },
        ],
        summary: ["Celkový bonus za metriky: 0.00"],
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function DeadlineBadge({ deadline, urgent }: { deadline: string; urgent: boolean }) {
  const cls = urgent
    ? "text-[#c62828] font-bold dark:text-red-400"
    : "text-[#555] dark:text-gray-400";
  return <span className={cls}>{deadline}</span>;
}

function ScoreBadge({ score, maxScore }: { score: number | null; maxScore: number }) {
  if (score === null) return <span className="text-[#999] dark:text-gray-500">—</span>;
  const pct = score / maxScore;
  const cls = pct >= 1.0
    ? "text-[#2e7d32] font-bold dark:text-green-400"
    : pct >= 0.5
    ? "text-[#1565c0] dark:text-blue-400"
    : "text-[#c62828] dark:text-red-400";
  return <span className={cls}>{score.toFixed(2)}</span>;
}

function RetroButton({
  children,
  onClick,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "primary" | "download";
  className?: string;
}) {
  const base =
    "px-3 py-1 border cursor-pointer text-sm font-medium active:translate-y-px transition-none select-none";
  const variants = {
    default:
      "bg-[#e0ddd5] border-[#999] text-black hover:bg-[#d0cdc5] dark:bg-[#21262d] dark:border-[#30363d] dark:text-[#e6edf3] dark:hover:bg-[#30363d]",
    primary:
      "bg-[#5c5c3d] border-[#3a3a25] text-white hover:bg-[#4a4a30] dark:bg-[#238636] dark:border-[#2ea043] dark:text-white dark:hover:bg-[#2ea043]",
    download:
      "bg-[#1565c0] border-[#0d47a1] text-white hover:bg-[#0d47a1] dark:bg-[#1f6feb] dark:border-[#388bfd] dark:text-white dark:hover:bg-[#388bfd]",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

// ─── Test Result Renderer ─────────────────────────────────────────────────────

function TestLine({ line }: { line: string }) {
  const trimmed = line.trim();
  if (trimmed.includes("[ OK ]")) {
    return (
      <div className="font-mono text-xs leading-5">
        <span className="text-[#2e7d32] dark:text-green-400">{line}</span>
      </div>
    );
  }
  if (trimmed.includes("[ FAIL ]") || trimmed.startsWith("error:") || trimmed.includes("error C") || trimmed.includes("undefined reference")) {
    return (
      <div className="font-mono text-xs leading-5">
        <span className="text-[#c62828] font-bold dark:text-red-400">{line}</span>
      </div>
    );
  }
  return <div className="font-mono text-xs leading-5 text-[#333] dark:text-[#cdd9e5]">{line}</div>;
}

function TestBlock({
  block,
}: {
  block: { name: string; status: "ok" | "fail"; lines: string[] };
}) {
  const [open, setOpen] = useState(block.status === "fail");

  return (
    <div className="border border-[#ccc] dark:border-[#30363d] mb-1">
      <button
        className={`w-full text-left flex items-center justify-between px-2 py-1 text-xs font-mono cursor-pointer
          ${block.status === "ok"
            ? "bg-[#e8f5e9] text-[#2e7d32] dark:bg-[#0d2614] dark:text-[#3fb950]"
            : "bg-[#ffebee] text-[#c62828] dark:bg-[#2d0f0f] dark:text-[#f85149]"
          }`}
        onClick={() => setOpen((v) => !v)}
      >
        <span>
          {open ? "▼" : "▶"}&nbsp;
          {block.name}
          {block.status === "ok" ? " — Úspěch" : " — NEÚSPĚCH"}
        </span>
        <span>{block.status === "ok" ? "[ OK ]" : "[ FAIL ]"}</span>
      </button>
      {open && (
        <div className="bg-[#f8f8f8] dark:bg-[#0d1117] px-3 py-1 border-t border-[#ccc] dark:border-[#30363d]">
          {block.lines.map((ln, i) => (
            <TestLine key={i} line={ln} />
          ))}
        </div>
      )}
    </div>
  );
}

function SubmissionCard({ sub }: { sub: (typeof TEST_SUBMISSIONS)[0] }) {
  const [open, setOpen] = useState(true);
  const isFail = sub.score === "0.0000" || sub.sections.some(s => s.overallStatus === "fail");

  return (
    <div className="border border-[#999] dark:border-[#30363d] mb-3">
      <div
        className={`flex items-center justify-between px-3 py-1 cursor-pointer
          ${isFail
            ? "bg-[#c62828] text-white dark:bg-[#7a1515]"
            : "bg-[#5c5c3d] text-white dark:bg-[#161b22] dark:border-b dark:border-[#30363d]"
          }`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-mono text-sm font-bold">
          {open ? "▼" : "▶"} {sub.date} — Hodnocení: {sub.score}
        </span>
        <div className="flex gap-2 items-center">
          <span className="text-xs opacity-80">{sub.status}</span>
          <RetroButton variant="download" onClick={(e) => { e?.stopPropagation(); }}>
            ⬇ Stáhnout řešení
          </RetroButton>
        </div>
      </div>

      {open && (
        <div className="p-3 bg-[#f8f8f8] dark:bg-[#0d1117]">
          <div className="mb-2 text-sm">
            <span className="text-[#555] dark:text-gray-400">Stav odevzdání: </span>
            <span className="font-semibold text-black dark:text-[#e6edf3]">{sub.status}</span>
            <span className="mx-3 text-[#555] dark:text-gray-400">Hodnocení: </span>
            <span className={`font-bold ${parseFloat(sub.score) > 0 ? "text-[#2e7d32] dark:text-green-400" : "text-[#c62828] dark:text-red-400"}`}>
              {sub.score}
            </span>
          </div>

          {sub.sections.map((section, si) => (
            <div key={si} className="mb-3">
              <div className="text-xs font-bold text-[#555] dark:text-gray-400 mb-1 uppercase tracking-wide">
                {section.title}
              </div>
              {section.blocks.map((block, bi) => (
                <TestBlock key={bi} block={block} />
              ))}
              <div className="mt-1 pl-2 border-l-2 border-[#ccc] dark:border-[#30363d]">
                {section.summary.map((line, li) => (
                  <div key={li} className="font-mono text-xs text-[#555] dark:text-gray-400">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function DashboardPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="p-4 max-w-2xl">
      <h2 className="text-base font-bold mb-3 text-black dark:text-[#e6edf3]">
        Přehled předmětů
      </h2>

      {/* UX Improvement 1: Active Semester Highlight */}
      <div className="border-2 border-[#2e7d32] bg-[#f0fff0] dark:bg-[#0d2614] dark:border-[#3fb950] p-3 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#2e7d32] dark:bg-[#3fb950] dark:text-black px-2 py-0.5">
            Aktivní semestr
          </span>
          <span className="font-bold text-sm text-black dark:text-[#e6edf3]">Letní 2025/2026</span>
        </div>
        <div className="pl-3">
          <button
            className="flex items-center gap-2 w-full text-left group"
            onClick={() => navigate("course")}
          >
            <span className="text-base">📚</span>
            <span className="border border-[#999] dark:border-[#30363d] bg-[#e0ddd5] dark:bg-[#21262d] px-3 py-1 text-sm text-black dark:text-[#e6edf3] hover:bg-[#d0cdc5] dark:hover:bg-[#30363d] w-40 text-left">
              BI-PA2
            </span>
            <span className="text-xs text-[#555] dark:text-gray-400 group-hover:underline">
              Programování a algoritmizace II — 25/26 LS
            </span>
          </button>
        </div>
      </div>

      {/* UX Improvement 1: Archive accordion */}
      <details className="mb-3 border border-[#ccc] dark:border-[#30363d]">
        <summary className="px-3 py-2 bg-[#e8e8e8] dark:bg-[#21262d] cursor-pointer text-sm font-semibold text-black dark:text-[#e6edf3] select-none hover:bg-[#ddd] dark:hover:bg-[#30363d] list-none flex items-center gap-1">
          <span>▶</span>
          <span>Starší semestry (Archiv)</span>
        </summary>
        <div className="p-3 bg-[#f8f8f8] dark:bg-[#0d1117]">
          {[
            { semester: "Zimní 2025/2026", courses: ["BI-AAG", "BI-OSY"] },
            { semester: "Letní 2024/2025", courses: ["BI-PA1", "BI-ZDM"] },
            { semester: "Zimní 2024/2025", courses: ["BI-MA1", "BI-LA1"] },
          ].map(({ semester, courses }) => (
            <div key={semester} className="mb-2">
              <div className="text-xs font-semibold text-[#555] dark:text-gray-400 mb-1">{semester}</div>
              <div className="pl-3 flex flex-col gap-1">
                {courses.map((c) => (
                  <button
                    key={c}
                    className="flex items-center gap-2 text-left group"
                    onClick={() => navigate("archive-task")}
                  >
                    <span className="text-base">📗</span>
                    <span className="border border-[#999] dark:border-[#30363d] bg-[#e0ddd5] dark:bg-[#21262d] px-3 py-0.5 text-sm text-[#0000cc] dark:text-[#58a6ff] hover:underline w-32 text-left">
                      {c}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </details>

      {/* Tools section */}
      <div className="mb-2">
        <div className="text-sm font-bold text-black dark:text-[#e6edf3] mb-2">▼ Nástroje</div>
        <div className="pl-3 flex flex-col gap-1">
          {[
            { icon: "⚙️", label: "Nastavení" },
            { icon: "🔧", label: "Překladače" },
            { icon: "❓", label: "FAQ" },
          ].map(({ icon, label }) => (
            <button
              key={label}
              className="flex items-center gap-2 border border-[#999] dark:border-[#30363d] bg-[#e0ddd5] dark:bg-[#21262d] px-3 py-1 text-sm text-black dark:text-[#e6edf3] hover:bg-[#d0cdc5] dark:hover:bg-[#30363d] w-44 text-left"
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ZCell({ z }: { z: boolean | null }) {
  if (z === null) return <td className="border border-[#ccc] dark:border-[#30363d] px-1 py-0.5 text-center text-[#999] bg-[#f8f8f8] dark:bg-[#161b22] dark:text-gray-600">·</td>;
  return z
    ? <td className="border border-[#ccc] dark:border-[#30363d] px-1 py-0.5 text-center bg-[#e8f5e9] dark:bg-[#0d2614] text-[#2e7d32] dark:text-green-400 font-bold">✓</td>
    : <td className="border border-[#ccc] dark:border-[#30363d] px-1 py-0.5 text-center bg-[#ffebee] dark:bg-[#2d0f0f] text-[#c62828] dark:text-red-400 font-bold">✗</td>;
}

function ScoreCell({ v, isMe }: { v: number | null; isMe: boolean }) {
  if (v === null) return <td className="border border-[#ccc] dark:border-[#30363d] px-1.5 py-0.5 text-right text-[#bbb] dark:text-gray-600">—</td>;
  const low = v < 3.0;
  const cls = isMe
    ? low
      ? "bg-[#ffebee] dark:bg-[#2d0f0f] text-[#c62828] dark:text-red-400 font-bold"
      : "bg-[#e3f2fd] dark:bg-[#0a2540] text-[#1565c0] dark:text-blue-300"
    : low
      ? "text-[#c62828] dark:text-red-400"
      : "text-[#333] dark:text-[#cdd9e5]";
  return <td className={`border border-[#ccc] dark:border-[#30363d] px-1.5 py-0.5 text-right tabular-nums ${cls}`}>{v.toFixed(2)}</td>;
}

function CoursePage({
  navigate,
  activeTab,
  setActiveTab,
}: {
  navigate: (p: Page) => void;
  activeTab: string;
  setActiveTab: (t: string) => void;
}) {
  const tabs = ["Zadání", "Výsledky"];

  return (
    <div className="p-4">
      {/* Tab bar */}
      <div className="flex border-b border-[#999] dark:border-[#30363d] mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 text-sm border-t border-l border-r border-[#999] dark:border-[#30363d] -mb-px
              ${activeTab === tab
                ? "bg-white dark:bg-[#0d1117] font-bold text-black dark:text-[#e6edf3] border-b-white dark:border-b-[#0d1117]"
                : "bg-[#e0ddd5] dark:bg-[#161b22] text-[#555] dark:text-gray-400 hover:bg-[#d0cdc5] dark:hover:bg-[#21262d]"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Zadání" && (
        <div>
          {COURSE_TASKS.filter(g => g.items.length > 0).map((group) => (
            <div key={group.category} className="mb-4">
              <div className="bg-[#5c5c3d] dark:bg-[#21262d] text-white dark:text-[#e6edf3] px-3 py-1 text-sm font-bold border border-[#3a3a25] dark:border-[#30363d] mb-0">
                ▼ {group.category}
              </div>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#e0ddd5] dark:bg-[#161b22]">
                    <th className="border border-[#ccc] dark:border-[#30363d] px-2 py-1 text-left font-semibold w-48">Úloha</th>
                    <th className="border border-[#ccc] dark:border-[#30363d] px-2 py-1 text-right font-semibold w-24">Hodnocení</th>
                    <th className="border border-[#ccc] dark:border-[#30363d] px-2 py-1 text-left font-semibold">Přidáno</th>
                    <th className="border border-[#ccc] dark:border-[#30363d] px-2 py-1 text-left font-semibold">Řádný termín</th>
                    <th className="border border-[#ccc] dark:border-[#30363d] px-2 py-1 text-left font-semibold">Pozdní odevzdání</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((task) => (
                    <tr
                      key={task.id}
                      className="hover:bg-[#e8f0fe] dark:hover:bg-[#1c2128] cursor-pointer"
                      onClick={() => navigate("task")}
                    >
                      <td className="border border-[#ccc] dark:border-[#30363d] px-2 py-1">
                        <span className="mr-1 text-base">{task.submitted ? "✅" : "📋"}</span>
                        <button className="text-[#0000cc] dark:text-[#58a6ff] hover:underline text-left">
                          {task.name}
                        </button>
                      </td>
                      <td className="border border-[#ccc] dark:border-[#30363d] px-2 py-1 text-right">
                        <ScoreBadge score={task.score} maxScore={task.maxScore} />
                        <span className="text-[#999] dark:text-gray-500 text-xs"> / {task.maxScore}</span>
                      </td>
                      <td className="border border-[#ccc] dark:border-[#30363d] px-2 py-1 text-xs text-[#555] dark:text-gray-400">
                        {task.submitted ?? "—"}
                      </td>
                      <td className="border border-[#ccc] dark:border-[#30363d] px-2 py-1 text-xs">
                        <DeadlineBadge deadline={task.deadline} urgent={task.urgent} />
                      </td>
                      <td className="border border-[#ccc] dark:border-[#30363d] px-2 py-1 text-xs">
                        {task.lateDeadline
                          ? <span className="text-[#c62828] dark:text-red-400">{task.lateDeadline}</span>
                          : <span className="text-[#999]">—</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Výsledky" && (
        <div className="overflow-x-auto">
          <p className="text-xs text-[#555] dark:text-gray-400 mb-2">
            BI-PA2 — Letní semestr 2025/2026 · Jména ostatních studentů jsou skryta.
            Sloupec <strong>Z</strong> označuje splnění sekce (zápočet).
          </p>
          <table className="border-collapse text-xs min-w-max">
            <thead>
              {/* Group header row */}
              <tr className="bg-[#5c5c3d] dark:bg-[#1c2128] text-white dark:text-[#e6edf3]">
                <th rowSpan={2} className="border border-[#3a3a25] dark:border-[#30363d] px-2 py-1 text-center">#</th>
                <th rowSpan={2} className="border border-[#3a3a25] dark:border-[#30363d] px-3 py-1 text-left min-w-[130px]">Jméno studenta</th>
                <th colSpan={6} className="border border-[#3a3a25] dark:border-[#30363d] px-2 py-1 text-center">Domácí úlohy I</th>
                <th colSpan={4} className="border border-[#3a3a25] dark:border-[#30363d] px-2 py-1 text-center">Domácí úlohy II</th>
                <th colSpan={4} className="border border-[#3a3a25] dark:border-[#30363d] px-2 py-1 text-center">Znalostní testy</th>
                <th colSpan={4} className="border border-[#3a3a25] dark:border-[#30363d] px-2 py-1 text-center">Zkouška</th>
                <th colSpan={2} className="border border-[#3a3a25] dark:border-[#30363d] px-2 py-1 text-center">Ostatní</th>
                <th rowSpan={2} className="border border-[#3a3a25] dark:border-[#30363d] px-2 py-1 text-center">Σ</th>
              </tr>
              <tr className="bg-[#6b6b48] dark:bg-[#21262d] text-white dark:text-[#cdd9e5]">
                {["D1","D2","D3","D4","D5","Z","D6","D7","D8","Z","Q1","Q2","Q3","Z","Cv1","Cv2","Cv3","Z","O1","Z"].map((h, i) => (
                  <th key={i} className={`border border-[#3a3a25] dark:border-[#30363d] px-1.5 py-0.5 text-center ${h === "Z" ? "bg-[#4a4a30] dark:bg-[#30363d] font-bold" : ""}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RESULTS.map((row, i) => {
                const bg = row.isMe
                  ? "bg-[#fff9c4] dark:bg-[#2a2400]"
                  : i % 2 === 0 ? "bg-white dark:bg-[#0d1117]" : "bg-[#f4f4f4] dark:bg-[#161b22]";
                return (
                  <tr key={row.rank} className={`${bg} hover:brightness-95`}>
                    <td className="border border-[#ddd] dark:border-[#30363d] px-2 py-0.5 text-center text-[#555] dark:text-gray-400">
                      {row.rank}.
                    </td>
                    <td className="border border-[#ddd] dark:border-[#30363d] px-2 py-0.5 font-semibold">
                      {row.isMe
                        ? <span className="text-[#0000cc] dark:text-[#58a6ff]">Salkanova Elina (seliveli)</span>
                        : <span className="text-[#999] dark:text-gray-600 italic">student</span>
                      }
                    </td>
                    {row.du1.map((v, j) => <ScoreCell key={`du1-${j}`} v={v} isMe={row.isMe} />)}
                    <ZCell z={row.du1z} />
                    {row.du2.map((v, j) => <ScoreCell key={`du2-${j}`} v={v} isMe={row.isMe} />)}
                    <ZCell z={row.du2z} />
                    {row.qt.map((v, j) => <ScoreCell key={`qt-${j}`} v={v} isMe={row.isMe} />)}
                    <ZCell z={row.qtz} />
                    {row.zk.map((v, j) => <ScoreCell key={`zk-${j}`} v={v} isMe={row.isMe} />)}
                    <ZCell z={row.zkz} />
                    {row.ost.map((v, j) => <ScoreCell key={`ost-${j}`} v={v} isMe={row.isMe} />)}
                    <ZCell z={row.ostz} />
                    <td className="border border-[#ddd] dark:border-[#30363d] px-2 py-0.5 text-right font-bold tabular-nums text-[#2e7d32] dark:text-green-400">
                      {row.total.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function TaskPage({ navigate }: { navigate: (p: Page) => void }) {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="p-4 max-w-4xl">
      {/* Task metadata table */}
      <table className="w-full border-collapse text-sm mb-4">
        <tbody>
          {[
            ["Termín odevzdání:", "27.04.2026 11:59:59"],
            ["Pozdní odevzdání s penalizací:", <span className="text-[#c62828] dark:text-red-400 font-bold">15.05.2026 23:59:59 (Penále za pozdní odevzdání: 100.00 %)</span>],
            ["Hodnocení:", <span className="font-bold text-[#2e7d32] dark:text-green-400">7.9200</span>],
            ["Nominální počet bodů:", "6.0000 (bez bonusu)"],
            ["Odevzdaná řešení:", "4 / 30 + 20"],
          ].map(([label, value], i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-[#e8e8e8] dark:bg-[#161b22]" : "bg-white dark:bg-[#0d1117]"}>
              <td className="border border-[#ccc] dark:border-[#30363d] px-3 py-1 font-semibold w-64 text-black dark:text-[#e6edf3]">{label}</td>
              <td className="border border-[#ccc] dark:border-[#30363d] px-3 py-1 text-black dark:text-[#e6edf3]">{value}</td>
            </tr>
          ))}
          <tr className="bg-[#2e7d32]">
            <td className="border border-[#1b5e20] px-3 py-1 font-bold text-white">Vybraná / zadaná úloha:</td>
            <td className="border border-[#1b5e20] px-3 py-1 font-bold text-white">
              Vojenská základna
              <span className="ml-4 text-xs opacity-75 font-normal">Tgr #3160</span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Two-column layout: description + UX Improvement 2: template download box */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1 text-sm text-black dark:text-[#e6edf3] leading-6">
          <p className="mb-2">
            Úkolem je realizovat třídy, které implementují analýzu logů. Předpokládáme vojenskou základnu. Ta je uvnitř rozdělena na zóny. Každá zóna má své jméno — řetězec. Mezi některými zónami existují brány.
          </p>
          <p className="mb-2">
            Implementujte třídu dostupnou z testovaného souboru s podporou formátu log big-endian a nechť pracuje s entitami, které mají přiřadit více než 1.
          </p>
          <p className="mb-2">
            Vojenská základna je organizovaná v sítích, jejichž argument sousedů je posupně posílaný k jinému podsystému záznamu. Brána zaznamenaná přicházejícímu do logu.
          </p>
          <details className="mt-2">
            <summary className="cursor-pointer text-[#0000cc] dark:text-[#58a6ff] hover:underline text-sm select-none">
              Zobrazit celé zadání...
            </summary>
            <div className="mt-2 p-3 border border-[#ccc] dark:border-[#30363d] bg-[#f8f8f8] dark:bg-[#161b22]">
              <p className="mb-2">Soubor s popsaným zápisem je testovaný a je Dodin až na jednu informaci:</p>
              <p className="font-mono text-xs mb-1">getEntries</p>
              <p className="font-mono text-xs mb-1">printEntries</p>
              <p className="font-mono text-xs mb-1">loadEntries</p>
              <p className="font-mono text-xs mb-1">getEntries</p>
              <p className="mt-2">Kde záznamy začínají každý ředitel návodem. Formát záznamu log doválení:</p>
              <ul className="list-disc ml-5 mt-1 text-xs">
                <li>TEXT: záznam je formátu M:N, kde M je číslo (bez diakritiky).</li>
                <li>Neúspěšný test požaduje správný výpočet pro příchozí.</li>
                <li>Dočasná a čas množství v logu jsou konstantní při simulaci a pochopení.</li>
              </ul>
            </div>
          </details>
        </div>

        {/* UX Improvement 2: Template download box */}
        <div className="w-64 shrink-0">
          <div className="border-2 border-[#4a90d9] bg-[#e8f0fe] dark:bg-[#0f2a4a] dark:border-[#388bfd] p-3">
            <div className="text-xs font-bold text-[#1565c0] dark:text-[#58a6ff] uppercase tracking-wide mb-2">
              📦 Šablona / Starter Pack
            </div>
            <p className="text-xs text-[#333] dark:text-gray-400 mb-3 leading-5">
              Stáhněte si kostru zadání se soubory <code className="bg-[#d0e0f8] dark:bg-[#1f3a5f] px-1 font-mono">.h</code> a vzorový vstup pro lokální testování.
            </p>
            <RetroButton variant="download" className="w-full justify-center text-center">
              ⬇ Stáhnout šablonu (Starter Pack)
            </RetroButton>
            <div className="mt-2 text-[10px] text-[#555] dark:text-gray-500">
              Archiv obsahuje: zadani.pdf, sample_input.txt, template.h
            </div>
          </div>

          <div className="border border-[#ccc] dark:border-[#30363d] bg-[#f8f8f8] dark:bg-[#161b22] p-2 mt-2">
            <div className="text-xs font-bold text-[#555] dark:text-gray-400 mb-1">Nápovědy:</div>
            <ul className="text-xs text-[#555] dark:text-gray-400 list-disc ml-3 leading-5">
              <li>1 / 2 Volné nápovědy</li>
              <li>2 Penalizované nápovědy (−10 % za každou)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* UX Improvement 2: Horizontal rule separator before submission */}
      <hr className="border-t-2 border-[#999] dark:border-[#30363d] my-5" />

      {/* Submission form */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-black dark:text-[#e6edf3] mb-3">
          Odevzdání řešení
        </h3>

        <div className="flex gap-4 items-start mb-3">
          <div className="flex-1">
            <div className="text-xs text-[#555] dark:text-gray-400 mb-1">Vzorová data:</div>
            <input
              type="text"
              readOnly
              value="sample_input.txt"
              className="border border-[#999] dark:border-[#30363d] bg-white dark:bg-[#0d1117] text-black dark:text-[#e6edf3] px-2 py-1 text-sm w-full"
            />
          </div>
          <div className="flex-1">
            <div className="text-xs text-[#555] dark:text-gray-400 mb-1">Odevzdání:</div>
            <div className="flex gap-2">
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)} />
                <span className="border border-[#999] dark:border-[#30363d] bg-[#e0ddd5] dark:bg-[#21262d] px-3 py-1 text-sm text-black dark:text-[#e6edf3] hover:bg-[#d0cdc5] dark:hover:bg-[#30363d] cursor-pointer">
                  Vybrat soubor
                </span>
                <span className="text-xs text-[#555] dark:text-gray-400">{fileName ?? "Soubor nevybrán"}</span>
              </label>
            </div>
          </div>
          <RetroButton variant="primary" onClick={() => setShowConfirm(true)}>
            ✉ Odevzdat
          </RetroButton>
        </div>

        {/* Drag and drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files[0];
            if (f) setFileName(f.name);
          }}
          className={`border-2 border-dashed text-center py-6 text-sm transition-colors
            ${dragging
              ? "border-[#1565c0] bg-[#e8f0fe] dark:border-[#388bfd] dark:bg-[#0f2a4a]"
              : "border-[#aaa] dark:border-[#30363d] bg-[#f8f8f8] dark:bg-[#161b22] text-[#777] dark:text-gray-500"
            }`}
        >
          {fileName
            ? <span className="text-[#2e7d32] dark:text-green-400 font-semibold">📎 {fileName}</span>
            : <span>Přetáhněte soubor sem, nebo použijte tlačítko <em>Vybrat soubor</em> výše</span>
          }
          <div className="text-xs mt-1 text-[#999] dark:text-gray-600">
            Podporované formáty: .cpp, .h, .zip, .tar.gz
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#161b22] border-2 border-[#999] dark:border-[#30363d] p-5 max-w-sm w-full shadow-xl">
            <div className="font-bold text-sm mb-3 text-black dark:text-[#e6edf3]">
              ⚠ Potvrdit odevzdání
            </div>
            <p className="text-sm text-[#333] dark:text-gray-400 mb-4">
              Opravdu chcete odevzdat soubor <strong>{fileName ?? "—"}</strong> jako řešení úlohy{" "}
              <strong>Vojenská základna</strong>?
            </p>
            <div className="flex gap-2 justify-end">
              <RetroButton onClick={() => setShowConfirm(false)}>Zrušit</RetroButton>
              <RetroButton variant="primary" onClick={() => setShowConfirm(false)}>
                ✉ Potvrdit odevzdání
              </RetroButton>
            </div>
          </div>
        </div>
      )}

      {/* Test results */}
      <hr className="border-t-2 border-[#999] dark:border-[#30363d] my-5" />
      <h3 className="text-sm font-bold text-black dark:text-[#e6edf3] mb-3">
        Referenční řešení &amp; výsledky hodnocení
      </h3>

      {TEST_SUBMISSIONS.map((sub) => (
        <SubmissionCard key={sub.id} sub={sub} />
      ))}
    </div>
  );
}

function ArchiveTaskPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div>
      {/* UX Improvement 4: Archive Banner */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-4 py-2 bg-[#ffff88] border-b-2 border-[#cc9900] text-black text-sm">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">⚠</span>
          <span>
            <strong>Archivní zobrazení.</strong> Prohlížíte historické odevzdání z minulého semestru.
            Hodnocení ani termíny již nejsou aktivní.
          </span>
        </div>
        <button
          onClick={() => navigate("task")}
          className="border border-[#cc9900] bg-white hover:bg-[#ffffc0] px-3 py-0.5 text-sm font-semibold whitespace-nowrap"
        >
          ← Zpět na aktivní úlohu
        </button>
      </div>

      <div className="p-4 max-w-4xl">
        <div className="border border-[#cc9900] bg-[#fffff0] dark:bg-[#2a2400] dark:border-[#856404] p-2 mb-4 text-sm text-[#555] dark:text-yellow-200">
          Toto odevzdání pochází ze semestru <strong>Letní 2024/2025</strong>.
          Zobrazené hodnocení je konečné a nelze je měnit.
        </div>

        <table className="w-full border-collapse text-sm mb-4">
          <tbody>
            {[
              ["Předmět:", "BI-PA1 — Programování a algoritmizace I"],
              ["Úloha:", "Zásobník a fronta"],
              ["Semestr:", "Letní 2024/2025"],
              ["Termín odevzdání:", "15.04.2025 23:59:59"],
              ["Výsledné hodnocení:", <span className="font-bold text-[#2e7d32] dark:text-green-400">5.40</span>],
            ].map(([label, value], i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-[#e8e8e8] dark:bg-[#161b22]" : "bg-white dark:bg-[#0d1117]"}>
                <td className="border border-[#ccc] dark:border-[#30363d] px-3 py-1 font-semibold w-64 text-black dark:text-[#e6edf3]">{label}</td>
                <td className="border border-[#ccc] dark:border-[#30363d] px-3 py-1 text-black dark:text-[#e6edf3]">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr className="border-t-2 border-[#999] dark:border-[#30363d] my-5" />
        <h3 className="text-sm font-bold text-black dark:text-[#e6edf3] mb-3">Výsledky hodnocení (archiv)</h3>

        <div className="border border-[#999] dark:border-[#30363d] mb-3">
          <div className="flex items-center justify-between px-3 py-1 bg-[#5c5c3d] dark:bg-[#161b22] text-white">
            <span className="font-mono text-sm font-bold">▼ 15.04.2025 22:14:09 — Hodnocení: 5.4000</span>
            <RetroButton variant="download">⬇ Stáhnout archivní řešení</RetroButton>
          </div>
          <div className="p-3 bg-[#f8f8f8] dark:bg-[#0d1117]">
            <div className="mb-1 text-sm">
              <span className="text-[#555] dark:text-gray-400">Stav: </span>
              <span className="font-semibold">Ohodnoceno (archiv)</span>
              <span className="mx-3 text-[#555] dark:text-gray-400">Hodnocení: </span>
              <span className="font-bold text-[#2e7d32] dark:text-green-400">5.4000</span>
            </div>
            <div className="border border-[#ccc] dark:border-[#30363d] mb-1">
              <div className="bg-[#e8f5e9] dark:bg-[#0d2614] text-[#2e7d32] dark:text-[#3fb950] px-2 py-1 text-xs font-mono flex justify-between">
                <span>▶ Test "Základní funkčnost zásobníku" — Úspěch</span>
                <span>[ OK ]</span>
              </div>
            </div>
            <div className="border border-[#ccc] dark:border-[#30363d] mb-1">
              <div className="bg-[#e8f5e9] dark:bg-[#0d2614] text-[#2e7d32] dark:text-[#3fb950] px-2 py-1 text-xs font-mono flex justify-between">
                <span>▶ Test "Základní funkčnost fronty" — Úspěch</span>
                <span>[ OK ]</span>
              </div>
            </div>
            <div className="border border-[#ccc] dark:border-[#30363d] mb-1">
              <div className="bg-[#e8f5e9] dark:bg-[#0d2614] text-[#2e7d32] dark:text-[#3fb950] px-2 py-1 text-xs font-mono flex justify-between">
                <span>▶ Test "Paměťové nároky" — Úspěch</span>
                <span>[ OK ]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  page,
  navigate,
}: {
  page: Page;
  navigate: (p: Page) => void;
}) {
  return (
    <div className="w-48 shrink-0 border-r border-[#999] dark:border-[#30363d] bg-[#e0ddd5] dark:bg-[#0d1117] p-2 min-h-full">
      <div className="text-xs font-bold text-[#555] dark:text-gray-500 uppercase tracking-wider mb-2 px-1">
        Navigace
      </div>

      {/* Active semester */}
      <div className="mb-1">
        <div
          className="flex items-center gap-1 text-xs font-bold text-black dark:text-[#e6edf3] px-1 py-0.5 cursor-pointer"
          onClick={() => navigate("dashboard")}
        >
          <span>▼</span> Letní 2025/2026
        </div>
        <div className="pl-4">
          <button
            onClick={() => navigate("course")}
            className={`flex items-center gap-1.5 w-full text-left px-2 py-0.5 text-xs border mb-0.5
              ${page === "course" || page === "task"
                ? "border-[#5c5c3d] dark:border-[#58a6ff] bg-[#d0cdc5] dark:bg-[#21262d] font-bold"
                : "border-[#999] dark:border-[#30363d] bg-[#e8e6de] dark:bg-[#161b22] hover:bg-[#d0cdc5] dark:hover:bg-[#21262d]"
              } text-black dark:text-[#e6edf3]`}
          >
            <span>📚</span> BI-PA2
          </button>
        </div>
      </div>

      {/* Older semesters */}
      <details className="mb-1">
        <summary className="text-xs font-bold text-[#555] dark:text-gray-500 px-1 py-0.5 cursor-pointer select-none list-none flex items-center gap-1 hover:text-black dark:hover:text-[#e6edf3]">
          <span>▶</span> Starší semestry
        </summary>
        <div className="pl-3 pt-1">
          {["Zimní 25/26", "Letní 24/25", "Zimní 24/25"].map((s) => (
            <button
              key={s}
              onClick={() => navigate("archive-task")}
              className="block w-full text-left text-xs text-[#0000cc] dark:text-[#58a6ff] hover:underline py-0.5 px-1"
            >
              {s}
            </button>
          ))}
        </div>
      </details>

      <div className="border-t border-[#aaa] dark:border-[#30363d] my-2" />

      {/* Tools */}
      <div className="text-xs font-bold text-[#555] dark:text-gray-500 px-1 mb-1">▼ Nástroje</div>
      {[
        { icon: "⚙️", label: "Nastavení" },
        { icon: "🔧", label: "Překladače" },
        { icon: "❓", label: "FAQ" },
      ].map(({ icon, label }) => (
        <button
          key={label}
          className="flex items-center gap-1.5 w-full text-left px-2 py-0.5 text-xs border border-[#999] dark:border-[#30363d] bg-[#e8e6de] dark:bg-[#161b22] hover:bg-[#d0cdc5] dark:hover:bg-[#21262d] mb-0.5 text-black dark:text-[#e6edf3]"
        >
          <span>{icon}</span> {label}
        </button>
      ))}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");
  const [activeTab, setActiveTab] = useState("Zadání");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const breadcrumb: { label: string; page?: Page }[] = [
    { label: "ProgTest", page: "dashboard" },
    ...(page === "course" || page === "task"
      ? [{ label: "BI-PA2 (25/26 LS)", page: "course" as Page }]
      : []),
    ...(page === "task" ? [{ label: "Domácí úloha 5" }] : []),
    ...(page === "archive-task" ? [{ label: "BI-PA1 (24/25 LS)" }, { label: "Zásobník a fronta (archiv)" }] : []),
  ];

  return (
    <div className="min-h-screen bg-[#f0f0f0] dark:bg-[#0d1117] font-[system-ui,-apple-system,sans-serif] text-sm">
      {/* Header */}
      <header className="flex items-center justify-between px-3 py-0 h-9 bg-[#5c5c3d] dark:bg-[#161b22] border-b-2 border-[#3a3a25] dark:border-[#30363d] sticky top-0 z-30">
        <div className="flex items-center gap-1 text-white text-sm">
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span className="opacity-60 text-xs">▶</span>}
              {crumb.page ? (
                <button
                  onClick={() => setPage(crumb.page!)}
                  className="hover:underline font-bold"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="font-bold">{crumb.label}</span>
              )}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="border border-[#8a8a60] dark:border-[#30363d] bg-[#6b6b48] dark:bg-[#21262d] text-white dark:text-[#e6edf3] px-2 py-0.5 text-xs hover:bg-[#7a7a55] dark:hover:bg-[#30363d] transition-colors"
            title="Zobrazit / skrýt navigaci"
          >
            {sidebarOpen ? "◀ Skrýt navigaci" : "▶ Navigace"}
          </button>
          <button
            onClick={() => setDarkMode((d) => !d)}
            className="border border-[#8a8a60] dark:border-[#30363d] bg-[#6b6b48] dark:bg-[#21262d] text-white dark:text-[#e6edf3] px-2 py-0.5 text-xs hover:bg-[#7a7a55] dark:hover:bg-[#30363d] transition-colors"
            title="Přepnout tmavý / světlý režim"
          >
            {darkMode ? "☀ Světlý režim" : "🌙 Tmavý režim"}
          </button>
          <button className="border border-[#8a8a60] dark:border-[#30363d] bg-[#6b6b48] dark:bg-[#21262d] text-white px-3 py-0.5 text-xs hover:bg-[#7a7a55] dark:hover:bg-[#30363d]">
            Odhlásit
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex min-h-[calc(100vh-36px)]">
        {sidebarOpen && <Sidebar page={page} navigate={setPage} />}

        <main className="flex-1 overflow-auto bg-[#f0f0f0] dark:bg-[#0d1117]">
          {page === "dashboard" && <DashboardPage navigate={setPage} />}
          {page === "course" && (
            <CoursePage navigate={setPage} activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
          {page === "task" && <TaskPage navigate={setPage} />}
          {page === "archive-task" && <ArchiveTaskPage navigate={setPage} />}
        </main>
      </div>
    </div>
  );
}
