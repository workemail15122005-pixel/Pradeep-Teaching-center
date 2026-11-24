import React from 'react';
import { SubjectId, BannerTheme } from '../data/curriculum';

export function DiyaLogo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Warm outer glow */}
      <circle cx="20" cy="14" r="9" fill="#FDE68A" fillOpacity="0.45" />
      {/* Outer flame */}
      <path
        d="M20 5.5C20 5.5 25.5 11.2 25.5 15.8C25.5 18.9 23.04 21.4 20 21.4C16.96 21.4 14.5 18.9 14.5 15.8C14.5 11.2 20 5.5 20 5.5Z"
        fill="#F97316"
      />
      {/* Inner flame */}
      <path
        d="M20 10.2C20 10.2 22.8 13.6 22.8 16.3C22.8 17.95 21.55 19.3 20 19.3C18.45 19.3 17.2 17.95 17.2 16.3C17.2 13.6 20 10.2 20 10.2Z"
        fill="#FACC15"
      />
      {/* Clay Diya bowl */}
      <path
        d="M7.5 23.5C7.5 22.67 8.17 22 9 22H31C31.83 22 32.5 22.67 32.5 23.5C32.5 28.9 27.6 33.2 20 33.2C12.4 33.2 7.5 28.9 7.5 23.5Z"
        fill="#C2410C"
      />
      {/* Rim highlight */}
      <ellipse cx="20" cy="22.8" rx="11.5" ry="1.9" fill="#EA580C" />
      {/* Base stand */}
      <path d="M15.5 32.5H24.5L26 35H14L15.5 32.5Z" fill="#9A3412" />
    </svg>
  );
}

export function PtcEmblemLogo({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ptc-crest-bg" x1="6" y1="4" x2="38" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E3A8A" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      {/* Shield Crest Base */}
      <path
        d="M22 3L38 8.5V21C38 30.8 31.1 37.9 22 41C12.9 37.9 6 30.8 6 21V8.5L22 3Z"
        fill="url(#ptc-crest-bg)"
        stroke="#F59E0B"
        strokeWidth="2"
      />
      {/* Inner Hairline Accent */}
      <path
        d="M22 6L35 10.5V21C35 28.9 29.4 34.8 22 37.5C14.6 34.8 9 28.9 9 21V10.5L22 6Z"
        stroke="#FFFFFF"
        strokeOpacity="0.22"
        strokeWidth="1"
      />
      {/* Top Knowledge Flame */}
      <path
        d="M22 9.5C22 9.5 24.4 12.1 24.4 14.1C24.4 15.4 23.3 16.5 22 16.5C20.7 16.5 19.6 15.4 19.6 14.1C19.6 12.1 22 9.5 22 9.5Z"
        fill="#FACC15"
      />
      {/* Bold P.T.C Monogram */}
      <text
        x="22"
        y="28.5"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
        fontWeight="800"
        fontSize="10.8"
        letterSpacing="0.4"
      >
        P.T.C
      </text>
    </svg>
  );
}

export function WelcomeStudentIllustration({
  theme = 'sky',
  className = '',
}: {
  theme?: BannerTheme;
  className?: string;
}) {
  const accentShirt =
    theme === 'mint' ? '#4F46E5' : theme === 'peach' ? '#F59E0B' : '#F59E0B';
  const bookCover =
    theme === 'mint' ? '#2563EB' : theme === 'peach' ? '#10B981' : '#10B981';

  return (
    <svg
      viewBox="0 0 180 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Subtle geometric background sparkles */}
      <circle cx="24" cy="24" r="4" fill="#FFFFFF" fillOpacity="0.6" />
      <circle cx="152" cy="28" r="5" fill="#FFFFFF" fillOpacity="0.55" />
      <path
        d="M142 98C149 90 156 80 158 68"
        stroke="#0F172A"
        strokeOpacity="0.14"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 4"
      />

      {/* Student torso & shoulders */}
      <path
        d="M44 124C44 100 60 88 84 88C108 88 124 100 124 124H44Z"
        fill={accentShirt}
      />
      {/* Shirt collar */}
      <path d="M72 88L84 99L96 88H72Z" fill="#FFFFFF" />

      {/* Neck & Ears */}
      <rect x="77" y="72" width="14" height="18" rx="7" fill="#FDBA74" />
      <circle cx="62" cy="54" r="5.5" fill="#FDBA74" />
      <circle cx="106" cy="54" r="5.5" fill="#FDBA74" />

      {/* Head */}
      <rect x="64" y="30" width="40" height="46" rx="20" fill="#FED7AA" />
      {/* Hair */}
      <path
        d="M62 47C62 32 72 23 84 23C96 23 106 32 106 47C106 40 100 35 92 35C86 35 82 38 76 38C70 38 64 41 62 47Z"
        fill="#1E293B"
      />
      {/* Eyes & Smile */}
      <circle cx="76" cy="52" r="2.3" fill="#1E293B" />
      <circle cx="92" cy="52" r="2.3" fill="#1E293B" />
      <path
        d="M78 62C80.5 65 87.5 65 90 62"
        stroke="#9A3412"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Open book held by student */}
      <path d="M51 96L84 102V127L51 121V96Z" fill={bookCover} />
      <path d="M117 96L84 102V127L117 121V96Z" fill={bookCover} />
      <path d="M55 93L84 99V122L55 116V93Z" fill="#FFFFFF" />
      <path d="M113 93L84 99V122L113 116V93Z" fill="#F8FAFC" />
      <line x1="84" y1="99" x2="84" y2="122" stroke="#CBD5E1" strokeWidth="1.5" />
      {/* Hands */}
      <circle cx="52" cy="109" r="5" fill="#FED7AA" />
      <circle cx="116" cy="109" r="5" fill="#FED7AA" />

      {/* Stack of books on right */}
      <rect x="128" y="112" width="38" height="10" rx="2" fill="#2563EB" />
      <rect x="131" y="114" width="31" height="4" rx="1" fill="#DBEAFE" />
      <rect x="132" y="101" width="34" height="10" rx="2" fill="#EA580C" />
      <rect x="135" y="103" width="27" height="4" rx="1" fill="#FFEDD5" />
      <rect x="129" y="90" width="36" height="10" rx="2" fill="#0D9488" />
      <rect x="132" y="92" width="29" height="4" rx="1" fill="#CCFBF1" />
    </svg>
  );
}

export function SubjectFolderIcon({
  subjectId,
  className = 'w-11 h-11',
}: {
  subjectId: SubjectId;
  className?: string;
}) {
  if (subjectId === 'physics') {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <circle cx="24" cy="24" r="3.2" fill="white" />
        <ellipse
          cx="24"
          cy="24"
          rx="18"
          ry="7.5"
          transform="rotate(30 24 24)"
          stroke="white"
          strokeWidth="2.2"
          strokeOpacity="0.92"
        />
        <ellipse
          cx="24"
          cy="24"
          rx="18"
          ry="7.5"
          transform="rotate(-30 24 24)"
          stroke="white"
          strokeWidth="2.2"
          strokeOpacity="0.92"
        />
        <ellipse
          cx="24"
          cy="24"
          rx="18"
          ry="7.5"
          transform="rotate(90 24 24)"
          stroke="white"
          strokeWidth="2.2"
          strokeOpacity="0.92"
        />
      </svg>
    );
  }

  if (subjectId === 'chemistry') {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        {/* Beaker */}
        <rect
          x="10"
          y="19"
          width="13"
          height="19"
          rx="2.5"
          stroke="white"
          strokeWidth="2.2"
        />
        <line x1="9" y1="19" x2="24" y2="19" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M12 29H21V36H12V29Z" fill="white" fillOpacity="0.32" />
        {/* Conical Flask */}
        <path
          d="M28 11H36M30 11V19L23.5 34.5C22.9 36 24 38 25.7 38H38.3C40 38 41.1 36 40.5 34.5L34 19V11"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M26 30H38L39.6 35C39.8 35.8 39.2 36.5 38.4 36.5H25.6C24.8 36.5 24.2 35.8 24.4 35L26 30Z" fill="white" fillOpacity="0.35" />
        <circle cx="31" cy="24" r="1.5" fill="white" />
        <circle cx="34" cy="27" r="1.2" fill="white" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="11" y="8" width="26" height="32" rx="4" stroke="white" strokeWidth="2.2" />
      <rect x="15.5" y="13" width="17" height="6.5" rx="1.5" fill="white" fillOpacity="0.28" stroke="white" strokeWidth="1.6" />
      <circle cx="17" cy="25" r="1.7" fill="white" />
      <circle cx="24" cy="25" r="1.7" fill="white" />
      <circle cx="31" cy="25" r="1.7" fill="white" />
      <circle cx="17" cy="30.5" r="1.7" fill="white" />
      <circle cx="24" cy="30.5" r="1.7" fill="white" />
      <circle cx="31" cy="30.5" r="1.7" fill="white" />
      <circle cx="17" cy="35.5" r="1.7" fill="white" />
      <rect x="22" y="34" width="10.5" height="3" rx="1.5" fill="white" />
    </svg>
  );
}

export function LectureThumbnailArt({
  variant,
  progressRatio = 0,
  className = 'w-full h-full',
}: {
  variant: 'motion' | 'periodic' | 'calculus' | 'electrostatics' | 'bonding' | 'integration';
  progressRatio?: number;
  className?: string;
}) {
  if (variant === 'motion') {
    const runnerShift = progressRatio * 52;
    return (
      <svg viewBox="0 0 240 135" fill="none" className={className} aria-hidden="true">
        <defs>
          <linearGradient id="board-motion" x1="0" y1="0" x2="240" y2="135" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1B2838" />
            <stop offset="1" stopColor="#0F172A" />
          </linearGradient>
        </defs>
        <rect width="240" height="135" fill="url(#board-motion)" />
        {/* Subtle chalk grid */}
        <path d="M20 106H220" stroke="#94A3B8" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M28 24V112" stroke="#94A3B8" strokeOpacity="0.3" strokeWidth="1.2" />
        {/* Motion trajectory arc */}
        <path
          d="M36 98C72 48 134 40 198 62"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeDasharray="5 4"
          strokeOpacity="0.8"
        />
        {/* Velocity vector arrow */}
        <path d="M135 50H182" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M176 45L184 50L176 55" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Stylized running silhouette */}
        <g transform={`translate(${runnerShift}, 0)`}>
          <circle cx="84" cy="48" r="7" fill="#E2E8F0" />
          <path
            d="M84 56L76 76L62 94M79 65L96 73L106 89M82 58L67 65L60 58M84 58L99 57L105 49"
            stroke="#E2E8F0"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        {/* Chalk equations */}
        <text x="18" y="28" fill="#93C5FD" fontSize="10" fontFamily="monospace">
          v = u + at
        </text>
        <text x="150" y="34" fill="#FDE68A" fontSize="9.5" fontFamily="monospace">
          s = ut + ½at²
        </text>
      </svg>
    );
  }

  if (variant === 'periodic' || variant === 'bonding') {
    const colors = ['#EF4444', '#F59E0B', '#10B981', '#06B6D4', '#3B82F6', '#8B5CF6'];
    return (
      <svg viewBox="0 0 240 135" fill="none" className={className} aria-hidden="true">
        <defs>
          <linearGradient id="board-chem" x1="0" y1="0" x2="240" y2="135" gradientUnits="userSpaceOnUse">
            <stop stopColor="#16262E" />
            <stop offset="1" stopColor="#0E1726" />
          </linearGradient>
        </defs>
        <rect width="240" height="135" fill="url(#board-chem)" />
        {/* Periodic grid cells */}
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 12 }).map((__, col) => {
            const skip =
              (row === 0 && col > 0 && col < 11) ||
              (row === 1 && col > 1 && col < 7);
            if (skip) return null;
            const color = colors[(col + row) % colors.length];
            const active =
              progressRatio > 0 &&
              Math.floor(progressRatio * 12) === col;
            return (
              <rect
                key={`${row}-${col}`}
                x={22 + col * 16.5}
                y={22 + row * 15.5}
                width="14"
                height="13"
                rx="2"
                fill={color}
                fillOpacity={active ? 0.95 : 0.72}
                stroke={active ? '#FFFFFF' : '#FFFFFF'}
                strokeOpacity={active ? 0.95 : 0.25}
                strokeWidth={active ? 1.2 : 0.7}
              />
            );
          }),
        )}
        <text x="72" y="34" fill="#A7F3D0" fontSize="9.5" fontFamily="monospace">
          Z_eff = Z - σ
        </text>
      </svg>
    );
  }

  if (variant === 'electrostatics') {
    return (
      <svg viewBox="0 0 240 135" fill="none" className={className} aria-hidden="true">
        <rect width="240" height="135" fill="#132238" />
        <circle cx="120" cy="67" r="22" stroke="#60A5FA" strokeWidth="2.5" fill="#1D4ED8" fillOpacity="0.3" />
        <circle cx="120" cy="67" r="44" stroke="#93C5FD" strokeWidth="1.2" strokeDasharray="4 4" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="120"
            y1="67"
            x2={120 + Math.cos((deg * Math.PI) / 180) * 58}
            y2={67 + Math.sin((deg * Math.PI) / 180) * 58}
            stroke="#FBBF24"
            strokeWidth="1.4"
            strokeOpacity="0.7"
          />
        ))}
        <text x="16" y="25" fill="#BFDBFE" fontSize="10" fontFamily="monospace">
          ∮ E·dA = q/ε₀
        </text>
      </svg>
    );
  }

  // Calculus & Integration chalkboard
  const tangentX = 68 + progressRatio * 96;
  return (
    <svg viewBox="0 0 240 135" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="board-calc" x1="0" y1="0" x2="240" y2="135" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1D2233" />
          <stop offset="1" stopColor="#101522" />
        </linearGradient>
      </defs>
      <rect width="240" height="135" fill="url(#board-calc)" />
      {/* Axes */}
      <line x1="24" y1="76" x2="218" y2="76" stroke="#94A3B8" strokeWidth="1.4" />
      <line x1="92" y1="16" x2="92" y2="120" stroke="#94A3B8" strokeWidth="1.4" />
      {/* Smooth curve */}
      <path
        d="M30 98C55 32 76 30 98 76C120 120 148 118 184 36"
        stroke="#C4B5FD"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Area highlight under curve if integration */}
      {variant === 'integration' && (
        <path
          d="M98 76C120 120 148 118 164 76H98Z"
          fill="#8B5CF6"
          fillOpacity="0.28"
        />
      )}
      {/* Tangent line & point */}
      <circle cx={tangentX} cy="56" r="4" fill="#FBBF24" />
      <line x1={tangentX - 24} y1="72" x2={tangentX + 24} y2="40" stroke="#FBBF24" strokeWidth="1.6" strokeDasharray="3 3" />
      <text x="128" y="32" fill="#E9D5FF" fontSize="10" fontFamily="monospace">
        dy/dx = f′(x)
      </text>
      <text x="132" y="110" fill="#93C5FD" fontSize="9.5" fontFamily="monospace">
        ∫ f(x) dx
      </text>
    </svg>
  );
}
