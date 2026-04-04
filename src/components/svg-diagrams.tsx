"use client";

/* ── Reusable SVG primitives for course diagrams ──────── */

const COLORS = {
  bg: "#09090b",
  border: "#27272a",
  text: "#a1a1aa",
  textBright: "#e4e4e7",
  accent: "#10b981",
  accentDim: "#10b98133",
  violet: "#8b5cf6",
  violetDim: "#8b5cf633",
  cyan: "#06b6d4",
  cyanDim: "#06b6d433",
  amber: "#f59e0b",
  amberDim: "#f59e0b33",
  rose: "#f43f5e",
  roseDim: "#f43f5e33",
};

type Color = "accent" | "violet" | "cyan" | "amber" | "rose" | "default";

function getColor(c: Color) {
  if (c === "accent") return { fill: COLORS.accentDim, stroke: COLORS.accent, text: COLORS.accent };
  if (c === "violet") return { fill: COLORS.violetDim, stroke: COLORS.violet, text: COLORS.violet };
  if (c === "cyan") return { fill: COLORS.cyanDim, stroke: COLORS.cyan, text: COLORS.cyan };
  if (c === "amber") return { fill: COLORS.amberDim, stroke: COLORS.amber, text: COLORS.amber };
  if (c === "rose") return { fill: COLORS.roseDim, stroke: COLORS.rose, text: COLORS.rose };
  return { fill: "#18181b", stroke: COLORS.border, text: COLORS.textBright };
}

/* Box node */
export function Box({
  x, y, w = 120, h = 40, label, sublabel, color = "default", rx = 8,
}: {
  x: number; y: number; w?: number; h?: number;
  label: string; sublabel?: string; color?: Color; rx?: number;
}) {
  const c = getColor(color);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={c.fill} stroke={c.stroke} strokeWidth={1.5} />
      <text x={x + w / 2} y={y + (sublabel ? h / 2 - 6 : h / 2)} fill={c.text}
        textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={600} fontFamily="monospace">
        {label}
      </text>
      {sublabel && (
        <text x={x + w / 2} y={y + h / 2 + 10} fill={COLORS.text}
          textAnchor="middle" dominantBaseline="central" fontSize={10} fontFamily="monospace">
          {sublabel}
        </text>
      )}
    </g>
  );
}

/* Circle node */
export function Circle({
  cx, cy, r = 20, label, color = "default",
}: {
  cx: number; cy: number; r?: number; label: string; color?: Color;
}) {
  const c = getColor(color);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={c.fill} stroke={c.stroke} strokeWidth={1.5} />
      <text x={cx} y={cy} fill={c.text}
        textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600} fontFamily="monospace">
        {label}
      </text>
    </g>
  );
}

/* Arrow (line with arrowhead) */
export function Arrow({
  x1, y1, x2, y2, label, dashed = false, color,
}: {
  x1: number; y1: number; x2: number; y2: number;
  label?: string; dashed?: boolean; color?: string;
}) {
  const c = color || COLORS.text;
  const id = `arrow-${x1}-${y1}-${x2}-${y2}`;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  // Pull back arrow tip by 6px so arrowhead sits at endpoint
  const tipX = x2 - ux * 6;
  const tipY = y2 - uy * 6;
  return (
    <g>
      <defs>
        <marker id={id} markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M1,1 L7,4 L1,7" fill="none" stroke={c} strokeWidth={1.5} />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={tipX} y2={tipY}
        stroke={c} strokeWidth={1.5} markerEnd={`url(#${id})`}
        strokeDasharray={dashed ? "6,4" : undefined} />
      {label && (
        <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 8} fill={COLORS.text}
          textAnchor="middle" fontSize={10} fontFamily="monospace">
          {label}
        </text>
      )}
    </g>
  );
}

/* Label (free-positioned text) */
export function Label({
  x, y, text, size = 11, color, anchor = "middle", weight = "normal",
}: {
  x: number; y: number; text: string;
  size?: number; color?: string; anchor?: "start" | "middle" | "end";
  weight?: "normal" | "bold";
}) {
  return (
    <text x={x} y={y} fill={color || COLORS.text}
      textAnchor={anchor} dominantBaseline="central"
      fontSize={size} fontWeight={weight === "bold" ? 700 : 400} fontFamily="monospace">
      {text}
    </text>
  );
}

/* Bracket / group outline */
export function GroupBox({
  x, y, w, h, label, color = "default",
}: {
  x: number; y: number; w: number; h: number; label?: string; color?: Color;
}) {
  const c = getColor(color);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12}
        fill="none" stroke={c.stroke} strokeWidth={1} strokeDasharray="6,4" />
      {label && (
        <text x={x + w / 2} y={y - 8} fill={c.text}
          textAnchor="middle" fontSize={10} fontWeight={600} fontFamily="monospace"
          style={{ textTransform: "uppercase", letterSpacing: 1 }}>
          {label}
        </text>
      )}
    </g>
  );
}

/* SVG canvas wrapper */
export function SvgDiagram({
  width = 700, height = 300, title, children,
}: {
  width?: number; height?: number; title?: string; children: React.ReactNode;
}) {
  return (
    <div className="my-8 overflow-hidden rounded-lg border border-border/40 bg-zinc-950 p-6">
      {title && (
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
      )}
      <div className="flex justify-center overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ maxWidth: width }}
          xmlns="http://www.w3.org/2000/svg">
          {children}
        </svg>
      </div>
    </div>
  );
}
