import { motion } from 'motion/react'
import { useState, useEffect } from 'react'

/* ------------------------------------------------------------------ */
/*  BRONWIJS PAGE  -  Standalone landing page                         */
/*  Metaphor: information management as a thriving ecosystem          */
/* ------------------------------------------------------------------ */

// ---------- palette tokens ----------
const C = {
  bg: '#FEFCF3',
  dark: '#2C3E2D',
  primary: '#4A7C59',
  primaryDark: '#3D6A4B',    // darker primary for small text on tinted bgs (4.5:1+)
  primaryLight: '#7BAF8C',   // lighter primary for text on dark backgrounds (5.0:1 on #2C3E2D)
  accent: '#E07A5F',
  accentText: '#A8452D',     // darker accent for small text (AA on both bg and surface)
  accentLight: '#F0A08A',    // lighter accent for text on dark bg (4.7:1 on #2C3E2D)
  gold: '#D4A373',
  goldText: '#7D5A28',       // darker gold for text (AA on both bg and surface)
  goldLight: '#E8C496',      // lighter gold for text on dark bg (6.1:1 on #2C3E2D)
  surface: '#F0EBD8',
  muted: '#586858',          // darkened from #6B7B6E for 4.5:1+ on both bg and surface
  white: '#FFFFFF',
  footerText: '#B0C0B2',    // lighter text for footer on dark bg (6.0:1 on #2C3E2D)
  footerMuted: '#9AB59D',   // footer secondary text (4.5:1+ on #2C3E2D)
} as const

// ---------- organic easing curves ----------
const organicEase = [0.16, 1, 0.3, 1] as const // gentle overshoot, very natural
const breatheEase = [0.25, 0.46, 0.45, 0.94] as const // smooth breathing feel

// ---------- reusable fade-in variant ----------
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, delay, ease: organicEase },
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 1.0, delay, ease: breatheEase },
})

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.82 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 1.0, delay, ease: organicEase },
})

/* ================================================================== */
/*  DECORATIVE SVG COMPONENTS                                         */
/* ================================================================== */

/** Floating leaf motif */
const LeafSVG = ({ className = '', color = C.primary, size = 32 }: { className?: string; color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    <path
      d="M16 2C16 2 6 10 6 18C6 24 10 28 16 30C22 28 26 24 26 18C26 10 16 2 16 2Z"
      fill={color}
      opacity={0.18}
    />
    <path
      d="M16 8V26M16 14C13 12 10 14 10 14M16 20C19 18 22 20 22 20"
      stroke={color}
      strokeWidth={1.2}
      strokeLinecap="round"
      opacity={0.4}
    />
  </svg>
)

/** Organic blob shape for backgrounds */
const BlobSVG = ({
  className = '',
  color = C.primary,
  opacity = 0.08,
}: {
  className?: string
  color?: string
  opacity?: number
}) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
    <path
      d="M45.3,-58.2C57.9,-49.5,67,-34.1,71.8,-17.1C76.5,-0.1,76.8,18.4,69.4,33.1C62,47.8,46.9,58.6,30.5,64.4C14.1,70.2,-3.6,71,-20.8,66.3C-38,61.6,-54.7,51.5,-63.5,37C-72.3,22.5,-73.3,3.6,-68.5,-12.6C-63.7,-28.8,-53.2,-42.3,-40.3,-51C-27.4,-59.7,-12.2,-63.5,2.8,-67C17.9,-70.5,32.7,-66.8,45.3,-58.2Z"
      transform="translate(100 100)"
      fill={color}
      opacity={opacity}
    />
  </svg>
)

/** Small decorative circle cluster */
const DotCluster = ({ className = '', color = C.primary }: { className?: string; color?: string }) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="3" fill={color} opacity={0.15} />
    <circle cx="28" cy="8" r="2" fill={color} opacity={0.2} />
    <circle cx="20" cy="24" r="4" fill={color} opacity={0.12} />
    <circle cx="40" cy="16" r="2.5" fill={color} opacity={0.18} />
    <circle cx="8" cy="32" r="2" fill={color} opacity={0.14} />
    <circle cx="36" cy="30" r="3" fill={color} opacity={0.1} />
    <circle cx="50" cy="24" r="2" fill={color} opacity={0.16} />
    <circle cx="44" cy="40" r="3.5" fill={color} opacity={0.12} />
    <circle cx="24" cy="44" r="2" fill={color} opacity={0.2} />
    <circle cx="52" cy="48" r="2" fill={color} opacity={0.14} />
  </svg>
)

/** Flowing line decoration */
const FlowLine = ({ className = '', color = C.primary }: { className?: string; color?: string }) => (
  <svg width="200" height="40" viewBox="0 0 200 40" fill="none" className={className} aria-hidden="true">
    <path
      d="M0 20C30 20 30 8 60 8C90 8 90 32 120 32C150 32 150 14 180 14C195 14 200 20 200 20"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      opacity={0.25}
    />
  </svg>
)

/* ================================================================== */
/*  HERO INFORMATION TREE SVG                                         */
/* ================================================================== */

const InformationTreeSVG = () => (
  <svg viewBox="0 0 500 560" fill="none" className="w-full h-auto max-w-[540px]" role="img" aria-label="Illustratie van een informatieboom met verbonden knooppunten voor Beleid, Archief, Data, Woo en AVG">
    {/* Ambient glow behind trunk */}
    <defs>
      <radialGradient id="tree-glow-center" cx="50%" cy="60%" r="40%">
        <stop offset="0%" stopColor={C.primary} stopOpacity={0.12} />
        <stop offset="100%" stopColor={C.primary} stopOpacity={0} />
      </radialGradient>
      <radialGradient id="node-glow-accent" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={C.accent} stopOpacity={0.3} />
        <stop offset="100%" stopColor={C.accent} stopOpacity={0} />
      </radialGradient>
      <radialGradient id="node-glow-gold" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={C.gold} stopOpacity={0.3} />
        <stop offset="100%" stopColor={C.gold} stopOpacity={0} />
      </radialGradient>
      <radialGradient id="node-glow-primary" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={C.primary} stopOpacity={0.25} />
        <stop offset="100%" stopColor={C.primary} stopOpacity={0} />
      </radialGradient>
    </defs>
    <ellipse cx="250" cy="300" rx="180" ry="220" fill="url(#tree-glow-center)" />

    {/* Root / trunk */}
    <motion.path
      d="M250 520C250 520 250 440 250 380C250 320 230 300 230 260C230 220 250 200 250 180"
      stroke={C.primary}
      strokeWidth={5}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
    />
    {/* Root tendrils */}
    <motion.path
      d="M250 520C250 520 220 510 200 530"
      stroke={C.gold}
      strokeWidth={2}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: 0.3 }}
    />
    <motion.path
      d="M250 520C250 520 280 510 300 530"
      stroke={C.gold}
      strokeWidth={2}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: 0.4 }}
    />
    <motion.path
      d="M250 500C250 500 210 495 190 510"
      stroke={C.gold}
      strokeWidth={1.5}
      strokeLinecap="round"
      opacity={0.6}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    />
    <motion.path
      d="M250 490C250 490 290 485 310 500"
      stroke={C.gold}
      strokeWidth={1.5}
      strokeLinecap="round"
      opacity={0.6}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
    />

    {/* Main branches */}
    <motion.path
      d="M250 300C250 300 200 270 160 240"
      stroke={C.primary}
      strokeWidth={3.5}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
    />
    <motion.path
      d="M250 300C250 300 300 270 340 230"
      stroke={C.primary}
      strokeWidth={3.5}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
    />
    <motion.path
      d="M250 260C250 260 180 230 140 180"
      stroke={C.primary}
      strokeWidth={3}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
    />
    <motion.path
      d="M250 260C250 260 310 220 360 170"
      stroke={C.primary}
      strokeWidth={3}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
    />

    {/* Secondary branches */}
    <motion.path
      d="M250 220C250 220 220 180 200 140"
      stroke={C.primary}
      strokeWidth={2}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: 1.2 }}
    />
    <motion.path
      d="M250 200C250 200 270 160 290 120"
      stroke={C.primary}
      strokeWidth={2}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: 1.3 }}
    />
    <motion.path
      d="M160 240C160 240 130 220 110 190"
      stroke={C.primary}
      strokeWidth={2}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 1.3 }}
    />
    <motion.path
      d="M340 230C340 230 370 200 390 170"
      stroke={C.primary}
      strokeWidth={2}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 1.4 }}
    />
    <motion.path
      d="M140 180C140 180 110 150 90 130"
      stroke={C.primary}
      strokeWidth={1.5}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
    />
    <motion.path
      d="M360 170C360 170 390 140 410 110"
      stroke={C.primary}
      strokeWidth={1.5}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
    />

    {/* Tertiary fine branches */}
    <motion.path
      d="M160 240C160 240 170 210 180 190"
      stroke={C.primary}
      strokeWidth={1.2}
      strokeLinecap="round"
      opacity={0.6}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 1.6 }}
    />
    <motion.path
      d="M340 230C340 230 330 200 320 180"
      stroke={C.primary}
      strokeWidth={1.2}
      strokeLinecap="round"
      opacity={0.6}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 1.6 }}
    />
    <motion.path
      d="M200 140C200 140 180 120 170 95"
      stroke={C.primary}
      strokeWidth={1.2}
      strokeLinecap="round"
      opacity={0.5}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 1.7 }}
    />
    <motion.path
      d="M290 120C290 120 310 100 320 80"
      stroke={C.primary}
      strokeWidth={1.2}
      strokeLinecap="round"
      opacity={0.5}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 1.7 }}
    />

    {/* Data node circles - main (outer glow ring) */}
    {[
      { cx: 160, cy: 240, r: 22, delay: 1.8, color: C.accent },
      { cx: 340, cy: 230, r: 22, delay: 1.9, color: C.primary },
      { cx: 140, cy: 180, r: 20, delay: 2.0, color: C.gold },
      { cx: 360, cy: 170, r: 20, delay: 2.1, color: C.accent },
      { cx: 200, cy: 140, r: 18, delay: 2.2, color: C.primary },
      { cx: 290, cy: 120, r: 18, delay: 2.3, color: C.gold },
      { cx: 250, cy: 180, r: 26, delay: 2.0, color: C.accent },
    ].map((node, i) => (
      <motion.circle
        key={`main-${i}`}
        cx={node.cx}
        cy={node.cy}
        r={node.r}
        fill={node.color}
        opacity={0.25}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.25 }}
        transition={{ duration: 0.7, delay: node.delay, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
      />
    ))}
    {/* Data node circles - inner solid core */}
    {[
      { cx: 160, cy: 240, r: 9, delay: 1.9, color: C.accent },
      { cx: 340, cy: 230, r: 9, delay: 2.0, color: C.primary },
      { cx: 140, cy: 180, r: 8, delay: 2.1, color: C.gold },
      { cx: 360, cy: 170, r: 8, delay: 2.2, color: C.accent },
      { cx: 200, cy: 140, r: 7, delay: 2.3, color: C.primary },
      { cx: 290, cy: 120, r: 7, delay: 2.4, color: C.gold },
      { cx: 250, cy: 180, r: 11, delay: 2.1, color: C.accent },
    ].map((node, i) => (
      <motion.circle
        key={`inner-${i}`}
        cx={node.cx}
        cy={node.cy}
        r={node.r}
        fill={node.color}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: node.delay, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
      />
    ))}
    {/* Node highlight dots (tiny white center) */}
    {[
      { cx: 160, cy: 240, r: 3, delay: 2.1 },
      { cx: 340, cy: 230, r: 3, delay: 2.2 },
      { cx: 140, cy: 180, r: 2.5, delay: 2.3 },
      { cx: 360, cy: 170, r: 2.5, delay: 2.4 },
      { cx: 250, cy: 180, r: 3.5, delay: 2.3 },
    ].map((dot, i) => (
      <motion.circle
        key={`highlight-${i}`}
        cx={dot.cx}
        cy={dot.cy}
        r={dot.r}
        fill="#FFFFFF"
        opacity={0.6}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: dot.delay, ease: 'backOut' }}
        style={{ transformOrigin: `${dot.cx}px ${dot.cy}px` }}
      />
    ))}

    {/* Secondary smaller nodes */}
    {[
      { cx: 110, cy: 190, r: 6, delay: 2.4, color: C.primary },
      { cx: 390, cy: 170, r: 6, delay: 2.5, color: C.gold },
      { cx: 90, cy: 130, r: 5, delay: 2.6, color: C.accent },
      { cx: 410, cy: 110, r: 5, delay: 2.7, color: C.primary },
      { cx: 180, cy: 190, r: 6, delay: 2.5, color: C.gold },
      { cx: 320, cy: 180, r: 6, delay: 2.5, color: C.accent },
      { cx: 170, cy: 95, r: 5, delay: 2.7, color: C.primary },
      { cx: 320, cy: 80, r: 5, delay: 2.8, color: C.gold },
    ].map((node, i) => (
      <motion.circle
        key={`sec-${i}`}
        cx={node.cx}
        cy={node.cy}
        r={node.r}
        fill={node.color}
        opacity={0.8}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: node.delay, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
      />
    ))}

    {/* Leaf-shaped decorations on branches */}
    {[
      { x: 120, y: 210, rot: -30, delay: 2.5, color: C.primary },
      { x: 370, y: 190, rot: 20, delay: 2.6, color: C.gold },
      { x: 220, y: 160, rot: -15, delay: 2.7, color: C.primary },
      { x: 280, y: 140, rot: 25, delay: 2.8, color: C.accent },
      { x: 100, y: 150, rot: -40, delay: 2.9, color: C.primary },
      { x: 400, y: 130, rot: 35, delay: 2.9, color: C.gold },
    ].map((leaf, i) => (
      <motion.path
        key={`leaf-${i}`}
        d="M0 -10C5 -10 10 -5 10 0C10 5 5 10 0 10C-5 10 -10 5 -10 0"
        fill={leaf.color}
        opacity={0.3}
        transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.rot})`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 0.6, delay: leaf.delay, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformOrigin: `${leaf.x}px ${leaf.y}px` }}
      />
    ))}

    {/* Connection lines between nodes (data flow) */}
    {[
      { d: 'M160 240C180 235 220 200 250 180', delay: 2.3, color: C.gold },
      { d: 'M250 180C280 200 320 225 340 230', delay: 2.4, color: C.accent },
      { d: 'M140 180C160 175 190 155 200 140', delay: 2.5, color: C.gold },
      { d: 'M290 120C310 140 340 160 360 170', delay: 2.6, color: C.primary },
    ].map((conn, i) => (
      <motion.path
        key={`conn-${i}`}
        d={conn.d}
        stroke={conn.color}
        strokeWidth={1.2}
        strokeDasharray="5 5"
        fill="none"
        opacity={0.35}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: conn.delay, ease: [0.16, 1, 0.3, 1] }}
      />
    ))}

    {/* Tiny pulsing dots along connections - data flowing */}
    {[
      { cx: 205, cy: 210, delay: 3.0, color: C.gold },
      { cx: 295, cy: 205, delay: 3.2, color: C.accent },
      { cx: 170, cy: 158, delay: 3.4, color: C.gold },
      { cx: 325, cy: 145, delay: 3.6, color: C.primary },
    ].map((dot, i) => (
      <motion.circle
        key={`pulse-${i}`}
        cx={dot.cx}
        cy={dot.cy}
        r={3}
        fill={dot.color}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, delay: dot.delay, repeat: Infinity, repeatDelay: 0.8 }}
      />
    ))}

    {/* Ambient floating particles */}
    {[
      { cx: 80, cy: 100, r: 1.5, dur: 3, delay: 2.0 },
      { cx: 420, cy: 80, r: 1.5, dur: 3.5, delay: 2.5 },
      { cx: 150, cy: 70, r: 1, dur: 4, delay: 3.0 },
      { cx: 350, cy: 60, r: 1, dur: 3.2, delay: 3.5 },
      { cx: 250, cy: 60, r: 1.5, dur: 3.8, delay: 2.8 },
      { cx: 190, cy: 260, r: 1, dur: 4.2, delay: 3.2 },
      { cx: 310, cy: 250, r: 1, dur: 3.6, delay: 3.0 },
    ].map((p, i) => (
      <motion.circle
        key={`ambient-${i}`}
        cx={p.cx}
        cy={p.cy}
        r={p.r}
        fill={C.primary}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 0.4, 0], y: -15 }}
        transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, repeatDelay: 0.5 }}
      />
    ))}

    {/* Node labels - elegant tiny text */}
    {[
      { x: 250, y: 168, label: 'Beleid', delay: 2.8, color: C.accent },
      { x: 155, y: 255, label: 'Archief', delay: 2.9, color: C.accent },
      { x: 345, y: 245, label: 'Data', delay: 3.0, color: C.primary },
      { x: 130, y: 170, label: 'Woo', delay: 3.1, color: C.gold },
      { x: 370, y: 160, label: 'AVG', delay: 3.2, color: C.accent },
    ].map((lbl, i) => (
      <motion.text
        key={`lbl-${i}`}
        x={lbl.x}
        y={lbl.y}
        textAnchor="middle"
        fill={lbl.color}
        fontSize={9}
        fontFamily="'Outfit', sans-serif"
        fontWeight={600}
        letterSpacing={0.5}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.8, delay: lbl.delay }}
      >
        {lbl.label}
      </motion.text>
    ))}

    {/* Ground / base organic shape */}
    <motion.ellipse
      cx={250}
      cy={540}
      rx={140}
      ry={16}
      fill={C.gold}
      opacity={0.18}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: '250px 540px' }}
    />
    <motion.ellipse
      cx={250}
      cy={545}
      rx={90}
      ry={10}
      fill={C.primary}
      opacity={0.12}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: '250px 545px' }}
    />
  </svg>
)

/* ================================================================== */
/*  WAVE SECTION DIVIDERS                                             */
/* ================================================================== */

const WaveDivider = ({
  flip = false,
  fromColor = C.bg,
  toColor = C.surface,
}: {
  flip?: boolean
  fromColor?: string
  toColor?: string
}) => (
  <div className={`relative w-full overflow-hidden ${flip ? 'rotate-180' : ''}`} style={{ marginTop: -2, marginBottom: -2 }}>
    <svg
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      className="block w-full"
      style={{ height: '100px' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`wave-grad-${flip ? 'b' : 'a'}-${fromColor.replace('#','')}-${toColor.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fromColor} />
          <stop offset="100%" stopColor={toColor} />
        </linearGradient>
      </defs>
      {/* Back layer - subtle */}
      <path
        d="M0,80 C180,30 360,110 540,70 C720,30 900,100 1080,60 C1260,20 1380,80 1440,50 L1440,160 L0,160 Z"
        fill={toColor}
        opacity={0.35}
      />
      {/* Middle layer */}
      <path
        d="M0,50 C240,120 480,10 720,80 C960,150 1200,30 1440,100 L1440,160 L0,160 Z"
        fill={toColor}
        opacity={0.6}
      />
      {/* Front layer - solid */}
      <path
        d="M0,90 C200,40 400,130 720,70 C1040,10 1240,100 1440,60 L1440,160 L0,160 Z"
        fill={toColor}
      />
    </svg>
  </div>
)

const WaveDividerAlt = ({
  toColor = C.bg,
}: {
  toColor?: string
}) => (
  <div className="relative w-full overflow-hidden" style={{ marginTop: -2, marginBottom: -2 }}>
    <svg
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      className="block w-full"
      style={{ height: '90px' }}
      aria-hidden="true"
    >
      {/* Back wave layer */}
      <path
        d="M0,100 C240,40 480,110 720,60 C960,10 1200,80 1440,50 L1440,140 L0,140 Z"
        fill={toColor}
        opacity={0.4}
      />
      {/* Front wave layer */}
      <path
        d="M0,90 C180,30 360,100 540,60 C720,20 900,90 1080,50 C1260,10 1380,70 1440,40 L1440,140 L0,140 Z"
        fill={toColor}
      />
    </svg>
  </div>
)

/* ================================================================== */
/*  SECTION: NAVIGATION                                               */
/* ================================================================== */

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Over ons', href: '#over-ons' },
    { label: 'Architectuur', href: '#architectuur' },
    { label: 'Samenwerking', href: '#samenwerking' },
    { label: 'Kernwaarden', href: '#kernwaarden' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      aria-label="Hoofdnavigatie"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FEFCF3]/90 backdrop-blur-lg shadow-[0_2px_24px_rgba(44,62,45,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C59] rounded-lg">
            <div className="relative">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <circle cx="18" cy="18" r="16" fill={C.primary} opacity={0.12} />
                <path
                  d="M18 6C18 6 10 12 10 20C10 25 13 28 18 30C23 28 26 25 26 20C26 12 18 6 18 6Z"
                  fill={C.primary}
                  opacity={0.25}
                />
                <path
                  d="M18 10V28M18 16C15.5 14 13 15.5 13 15.5M18 22C20.5 20 23 21.5 23 21.5"
                  stroke={C.primary}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              className="text-xl font-semibold tracking-tight"
              style={{ fontFamily: "'Fraunces', serif", color: C.dark }}
            >
              Bron
              <span style={{ color: C.primary }}>wijs</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#4A7C59]/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C59]"
                style={{ fontFamily: "'Outfit', sans-serif", color: C.dark }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-3 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#4A7C59]/20 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: `linear-gradient(135deg, ${C.primary}, ${C.dark})`,
              }}
            >
              Gesprek plannen
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 rounded-full flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C59]"
            style={{ backgroundColor: menuOpen ? `${C.primary}15` : 'transparent' }}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-[4px]' : ''
                }`}
                style={{ backgroundColor: C.dark }}
              />
              <span
                className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-[4px]' : ''
                }`}
                style={{ backgroundColor: C.dark }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 pb-6 bg-[#FEFCF3]/95 backdrop-blur-lg"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-medium transition-colors hover:bg-[#4A7C59]/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C59]"
              style={{ fontFamily: "'Outfit', sans-serif", color: C.dark }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block mt-3 px-6 py-3 rounded-full text-center text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C59]"
            style={{
              fontFamily: "'Outfit', sans-serif",
              background: `linear-gradient(135deg, ${C.primary}, ${C.dark})`,
            }}
          >
            Gesprek plannen
          </a>
        </motion.div>
      )}
    </motion.nav>
  )
}

/* ================================================================== */
/*  SECTIE 1: HERO                                                    */
/* ================================================================== */

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: C.bg }}>
    {/* Ambient background decorations */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <BlobSVG color={C.primary} opacity={0.05} className="w-full h-full" />
      </motion.div>
      <motion.div
        className="absolute top-1/4 -left-20 w-[400px] h-[400px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <BlobSVG color={C.gold} opacity={0.04} className="w-full h-full" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-1/4 w-[300px] h-[300px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <BlobSVG color={C.accent} opacity={0.03} className="w-full h-full" />
      </motion.div>

      {/* Scattered dot clusters */}
      <DotCluster className="absolute top-32 left-20 opacity-40" color={C.primary} />
      <DotCluster className="absolute bottom-40 right-32 opacity-30" color={C.gold} />
      <FlowLine className="absolute top-1/2 left-0 opacity-20" color={C.primary} />
    </div>

    <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-28 md:pt-24 pb-16">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left: Text content */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ backgroundColor: `${C.primary}10`, border: `1px solid ${C.primary}20` }}
          >
            <LeafSVG size={16} color={C.primaryDark} />
            <span
              className="text-xs font-semibold tracking-wider uppercase"
              style={{ fontFamily: "'Outfit', sans-serif", color: C.primaryDark }}
            >
              Informatiebeheer voor de overheid
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] mb-4"
            style={{ fontFamily: "'Fraunces', serif", color: C.dark, fontOpticalSizing: 'auto' }}
          >
            Van wildgroei naar{' '}
            <span className="relative inline-block">
              <em style={{ color: C.primary, fontStyle: 'italic' }}>regie</em>
              <motion.svg
                viewBox="0 0 200 12"
                className="absolute -bottom-1 left-0 w-full"
                fill="none"
                aria-hidden="true"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <motion.path
                  d="M4 8C40 3 80 6 100 4C140 2 170 7 196 5"
                  stroke={C.accent}
                  strokeWidth={3}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
              </motion.svg>
            </span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-xl md:text-2xl leading-relaxed mb-8"
            style={{ fontFamily: "'Fraunces', serif", color: C.muted }}
          >
            Samen verzorgen we een gezond informatie-ecosysteem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="space-y-4 mb-10"
          >
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "'Outfit', sans-serif", color: C.muted }}
            >
              Informatie groeit elke dag en steeds sneller. Dat is geen probleem, maar de realiteit van een moderne overheid.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "'Outfit', sans-serif", color: C.muted }}
            >
              Het probleem ontstaat wanneer die groei geen samenhang heeft en verandert in informatiechaos:
            </p>
            <ul className="space-y-3 pl-1">
              {[
                'Wanneer netwerkschijven, zaaksystemen, e-mailboxen en legacy-applicaties naast elkaar bestaan zonder verbindende architectuur;',
                'Wanneer Woo-verzoeken maanden duren terwijl de wettelijke termijn 42 dagen is;',
                'Wanneer AI wordt ingezet zonder stabiele, betrouwbare informatielaag;',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${C.accent}15` }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M2 5L4 7L8 3" stroke={C.accent} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span
                    className="text-sm md:text-base leading-relaxed"
                    style={{ fontFamily: "'Outfit', sans-serif", color: C.muted }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p
              className="text-base md:text-lg leading-relaxed font-medium"
              style={{ fontFamily: "'Outfit', sans-serif", color: C.dark }}
            >
              Grip op informatie is daarom geen optimalisatievraag. Het is een fundamentele architectuurkeuze.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#architectuur"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-base transition-all duration-400 hover:shadow-2xl hover:shadow-[#4A7C59]/25 hover:scale-[1.04] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C59]"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: `linear-gradient(135deg, ${C.primary} 0%, #3A6347 50%, ${C.dark} 100%)`,
                boxShadow: `0 4px 20px ${C.primary}30`,
              }}
            >
              Ontdek hoe wij deze architectuur vormgeven
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                <path d="M4 10H16M12 6L16 10L12 14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#over-ons"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-400 hover:shadow-lg hover:scale-[1.04] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C59]"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: C.primary,
                backgroundColor: `${C.primary}0A`,
                border: `1.5px solid ${C.primary}30`,
                boxShadow: `0 2px 12px ${C.primary}08`,
              }}
            >
              Bekijk OpenGrip &rarr;
            </a>
          </motion.div>
        </div>

        {/* Right: Information Tree SVG */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Layered glow behind tree */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full blur-[80px]"
              style={{ backgroundColor: C.primary, opacity: 0.1 }}
            />
            <div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full blur-[60px]"
              style={{ backgroundColor: C.gold, opacity: 0.08 }}
            />
            <InformationTreeSVG />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
)

/* ================================================================== */
/*  SECTIE 2: URGENTIE (Stats)                                        */
/* ================================================================== */

const urgentieStats = [
  {
    value: '70-188',
    label: 'dagen',
    sublabel: 'Gemiddelde doorlooptijd Woo-verzoeken',
    description: 'De wettelijke termijn bedraagt 42 dagen. In de praktijk lopen complexe verzoeken uit door versnipperde informatie en coordinatie over meerdere systemen en afdelingen.',
    color: C.primaryLight,
  },
  {
    value: '180 mln',
    label: 'euro',
    sublabel: 'Geschatte jaarlijkse uitvoeringskosten Woo',
    description: 'De afhandeling van Woo-verzoeken kost naar schatting 180 miljoen euro per jaar. Veel capaciteit gaat naar zoeken, verzamelen en anonimiseren in plaats van naar structurele verbetering.',
    color: C.accentLight,
  },
  {
    value: '200.000',
    label: 'mensdagen',
    sublabel: 'Totale inzet per jaar voor Woo-afhandeling',
    description: 'Landelijk komt de behandeling neer op circa 200.000 mensdagen per jaar. Dit is capaciteit die grotendeels wordt besteed aan het herstellen van samenhang achteraf, in plaats van het organiseren ervan vooraf.',
    color: C.goldLight,
  },
  {
    value: '250+',
    label: 'gemeenten',
    sublabel: 'Eigen keuzes in tooling en inrichting',
    description: 'Gemeenten ontwikkelen afzonderlijk oplossingen voor zoeken, vinden en anonimiseren. Het rapport wijst op de behoefte aan regie en een robuust open source / Common Ground-platform in plaats van versnipperde marktinitiatieven.',
    color: C.primaryLight,
  },
]

const UrgentieSection = () => (
  <section id="urgentie" style={{ backgroundColor: C.dark }}>
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div {...fadeUp(0)}>
          <span
            className="text-sm font-semibold tracking-wider uppercase"
            style={{ fontFamily: "'Outfit', sans-serif", color: C.goldLight }}
          >
            De realiteit van vandaag
          </span>
        </motion.div>
        <motion.h2
          {...fadeUp(0.1)}
          className="text-3xl md:text-4xl lg:text-5xl leading-tight mt-4 mb-6 text-white"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Woo maakt het belang van een gezond{' '}
          <em style={{ color: C.goldLight, fontStyle: 'italic' }}>ecosysteem</em> zichtbaar
        </motion.h2>
        <motion.p
          {...fadeUp(0.2)}
          className="text-base md:text-lg leading-relaxed"
          style={{ fontFamily: "'Outfit', sans-serif", color: '#A8B5AA' }}
        >
          Het onderzoek naar AI en Open Overheid (februari 2026) laat zien dat de druk op informatiehuishouding geen incident is, maar een structureel vraagstuk. Woo-verzoeken maken zichtbaar waar samenhang en regie ontbreekt:
        </motion.p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {urgentieStats.map((stat, i) => (
          <motion.div
            key={stat.sublabel}
            {...scaleIn(0.1 * i)}
            whileHover={{ scale: 1.04, y: -4 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative text-center p-8 md:p-10 rounded-3xl overflow-hidden cursor-default"
            style={{
              backgroundColor: `${stat.color}10`,
              border: `1px solid ${stat.color}25`,
              boxShadow: `0 4px 24px ${stat.color}10`,
            }}
          >
            {/* Background blob */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
              <BlobSVG color={stat.color} opacity={0.06} className="w-56 h-56" />
            </div>

            <div className="relative z-10">
              <div
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                style={{ fontFamily: "'Fraunces', serif", color: stat.color }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm font-semibold uppercase tracking-wider mb-1"
                style={{ fontFamily: "'Outfit', sans-serif", color: stat.color }}
              >
                {stat.label}
              </div>
              <div
                className="text-sm font-medium mb-3"
                style={{ fontFamily: "'Outfit', sans-serif", color: '#B4C3B6' }}
              >
                {stat.sublabel}
              </div>
              <div
                className="text-xs leading-relaxed"
                style={{ fontFamily: "'Outfit', sans-serif", color: '#8A9B8C' }}
              >
                {stat.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Closing text */}
      <motion.div {...fadeUp(0.4)} className="text-center max-w-3xl mx-auto mt-16">
        <p
          className="text-base md:text-lg leading-relaxed mb-4"
          style={{ fontFamily: "'Outfit', sans-serif", color: '#A8B5AA' }}
        >
          Dit zijn geen losse uitvoeringsproblemen. Dit zijn signalen dat een gedeelde, open regielaag ontbreekt.
        </p>
        <p
          className="text-lg md:text-xl leading-relaxed font-semibold"
          style={{ fontFamily: "'Fraunces', serif", color: C.goldLight }}
        >
          Daarom bouwt Bronwijs aan de stam onder het informatie-ecosysteem.
        </p>
      </motion.div>

      {/* Decorative elements */}
      <motion.div {...fadeIn(0.4)} className="flex justify-center mt-12">
        <FlowLine color={C.gold} className="w-48 opacity-20" />
      </motion.div>
    </div>
  </section>
)

/* ================================================================== */
/*  SECTIE 3: OVER BRONWIJS (About)                                   */
/* ================================================================== */

const AboutSection = () => (
  <section id="over-ons" style={{ backgroundColor: C.surface }}>
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: illustrative organic graphic */}
        <motion.div {...scaleIn(0)} className="relative">
          <div className="relative rounded-3xl overflow-hidden p-10 md:p-14" style={{ backgroundColor: C.bg }}>
            {/* Abstract organic illustration */}
            <svg viewBox="0 0 400 300" fill="none" className="w-full h-auto" aria-hidden="true">
              {/* Background circles */}
              <circle cx="200" cy="150" r="120" fill={C.primary} opacity={0.06} />
              <circle cx="160" cy="130" r="80" fill={C.gold} opacity={0.08} />
              <circle cx="260" cy="170" r="90" fill={C.accent} opacity={0.06} />

              {/* Connected nodes - representing networked information */}
              <line x1="100" y1="100" x2="180" y2="130" stroke={C.primary} strokeWidth={1.5} opacity={0.3} />
              <line x1="180" y1="130" x2="250" y2="90" stroke={C.primary} strokeWidth={1.5} opacity={0.3} />
              <line x1="180" y1="130" x2="200" y2="200" stroke={C.primary} strokeWidth={1.5} opacity={0.3} />
              <line x1="200" y1="200" x2="300" y2="180" stroke={C.primary} strokeWidth={1.5} opacity={0.3} />
              <line x1="250" y1="90" x2="320" y2="120" stroke={C.primary} strokeWidth={1.5} opacity={0.3} />
              <line x1="300" y1="180" x2="340" y2="140" stroke={C.primary} strokeWidth={1.5} opacity={0.3} />
              <line x1="200" y1="200" x2="140" y2="220" stroke={C.primary} strokeWidth={1.5} opacity={0.3} />
              <line x1="100" y1="100" x2="80" y2="170" stroke={C.primary} strokeWidth={1.5} opacity={0.3} />
              <line x1="80" y1="170" x2="140" y2="220" stroke={C.primary} strokeWidth={1.5} opacity={0.3} />

              {/* Nodes */}
              <circle cx="100" cy="100" r="14" fill={C.primary} opacity={0.15} />
              <circle cx="100" cy="100" r="7" fill={C.primary} />
              <circle cx="180" cy="130" r="18" fill={C.accent} opacity={0.15} />
              <circle cx="180" cy="130" r="9" fill={C.accent} />
              <circle cx="250" cy="90" r="14" fill={C.gold} opacity={0.15} />
              <circle cx="250" cy="90" r="7" fill={C.gold} />
              <circle cx="200" cy="200" r="16" fill={C.primary} opacity={0.15} />
              <circle cx="200" cy="200" r="8" fill={C.primary} />
              <circle cx="300" cy="180" r="14" fill={C.accent} opacity={0.15} />
              <circle cx="300" cy="180" r="7" fill={C.accent} />
              <circle cx="320" cy="120" r="12" fill={C.primary} opacity={0.15} />
              <circle cx="320" cy="120" r="6" fill={C.primary} />
              <circle cx="140" cy="220" r="12" fill={C.gold} opacity={0.15} />
              <circle cx="140" cy="220" r="6" fill={C.gold} />
              <circle cx="80" cy="170" r="10" fill={C.accent} opacity={0.15} />
              <circle cx="80" cy="170" r="5" fill={C.accent} />
              <circle cx="340" cy="140" r="10" fill={C.gold} opacity={0.15} />
              <circle cx="340" cy="140" r="5" fill={C.gold} />

              {/* Leaf decorations */}
              <path d="M120 60C124 56 130 58 130 62C130 66 124 68 120 64" fill={C.primary} opacity={0.3} />
              <path d="M280 50C284 46 290 48 290 52C290 56 284 58 280 54" fill={C.gold} opacity={0.3} />
              <path d="M340 210C344 206 350 208 350 212C350 216 344 218 340 214" fill={C.accent} opacity={0.3} />
            </svg>

            {/* Decorative leaves in corners */}
            <div className="absolute top-4 right-4">
              <LeafSVG size={40} color={C.primary} />
            </div>
            <div className="absolute bottom-4 left-4 rotate-180">
              <LeafSVG size={32} color={C.gold} />
            </div>
          </div>
        </motion.div>

        {/* Right: text */}
        <div>
          <motion.div {...fadeUp(0.1)} className="mb-4">
            <span
              className="text-sm font-semibold tracking-wider uppercase"
              style={{ fontFamily: "'Outfit', sans-serif", color: C.accentText }}
            >
              Over Bronwijs
            </span>
          </motion.div>
          <motion.h2
            {...fadeUp(0.2)}
            className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-6"
            style={{ fontFamily: "'Fraunces', serif", color: C.dark }}
          >
            Bronwijs bouwt de stam onder het{' '}
            <em style={{ color: C.primary, fontStyle: 'italic' }}>informatie-ecosysteem</em>
          </motion.h2>
          <motion.p
            {...fadeUp(0.3)}
            className="text-base md:text-lg leading-relaxed mb-8"
            style={{ fontFamily: "'Outfit', sans-serif", color: C.muted }}
          >
            Bronwijs ontwikkelt OpenGrip: een open, op Common Ground gebaseerde kern die versnipperde informatie via API's ontsluit en samenbrengt in een samenhangende informatielaag.
          </motion.p>

          {/* Key points */}
          <motion.div {...fadeUp(0.4)} className="space-y-4 mb-8">
            {[
              'OpenGrip verbindt systemen zonder data te centraliseren.',
              'Het respecteert bestaande autorisaties.',
              'Het creëert één regielaag boven de bron.',
            ].map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: `${C.primary}15` }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6L5 9L10 3" stroke={C.primary} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span
                  className="text-base md:text-lg font-medium"
                  style={{ fontFamily: "'Outfit', sans-serif", color: C.dark }}
                >
                  {point}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            {...fadeUp(0.5)}
            className="text-lg md:text-xl leading-relaxed font-semibold italic"
            style={{ fontFamily: "'Fraunces', serif", color: C.primary }}
          >
            Niet centraliseren. Niet kopieren. Maar verbinden bij de bron.
          </motion.p>
        </div>
      </div>
    </div>
  </section>
)

/* ================================================================== */
/*  SECTIE 4: ARCHITECTUURKEUZES (Services)                           */
/* ================================================================== */

const architectuurData = [
  {
    title: 'Digitale autonomie',
    description:
      'Organisaties behouden regie over hun eigen informatiepositie. Geen afhankelijkheid van gesloten ecosystemen, maar bouwen op open standaarden en Common Ground en vrije keuze qua infrastructuur.',
    iconPath: 'M12 3C12 3 4 9 4 16C4 21 7 24 12 26C17 24 20 21 20 16C20 9 12 3 12 3Z',
    iconDetail: 'M12 7V23M12 13C9.5 11 7 12.5 7 12.5M12 19C14.5 17 17 18.5 17 18.5',
    color: C.primary,
  },
  {
    title: 'Regie bij de bron',
    description:
      'Data blijft waar zij hoort. We verbinden systemen via API\'s en creeren samenhang zonder nieuwe kopieen of silo\'s.',
    iconPath: 'M4 6C4 4 6 2 8 2H16C18 2 20 4 20 6V22C20 24 18 26 16 26H8C6 26 4 24 4 22V6Z',
    iconDetail: 'M8 8H16M8 12H14M8 16H12M8 20H10',
    color: C.accent,
  },
  {
    title: 'Security by design',
    description:
      'Beveiliging en autorisatie zijn integraal onderdeel van de architectuur. Toegang wordt gerespecteerd binnen bestaande structuren en niet achteraf gecorrigeerd.',
    iconPath: 'M12 2L22 8V16C22 21 18 25 12 26C6 25 2 21 2 16V8L12 2Z',
    iconDetail: 'M8 14L11 17L16 11',
    color: C.gold,
  },
  {
    title: 'Open kern als fundament',
    description:
      'De basis is open en transparant. Daarboven kan functionaliteit modulair worden uitgebreid, zonder het fundament te wijzigen.',
    iconPath: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z',
    iconDetail: 'M12 8V12L15 15M12 6V6.01',
    color: C.primary,
  },
  {
    title: 'Ontworpen voor samenwerking',
    description:
      'De kern is bedoeld om gezamenlijk te gebruiken en door te ontwikkelen samen met de community. We hoeven het wiel niet meer allemaal zelf uit te vinden.',
    iconPath: 'M3 12C3 12 7 4 12 4C17 4 21 12 21 12C21 12 17 20 12 20C7 20 3 12 3 12Z',
    iconDetail: 'M12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9Z',
    color: C.accent,
  },
  {
    title: 'Controle over de toekomst',
    description:
      'Organisaties houden controle over hun toekomst. OpenGrip werkt zonder licentiecontracten waardoor maximale vrijheid en controle aanwezig is voor organisaties.',
    iconPath: 'M3 22V14L8 10L13 14L18 6L21 9V22H3Z',
    iconDetail: 'M3 22H21M7 18V22M12 14V22M17 10V22',
    color: C.gold,
  },
]

const ArchitectuurCard = ({
  service,
  index,
}: {
  service: (typeof architectuurData)[0]
  index: number
}) => (
  <motion.div
    {...fadeUp(0.1 * index)}
    whileHover={{ y: -6, scale: 1.02 }}
    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="group relative p-8 rounded-3xl cursor-default"
    style={{
      backgroundColor: C.bg,
      border: `1px solid ${C.primary}12`,
      boxShadow: `0 1px 3px ${C.primary}06`,
    }}
  >
    {/* Hover background warmth shift */}
    <div
      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse at 30% 20%, ${service.color}08 0%, transparent 70%)`,
      }}
    />

    {/* Decorative corner leaf */}
    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-60 transition-all duration-600 group-hover:rotate-12">
      <LeafSVG size={28} color={service.color} />
    </div>

    {/* Icon */}
    <div
      className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
      style={{
        backgroundColor: `${service.color}12`,
        boxShadow: `0 0 0 0 ${service.color}00`,
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 28" fill="none" aria-hidden="true">
        <path d={service.iconPath} fill={service.color} opacity={0.25} />
        <path
          d={service.iconDetail}
          stroke={service.color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>

    <h3
      className="text-xl font-semibold mb-3 relative z-10"
      style={{ fontFamily: "'Fraunces', serif", color: C.dark }}
    >
      {service.title}
    </h3>
    <p
      className="text-sm leading-relaxed relative z-10 mb-6"
      style={{ fontFamily: "'Outfit', sans-serif", color: C.muted }}
    >
      {service.description}
    </p>

    {/* Bottom organic line - grows on hover */}
    <div className="overflow-hidden relative z-10">
      <motion.div
        className="h-[2px] rounded-full transition-all duration-500 group-hover:!w-[70%]"
        style={{ backgroundColor: service.color, opacity: 0.35 }}
        initial={{ width: '0%' }}
        whileInView={{ width: '40%' }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0, delay: 0.2 + 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  </motion.div>
)

const ArchitectuurSection = () => (
  <section id="architectuur" style={{ backgroundColor: C.surface }}>
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div {...fadeUp(0)}>
          <span
            className="text-sm font-semibold tracking-wider uppercase"
            style={{ fontFamily: "'Outfit', sans-serif", color: C.accentText }}
          >
            Architectuurkeuzes
          </span>
        </motion.div>
        <motion.h2
          {...fadeUp(0.1)}
          className="text-3xl md:text-4xl lg:text-5xl leading-tight mt-4 mb-6"
          style={{ fontFamily: "'Fraunces', serif", color: C.dark }}
        >
          De architectuurkeuzes van{' '}
          <em style={{ color: C.primary, fontStyle: 'italic' }}>Bronwijs</em>
        </motion.h2>
        <motion.p
          {...fadeUp(0.2)}
          className="text-base md:text-lg leading-relaxed"
          style={{ fontFamily: "'Outfit', sans-serif", color: C.muted }}
        >
          Bronwijs maakt zeer bewuste architectuurkeuzes. Een keuze voor autonomie, regie en duurzame samenwerkingen. Dit hebben we vertaald naar onderstaande uitgangspunten:
        </motion.p>
      </div>

      {/* Decorative flow line above grid */}
      <motion.div {...fadeIn(0.1)} className="flex justify-center mb-12">
        <FlowLine color={C.primary} className="w-64 opacity-30" />
      </motion.div>

      {/* Cards grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {architectuurData.map((service, i) => (
          <ArchitectuurCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </div>
  </section>
)

/* ================================================================== */
/*  SECTIE 5: SAMENWERKING                                            */
/* ================================================================== */

const SamenwerkingSection = () => (
  <section id="samenwerking" style={{ backgroundColor: C.bg }}>
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Organic illustration */}
        <motion.div {...scaleIn(0)} className="relative order-2 lg:order-1">
          <div className="relative rounded-3xl overflow-hidden p-10 md:p-14" style={{ backgroundColor: C.surface }}>
            <svg viewBox="0 0 400 300" fill="none" className="w-full h-auto" aria-hidden="true">
              {/* Central hub */}
              <circle cx="200" cy="150" r="30" fill={C.primary} opacity={0.12} />
              <circle cx="200" cy="150" r="15" fill={C.primary} opacity={0.3} />
              <circle cx="200" cy="150" r="6" fill={C.primary} />

              {/* Outer nodes - partners / organizations */}
              {[
                { cx: 80, cy: 80, color: C.accent },
                { cx: 320, cy: 80, color: C.gold },
                { cx: 80, cy: 220, color: C.gold },
                { cx: 320, cy: 220, color: C.accent },
                { cx: 50, cy: 150, color: C.primary },
                { cx: 350, cy: 150, color: C.primary },
              ].map((node, i) => (
                <g key={i}>
                  <line x1="200" y1="150" x2={node.cx} y2={node.cy} stroke={C.primary} strokeWidth={1} opacity={0.2} strokeDasharray="4 4" />
                  <circle cx={node.cx} cy={node.cy} r="16" fill={node.color} opacity={0.12} />
                  <circle cx={node.cx} cy={node.cy} r="8" fill={node.color} opacity={0.5} />
                  <circle cx={node.cx} cy={node.cy} r="3" fill={node.color} />
                </g>
              ))}

              {/* Secondary connections between outer nodes */}
              <line x1="80" y1="80" x2="320" y2="80" stroke={C.gold} strokeWidth={0.8} opacity={0.12} strokeDasharray="3 5" />
              <line x1="80" y1="220" x2="320" y2="220" stroke={C.accent} strokeWidth={0.8} opacity={0.12} strokeDasharray="3 5" />
              <line x1="80" y1="80" x2="80" y2="220" stroke={C.primary} strokeWidth={0.8} opacity={0.12} strokeDasharray="3 5" />
              <line x1="320" y1="80" x2="320" y2="220" stroke={C.primary} strokeWidth={0.8} opacity={0.12} strokeDasharray="3 5" />

              {/* Central label */}
              <text x="200" y="155" textAnchor="middle" fill={C.white} fontSize={7} fontFamily="'Outfit', sans-serif" fontWeight={600}>
                OpenGrip
              </text>

              {/* Background glow */}
              <circle cx="200" cy="150" r="100" fill={C.primary} opacity={0.04} />
            </svg>

            {/* Decorative leaves */}
            <div className="absolute top-4 right-4">
              <LeafSVG size={36} color={C.primary} />
            </div>
            <div className="absolute bottom-4 left-4 rotate-180">
              <LeafSVG size={28} color={C.gold} />
            </div>
          </div>
        </motion.div>

        {/* Right: Text content */}
        <div className="order-1 lg:order-2">
          <motion.div {...fadeUp(0.1)} className="mb-4">
            <span
              className="text-sm font-semibold tracking-wider uppercase"
              style={{ fontFamily: "'Outfit', sans-serif", color: C.accentText }}
            >
              Samenwerking
            </span>
          </motion.div>
          <motion.h2
            {...fadeUp(0.2)}
            className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-6"
            style={{ fontFamily: "'Fraunces', serif", color: C.dark }}
          >
            Samen ontwikkelen, samen{' '}
            <em style={{ color: C.primary, fontStyle: 'italic' }}>opschalen</em>
          </motion.h2>
          <motion.p
            {...fadeUp(0.3)}
            className="text-base md:text-lg leading-relaxed mb-4"
            style={{ fontFamily: "'Outfit', sans-serif", color: C.muted }}
          >
            Een gezond informatie-ecosysteem bouw je niet alleen, maar samen.
          </motion.p>
          <motion.p
            {...fadeUp(0.35)}
            className="text-base md:text-lg leading-relaxed mb-4"
            style={{ fontFamily: "'Outfit', sans-serif", color: C.muted }}
          >
            Bronwijs ontwikkelt de open kern. Structurele regie ontstaat wanneer overheden, samenwerkingsverbanden en partners gezamenlijk bouwen aan een open fundament.
          </motion.p>
          <motion.p
            {...fadeUp(0.4)}
            className="text-base md:text-lg leading-relaxed mb-8"
            style={{ fontFamily: "'Outfit', sans-serif", color: C.muted }}
          >
            Wij werken toe naar samenwerking met launching overheidspartners, implementatiepartners en leveranciers binnen Common Ground.
          </motion.p>

          {/* Key insight */}
          <motion.div
            {...fadeUp(0.5)}
            className="p-6 rounded-2xl"
            style={{ backgroundColor: `${C.primary}08`, border: `1px solid ${C.primary}15` }}
          >
            <div className="flex items-start gap-3">
              <LeafSVG size={24} color={C.primary} className="shrink-0 mt-1" />
              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: "'Outfit', sans-serif", color: C.dark }}
              >
                In plaats van 250 afzonderlijke keuzes ontstaat een gezamenlijk fundament. Zo kan innovatiebudget gerichter worden ingezet en ontstaat schaal zonder centralisatie.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
)

/* ================================================================== */
/*  SECTIE 6: KERNWAARDEN                                             */
/* ================================================================== */

const kernwaarden = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="14" stroke={C.primary} strokeWidth={1.5} opacity={0.3} />
        <path d="M16 6V16L22 22" stroke={C.primary} strokeWidth={2} strokeLinecap="round" />
        <circle cx="16" cy="16" r="2" fill={C.primary} />
      </svg>
    ),
    title: 'Publiek geld vraagt een open kern',
    desc: 'Wij geloven niet in het opsluiten van core functionaliteiten in lange licentiestructuren zonder flexibiliteit. De kern hoort altijd open, transparant, herbruikbaar en eerlijk in onderhoud te zijn. Overheden horen niet te betalen voor afhankelijkheid. Dat is onze belofte. Zelfs als we in de toekomst aanvullende modules ontwikkelen op licentiebasis, blijven maandelijks opzegbaar.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M4 28L16 4L28 28H4Z" stroke={C.accent} strokeWidth={1.5} opacity={0.3} fill="none" />
        <path d="M10 22L16 10L22 22" stroke={C.accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="10" r="2" fill={C.accent} />
      </svg>
    ),
    title: 'Samenwerken is geen marketingterm',
    desc: 'Wij bouwen bewust open. Dit zodat andere leveranciers, implementatiepartners, adviseurs en samenwerkingsverbanden kunnen aansluiten, doorontwikkelen en adviseren. Dat is onze belofte voor een gezond open ecosysteem.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="24" height="24" rx="4" stroke={C.gold} strokeWidth={1.5} opacity={0.3} />
        <path d="M10 16L14 20L22 12" stroke={C.gold} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Regie hoort bij de overheid',
    desc: 'De overheid is altijd in regie. De overheid beheert de informatie over haar inwoners, bedrijven en partners. We hebben een duidelijke visie en mening als technologie partner maar de regie laten we bij de overheid.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="12" stroke={C.primary} strokeWidth={1.5} opacity={0.3} />
        <path d="M16 8C12 8 8 12 12 16C16 20 12 24 16 24C20 24 24 20 20 16C16 12 20 8 16 8Z" fill={C.primary} opacity={0.2} />
        <path d="M16 4V8M16 24V28M4 16H8M24 16H28" stroke={C.primary} strokeWidth={1.5} strokeLinecap="round" />
      </svg>
    ),
    title: 'Aan transparantie moet je werken',
    desc: 'Transparantie is voor ons een leidend begrip. Zelf zijn we transparant over onszelf, over samenwerkingen, over licenties en wat we (niet) bieden. Transparantie komt niet vanzelf, ook niet bij de overheid. Daarom willen we ook actief meewerken aan een transparante en eerlijke overheid daar waar het kan.',
  },
]

const KernwaardenSection = () => (
  <section id="kernwaarden" style={{ backgroundColor: C.surface }}>
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
        {/* Left title */}
        <div className="lg:col-span-2">
          <motion.div {...fadeUp(0)}>
            <span
              className="text-sm font-semibold tracking-wider uppercase"
              style={{ fontFamily: "'Outfit', sans-serif", color: C.accentText }}
            >
              Bronwijs kernwaarden
            </span>
          </motion.div>
          <motion.h2
            {...fadeUp(0.1)}
            className="text-3xl md:text-4xl leading-tight mt-4 mb-6"
            style={{ fontFamily: "'Fraunces', serif", color: C.dark }}
          >
            Onze 4 kernwaarden zitten{' '}
            <em style={{ color: C.primary, fontStyle: 'italic' }}>diepgeworteld</em>
          </motion.h2>
          <motion.p
            {...fadeUp(0.2)}
            className="text-base leading-relaxed mb-4"
            style={{ fontFamily: "'Outfit', sans-serif", color: C.muted }}
          >
            Wij geloven dat goede informatievoorziening geen luxe is maar een noodzaak. Een noodzaak voor inwoners, voor bedrijven maar zeker ook voor de ambtenaren. Het kan transparanter, efficienter, eerlijker en met meer samenhang.
          </motion.p>
          <motion.p
            {...fadeUp(0.25)}
            className="text-base leading-relaxed mb-8"
            style={{ fontFamily: "'Outfit', sans-serif", color: C.muted }}
          >
            Dat is onze gezamenlijke verantwoordelijkheid. Ook van ons als technologie partner. Daarom onze 4 kernwaarden:
          </motion.p>

          {/* Decorative organic illustration */}
          <motion.div {...fadeIn(0.3)} className="hidden lg:block">
            <svg width="160" height="200" viewBox="0 0 160 200" fill="none" aria-hidden="true">
              {/* Stem */}
              <path d="M80 200V100" stroke={C.primary} strokeWidth={2} strokeLinecap="round" opacity={0.4} />
              <path d="M80 100C80 100 80 60 80 40" stroke={C.primary} strokeWidth={1.5} strokeLinecap="round" opacity={0.3} />
              {/* Leaves */}
              <path d="M80 140C60 130 40 140 50 155C60 170 80 140 80 140Z" fill={C.primary} opacity={0.12} />
              <path d="M80 120C100 110 120 120 110 135C100 150 80 120 80 120Z" fill={C.gold} opacity={0.12} />
              <path d="M80 90C60 80 40 90 50 105C60 120 80 90 80 90Z" fill={C.accent} opacity={0.12} />
              <path d="M80 60C100 50 110 60 105 75C100 90 80 60 80 60Z" fill={C.primary} opacity={0.12} />
              {/* Top */}
              <circle cx="80" cy="32" r="8" fill={C.primary} opacity={0.15} />
              <circle cx="80" cy="32" r="4" fill={C.primary} opacity={0.3} />
              {/* Small details */}
              <circle cx="50" cy="155" r="3" fill={C.primary} opacity={0.2} />
              <circle cx="110" cy="135" r="3" fill={C.gold} opacity={0.2} />
              <circle cx="50" cy="105" r="3" fill={C.accent} opacity={0.2} />
              <circle cx="105" cy="75" r="3" fill={C.primary} opacity={0.2} />
            </svg>
          </motion.div>
        </div>

        {/* Right: kernwaarden grid */}
        <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
          {kernwaarden.map((p, i) => (
            <motion.div
              key={p.title}
              {...fadeUp(0.15 * i)}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="p-7 rounded-2xl cursor-default"
              style={{
                backgroundColor: C.bg,
                border: `1px solid ${C.primary}10`,
                boxShadow: `0 1px 6px ${C.primary}06`,
              }}
            >
              <div className="mb-5">{p.icon}</div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "'Fraunces', serif", color: C.dark }}
              >
                {p.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "'Outfit', sans-serif", color: C.muted }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

/* ================================================================== */
/*  SECTIE 7: CTA (Call to Action)                                    */
/* ================================================================== */

const CTASection = () => (
  <section id="contact" className="relative overflow-hidden"
    style={{
      background: `linear-gradient(165deg, ${C.dark} 0%, #2D4A34 20%, ${C.primary} 42%, #7BA068 55%, ${C.gold} 72%, ${C.accent} 90%, #D4685A 100%)`,
    }}
  >
    {/* Warm light overlay from bottom-right */}
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(ellipse at 70% 80%, ${C.gold}40 0%, transparent 60%)`,
      }}
    />

    {/* Organic overlay shapes */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] opacity-10">
        <BlobSVG color="#FFFFFF" opacity={0.15} className="w-full h-full" />
      </div>
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] opacity-10">
        <BlobSVG color="#FFFFFF" opacity={0.12} className="w-full h-full" />
      </div>

      {/* Landscape silhouette at bottom */}
      <svg
        viewBox="0 0 1440 200"
        className="absolute bottom-0 left-0 w-full opacity-10"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ height: '120px' }}
      >
        <path
          d="M0 200V140C60 130 120 100 200 110C280 120 340 90 420 80C500 70 560 95 640 100C720 105 780 85 860 75C940 65 1000 90 1080 95C1160 100 1220 80 1300 85C1380 90 1420 100 1440 110V200H0Z"
          fill="white"
        />
        {/* Tree silhouettes */}
        <path d="M200 110C200 110 195 80 200 60C205 80 200 110 200 110Z" fill="white" />
        <path d="M640 100C640 100 633 65 640 40C647 65 640 100 640 100Z" fill="white" />
        <path d="M1080 95C1080 95 1074 60 1080 35C1086 60 1080 95 1080 95Z" fill="white" />
        <path d="M420 80C420 80 415 55 420 35C425 55 420 80 420 80Z" fill="white" />
        <path d="M860 75C860 75 854 48 860 28C866 48 860 75 860 75Z" fill="white" />
      </svg>

      {/* Floating particles */}
      {[
        { x: '15%', y: '30%', size: 4, delay: 0 },
        { x: '85%', y: '25%', size: 3, delay: 1 },
        { x: '45%', y: '70%', size: 5, delay: 0.5 },
        { x: '70%', y: '40%', size: 3, delay: 1.5 },
        { x: '25%', y: '60%', size: 4, delay: 2 },
        { x: '90%', y: '65%', size: 3, delay: 0.8 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={{ y: [-8, 8, -8], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, delay: p.delay, repeat: Infinity }}
        />
      ))}
    </div>

    <div className="relative max-w-4xl mx-auto px-6 md:px-10 py-24 md:py-36 text-center">
      <motion.div {...fadeUp(0)}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
          <LeafSVG size={16} color="#FFFFFF" />
          <span
            className="text-xs font-semibold tracking-wider uppercase text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Klaar om te planten?
          </span>
        </div>
      </motion.div>

      <motion.h2
        {...fadeUp(0.1)}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-white mb-6"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Kies voor regie, kies voor een{' '}
        <span className="underline decoration-2 underline-offset-4" style={{ color: C.white }}>open fundament</span>
      </motion.h2>

      <motion.div
        {...fadeUp(0.2)}
        className="text-lg md:text-xl leading-relaxed text-white/90 mb-10 max-w-2xl mx-auto space-y-4"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <p>
          Informatie groeit elke dag sneller. De vraag is niet of we daarop reageren, maar hoe.
        </p>
        <p>
          Blijven we versnippering repareren? Of bouwen we samen aan een gedeelde, open basis?
        </p>
        <p>
          Bronwijs bouwt de stam onder het informatie-ecosysteem. Samen kunnen we dat fundament realiseren.
        </p>
      </motion.div>

      <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="mailto:info@bronwijs.nl"
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{ fontFamily: "'Outfit', sans-serif", color: C.dark }}
        >
          Plan een gesprek
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
            <path d="M4 10H16M12 6L16 10L12 14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <a
          href="#over-ons"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold text-base transition-all duration-300 hover:bg-white/20 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Bekijk OpenGrip
        </a>
        <a
          href="mailto:info@bronwijs.nl"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold text-base transition-all duration-300 hover:bg-white/20 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Word launching partner
        </a>
      </motion.div>
    </div>
  </section>
)

/* ================================================================== */
/*  SECTIE 8: FOOTER                                                  */
/* ================================================================== */

const Footer = () => (
  <footer className="relative overflow-hidden" style={{ backgroundColor: C.dark }}>
    {/* Subtle organic background shape */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.03] pointer-events-none">
      <BlobSVG color="#FFFFFF" opacity={0.5} className="w-full h-full" />
    </div>
    <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
        {/* Brand column */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <circle cx="18" cy="18" r="16" fill={C.primary} opacity={0.2} />
              <path
                d="M18 6C18 6 10 12 10 20C10 25 13 28 18 30C23 28 26 25 26 20C26 12 18 6 18 6Z"
                fill={C.primary}
                opacity={0.35}
              />
              <path
                d="M18 10V28M18 16C15.5 14 13 15.5 13 15.5M18 22C20.5 20 23 21.5 23 21.5"
                stroke={C.primary}
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            </svg>
            <span className="text-lg font-semibold text-white" style={{ fontFamily: "'Fraunces', serif" }}>
              Bron<span style={{ color: C.primaryLight }}>wijs</span>
            </span>
          </div>
          <p
            className="text-sm leading-relaxed mb-6 max-w-xs"
            style={{ fontFamily: "'Outfit', sans-serif", color: C.footerText }}
          >
            Grip op informatie, aantoonbaar. Wij helpen overheidsorganisaties hun
            informatiehuishouding op orde te brengen.
          </p>
          <div className="flex gap-3">
            {/* Social icons */}
            {[
              { label: 'GitHub', d: 'M16 2C8.27 2 2 8.27 2 16C2 22.08 5.85 27.17 11.15 29.04C11.75 29.15 11.98 28.78 11.98 28.47V25.92C8.36 26.66 7.66 24.1 7.66 24.1C7.1 22.49 6.3 22.12 6.3 22.12C5.18 21.36 6.38 21.38 6.38 21.38C7.62 21.46 8.28 22.63 8.28 22.63C9.36 24.49 11.15 23.93 11.99 23.63C12.1 22.86 12.42 22.34 12.76 22.06C9.82 21.77 6.73 20.64 6.73 15.2C6.73 13.62 7.22 12.34 8.1 11.33C7.97 11.05 7.54 9.57 8.22 7.59C8.22 7.59 9.24 7.29 11.97 9.15C12.96 8.89 14.01 8.76 15.06 8.76C16.11 8.76 17.16 8.89 18.15 9.15C20.88 7.29 21.89 7.59 21.89 7.59C22.58 9.57 22.14 11.05 22.02 11.33C22.9 12.34 23.38 13.62 23.38 15.2C23.38 20.66 20.28 21.77 17.32 22.04C17.76 22.41 18.15 23.14 18.15 24.26V28.47C18.15 28.79 18.37 29.16 18.99 29.04C24.27 27.16 28.1 22.07 28.1 16C28.1 8.27 21.84 2 14.1 2' },
              { label: 'Facebook', d: 'M22 4H18C15.24 4 14 5.24 14 8V12H10V16H14V28H18V16H22L23 12H18V8.5C18 8.22 18.22 8 18.5 8H22V4Z' },
              { label: 'LinkedIn', d: 'M26 2H6C3.79 2 2 3.79 2 6V26C2 28.21 3.79 30 6 30H26C28.21 30 30 28.21 30 26V6C30 3.79 28.21 2 26 2ZM10 26H6V12H10V26ZM8 10.3C6.84 10.3 5.9 9.36 5.9 8.2C5.9 7.04 6.84 6.1 8 6.1C9.16 6.1 10.1 7.04 10.1 8.2C10.1 9.36 9.16 10.3 8 10.3ZM26 26H22V18.6C22 16.92 21.2 16 19.9 16C18.52 16 17.6 16.96 17.6 18.6V26H14V12H17.6V13.8C18.14 12.7 19.5 11.8 21.16 11.8C23.86 11.8 26 13.7 26 17.2V26Z' },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#4A7C59]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{ backgroundColor: `${C.primary}15` }}
              >
                <svg width="16" height="16" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                  <path d={social.d} fill={C.primary} opacity={0.7} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Links columns */}
        {[
          {
            heading: 'OpenGrip',
            items: [
              { label: 'OpenGrip', href: '#over-ons' },
              { label: 'Architectuur', href: '#architectuur' },
              { label: 'Samenwerking', href: '#samenwerking' },
              { label: 'Visie', href: '#urgentie' },
              { label: 'Contact', href: '#contact' },
            ],
          },
          {
            heading: 'Bronwijs',
            items: [
              { label: 'Over ons', href: '#over-ons' },
              { label: 'Team', href: '#' },
              { label: 'Vacatures', href: '#' },
              { label: 'Blog', href: '#' },
              { label: 'Kennis & publicaties', href: '#' },
            ],
          },
          {
            heading: 'Contact',
            items: [
              { label: 'info@bronwijs.nl', href: 'mailto:info@bronwijs.nl' },
              { label: '030 200 1234', href: 'tel:+31302001234' },
              { label: 'Maliebaan 50', href: '#' },
              { label: '3581 CS Utrecht', href: '#' },
              { label: 'KvK: 12345678', href: '#' },
            ],
          },
        ].map((col) => (
          <div key={col.heading}>
            <h4
              className="text-sm font-semibold text-white mb-4 tracking-wider uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {col.heading}
            </h4>
            <ul className="space-y-3">
              {col.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    style={{ fontFamily: "'Outfit', sans-serif", color: C.footerText }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: `1px solid ${C.primary}18` }}
      >
        <p
          className="text-xs"
          style={{ fontFamily: "'Outfit', sans-serif", color: C.footerMuted }}
        >
          &copy; {new Date().getFullYear()} Bronwijs. Alle rechten voorbehouden.
        </p>
        <div className="flex items-center gap-6">
          {['Privacybeleid', 'Cookiebeleid', 'Algemene voorwaarden'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ fontFamily: "'Outfit', sans-serif", color: C.footerMuted }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
)

/* ================================================================== */
/*  MAIN PAGE COMPONENT                                               */
/* ================================================================== */

export default function BronwijsPage() {
  useEffect(() => {
    document.title = 'Bronwijs — Informatiebeheer voor de overheid'
  }, [])

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: C.bg, fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Outfit:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[100] focus:px-6 focus:py-3 focus:rounded-full focus:text-sm focus:font-semibold focus:shadow-lg"
        style={{
          fontFamily: "'Outfit', sans-serif",
          backgroundColor: C.primary,
          color: C.white,
        }}
      >
        Ga naar hoofdinhoud
      </a>

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main id="main-content">
      {/* SECTIE 1: Hero */}
      <HeroSection />

      {/* Wave: Hero -> Urgentie */}
      <WaveDividerAlt toColor={C.dark} />

      {/* SECTIE 2: Urgentie / Stats */}
      <UrgentieSection />

      {/* Wave: Urgentie -> Over Bronwijs */}
      <WaveDivider fromColor={C.dark} toColor={C.surface} />

      {/* SECTIE 3: Over Bronwijs */}
      <AboutSection />

      {/* Wave: Over Bronwijs -> Architectuur */}
      <WaveDividerAlt toColor={C.surface} />

      {/* SECTIE 4: Architectuurkeuzes */}
      <ArchitectuurSection />

      {/* Wave: Architectuur -> Samenwerking */}
      <WaveDivider fromColor={C.surface} toColor={C.bg} />

      {/* SECTIE 5: Samenwerking */}
      <SamenwerkingSection />

      {/* Wave: Samenwerking -> Kernwaarden */}
      <WaveDividerAlt toColor={C.surface} />

      {/* SECTIE 6: Kernwaarden */}
      <KernwaardenSection />

      {/* Wave: Kernwaarden -> CTA */}
      <WaveDividerAlt toColor={C.primary} />

      {/* SECTIE 7: CTA */}
      <CTASection />
      </main>

      {/* SECTIE 8: Footer */}
      <Footer />
    </div>
  )
}
