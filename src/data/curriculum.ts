export type SubjectId = 'physics' | 'chemistry' | 'mathematics';
export type BannerTheme = 'sky' | 'mint' | 'peach';

export interface SubjectTopic {
  id: string;
  chapter: string;
  title: string;
  duration: string;
  difficulty: 'Foundation' | 'Board' | 'JEE Advanced';
  keyFormula?: string;
}

export interface SubjectFolder {
  id: SubjectId;
  name: string;
  displayTitle: string;
  topicCountLabel: string;
  accentHex: string;
  gradientClass: string;
  softBgClass: string;
  textAccentClass: string;
  instructor: string;
  description: string;
  topics: SubjectTopic[];
}

export interface LectureChapter {
  timeSec: number;
  timeLabel: string;
  title: string;
  boardNote: string;
}

export interface VideoLecture {
  id: string;
  title: string;
  subjectId: SubjectId;
  subjectName: string;
  durationLabel: string;
  durationSec: number;
  instructor: string;
  thumbnailVariant: 'motion' | 'periodic' | 'calculus' | 'electrostatics' | 'bonding' | 'integration';
  summary: string;
  keyTakeaways: string[];
  chapters: LectureChapter[];
}

export interface PdfNoteItem {
  id: string;
  title: string;
  subtitle: string;
  subjectId: SubjectId;
  pages: number;
  updatedLabel: string;
  sections: {
    heading: string;
    formula?: string;
    points: string[];
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  subject: string;
}

export interface QuestionBankItem {
  id: string;
  title: string;
  subtitle: string;
  subjectLabel: string;
  year: string;
  totalQuestions: number;
  durationMins: number;
  questions: QuizQuestion[];
}

export interface LiveClassSession {
  id: string;
  title: string;
  subjectId: SubjectId;
  instructor: string;
  scheduleLabel: string;
  isLiveNow: boolean;
  attendees: number;
  topicFocus: string;
  initialMessages: {
    id: string;
    sender: string;
    text: string;
    time: string;
    isTeacher?: boolean;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  detail: string;
  timeLabel: string;
  unread: boolean;
  targetTab?: 'home' | 'courses' | 'live' | 'activity' | 'profile';
}

export const SUBJECT_FOLDERS: SubjectFolder[] = [
  {
    id: 'physics',
    name: 'PHYSICS',
    displayTitle: 'Physics',
    topicCountLabel: '120+ Topics',
    accentHex: '#3584E4',
    gradientClass: 'bg-gradient-to-br from-[#4796F2] to-[#2B78D4]',
    softBgClass: 'bg-blue-50',
    textAccentClass: 'text-blue-700',
    instructor: 'Pradeep Sir',
    description: 'Mechanics, Electrodynamics, Optics, and Modern Physics for CBSE & JEE.',
    topics: [
      {
        id: 'phy-1',
        chapter: 'Chapter 1 · Kinematics',
        title: 'Motion in a Straight Line & Relative Velocity',
        duration: '45 min',
        difficulty: 'Foundation',
        keyFormula: 'v = u + at,  s = ut + ½at²',
      },
      {
        id: 'phy-2',
        chapter: 'Chapter 2 · Kinematics',
        title: 'Projectile Motion & River-Boat Problems',
        duration: '50 min',
        difficulty: 'JEE Advanced',
        keyFormula: 'R = (u² sin 2θ) / g',
      },
      {
        id: 'phy-3',
        chapter: 'Chapter 3 · Laws of Motion',
        title: 'Free Body Diagrams, Pulleys & Friction',
        duration: '55 min',
        difficulty: 'Board',
        keyFormula: 'f_max = μ_s N',
      },
      {
        id: 'phy-4',
        chapter: 'Chapter 4 · Electrostatics',
        title: "Coulomb's Law & Gauss Theorem Applications",
        duration: '48 min',
        difficulty: 'Board',
        keyFormula: '∮ E · dA = q_in / ε₀',
      },
      {
        id: 'phy-5',
        chapter: 'Chapter 5 · Optics',
        title: 'Refraction Through Lenses & Prism Deviation',
        duration: '42 min',
        difficulty: 'JEE Advanced',
        keyFormula: '1/f = (n - 1)(1/R₁ - 1/R₂)',
      },
    ],
  },
  {
    id: 'chemistry',
    name: 'CHEMISTRY',
    displayTitle: 'Chemistry',
    topicCountLabel: '115+ Topics',
    accentHex: '#34C076',
    gradientClass: 'bg-gradient-to-br from-[#42CF84] to-[#2AA864]',
    softBgClass: 'bg-emerald-50',
    textAccentClass: 'text-emerald-700',
    instructor: 'Anjali Ma’am',
    description: 'Physical, Inorganic & Organic Chemistry with reaction mechanisms & trends.',
    topics: [
      {
        id: 'chem-1',
        chapter: 'Chapter 1 · Periodicity',
        title: 'Modern Periodic Table & Electronic Configuration',
        duration: '38 min',
        difficulty: 'Foundation',
        keyFormula: 'Z_eff = Z - σ',
      },
      {
        id: 'chem-2',
        chapter: 'Chapter 2 · Chemical Bonding',
        title: 'VSEPR Theory, Hybridization & Molecular Orbitals',
        duration: '46 min',
        difficulty: 'Board',
        keyFormula: 'Bond Order = ½(N_b - N_a)',
      },
      {
        id: 'chem-3',
        chapter: 'Chapter 3 · Thermodynamics',
        title: 'Enthalpy, Entropy & Gibbs Free Energy',
        duration: '52 min',
        difficulty: 'JEE Advanced',
        keyFormula: 'ΔG = ΔH - TΔS',
      },
      {
        id: 'chem-4',
        chapter: 'Chapter 4 · Electrochemistry',
        title: 'Nernst Equation & Conductance Variations',
        duration: '44 min',
        difficulty: 'Board',
        keyFormula: 'E = E° - (0.0591/n) log Q',
      },
      {
        id: 'chem-5',
        chapter: 'Chapter 5 · Organic Chemistry',
        title: 'SN1, SN2 & Elimination Reaction Mechanisms',
        duration: '58 min',
        difficulty: 'JEE Advanced',
        keyFormula: 'Rate(SN2) = k[R-X][Nu⁻]',
      },
    ],
  },
  {
    id: 'mathematics',
    name: 'MATHEMATICS',
    displayTitle: 'Mathematics',
    topicCountLabel: '130+ Topics',
    accentHex: '#9261E5',
    gradientClass: 'bg-gradient-to-br from-[#A173F0] to-[#7C4CD4]',
    softBgClass: 'bg-violet-50',
    textAccentClass: 'text-violet-700',
    instructor: 'Pradeep Sir',
    description: 'Calculus, Coordinate Geometry, Algebra & Vectors with step-by-step proofs.',
    topics: [
      {
        id: 'math-1',
        chapter: 'Chapter 1 · Differential Calculus',
        title: 'Limits, Continuity & First Principle Derivatives',
        duration: '52 min',
        difficulty: 'Foundation',
        keyFormula: "f'(x) = lim(h→0) [f(x+h) - f(x)] / h",
      },
      {
        id: 'math-2',
        chapter: 'Chapter 2 · Integral Calculus',
        title: 'Integration by Substitution & King Property',
        duration: '56 min',
        difficulty: 'JEE Advanced',
        keyFormula: '∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx',
      },
      {
        id: 'math-3',
        chapter: 'Chapter 3 · Matrices',
        title: 'Determinants, Adjoint & System of Linear Equations',
        duration: '40 min',
        difficulty: 'Board',
        keyFormula: 'A · adj(A) = |A| I',
      },
      {
        id: 'math-4',
        chapter: 'Chapter 4 · Coordinate Geometry',
        title: 'Conic Sections: Parabola, Ellipse & Tangents',
        duration: '49 min',
        difficulty: 'JEE Advanced',
        keyFormula: 'y = mx + a/m  (Tangent to y² = 4ax)',
      },
      {
        id: 'math-5',
        chapter: 'Chapter 5 · Vectors & 3D',
        title: 'Shortest Distance Between Skew Lines',
        duration: '36 min',
        difficulty: 'Board',
        keyFormula: 'd = |(a₂ - a₁) · (b₁ × b₂)| / |b₁ × b₂|',
      },
    ],
  },
];

export const VIDEO_LECTURES: VideoLecture[] = [
  {
    id: 'lec-motion-1d',
    title: 'Motion in 1D',
    subjectId: 'physics',
    subjectName: 'Physics',
    durationLabel: '45 min',
    durationSec: 2700,
    instructor: 'Pradeep Sir',
    thumbnailVariant: 'motion',
    summary:
      'Master displacement-time graphs, instantaneous velocity, uniform acceleration equations, and free-fall problem solving.',
    keyTakeaways: [
      'Slope of x-t graph gives instantaneous velocity; slope of v-t graph gives acceleration.',
      'Area under the velocity-time curve represents total displacement.',
      'Equations of motion apply strictly when acceleration remains constant.',
    ],
    chapters: [
      {
        timeSec: 0,
        timeLabel: '00:00',
        title: 'Distance vs Displacement & Frame of Reference',
        boardNote: 'Δx = x_final - x_initial  |  |Δx| ≤ Distance',
      },
      {
        timeSec: 680,
        timeLabel: '11:20',
        title: 'Average vs Instantaneous Velocity',
        boardNote: 'v = dx/dt  (Tangent slope on position-time curve)',
      },
      {
        timeSec: 1440,
        timeLabel: '24:00',
        title: 'Deriving the Three Kinematic Equations',
        boardNote: 'v = u + at  |  s = ut + ½at²  |  v² = u² + 2as',
      },
      {
        timeSec: 2100,
        timeLabel: '35:00',
        title: 'Motion Under Gravity & JEE Numericals',
        boardNote: 'Galileo Law of Odd Numbers: 1 : 3 : 5 : 7',
      },
    ],
  },
  {
    id: 'lec-periodic-table',
    title: 'Periodic Table',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    durationLabel: '38 min',
    durationSec: 2280,
    instructor: 'Anjali Ma’am',
    thumbnailVariant: 'periodic',
    summary:
      'Understand s, p, d, f block classification, atomic radius trends, ionization enthalpy exceptions, and electronegativity scales.',
    keyTakeaways: [
      'Across a period, effective nuclear charge increases and atomic radius decreases.',
      'Half-filled (p³) and fully-filled (p⁶) subshells show higher ionization energy.',
      'Diagonal relationships connect Li–Mg and Be–Al due to similar charge/radius ratio.',
    ],
    chapters: [
      {
        timeSec: 0,
        timeLabel: '00:00',
        title: 'Modern Periodic Law & Block Classification',
        boardNote: '7 Periods · 18 Groups · s, p, d, f Blocks',
      },
      {
        timeSec: 600,
        timeLabel: '10:00',
        title: 'Screening Effect & Slater’s Rule',
        boardNote: 'Z_eff = Z - σ  (Shielding order: s > p > d > f)',
      },
      {
        timeSec: 1320,
        timeLabel: '22:00',
        title: 'Ionization Enthalpy & Key Exceptions',
        boardNote: 'IE₁: Be > B  and  N > O  (Half/Full orbital stability)',
      },
      {
        timeSec: 1860,
        timeLabel: '31:00',
        title: 'Electron Gain Enthalpy & Pauling Scale',
        boardNote: 'Electron Affinity: Cl > F > Br > I',
      },
    ],
  },
  {
    id: 'lec-calculus-basics',
    title: 'Calculus Basics',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    durationLabel: '52 min',
    durationSec: 3120,
    instructor: 'Pradeep Sir',
    thumbnailVariant: 'calculus',
    summary:
      'Build rock-solid intuition for limits, geometric meaning of derivatives, chain rule, and maxima-minima curve sketching.',
    keyTakeaways: [
      'A derivative measures the instantaneous rate of change (tangent slope) at a point.',
      'Differentiability always implies continuity, though continuity does not guarantee differentiability.',
      'Second derivative test identifies local minima (f"(x) > 0) and maxima (f"(x) < 0).',
    ],
    chapters: [
      {
        timeSec: 0,
        timeLabel: '00:00',
        title: 'Intuition of Limits & Indeterminate Forms',
        boardNote: 'lim(x→0) (sin x)/x = 1  |  lim(x→0) (eˣ - 1)/x = 1',
      },
      {
        timeSec: 840,
        timeLabel: '14:00',
        title: 'Secant to Tangent: First Principle Derivative',
        boardNote: 'dy/dx = lim(Δx→0) [f(x + Δx) - f(x)] / Δx',
      },
      {
        timeSec: 1680,
        timeLabel: '28:00',
        title: 'Product, Quotient & Chain Rule Drills',
        boardNote: 'd/dx [f(g(x))] = f′(g(x)) · g′(x)',
      },
      {
        timeSec: 2400,
        timeLabel: '40:00',
        title: 'Curve Sketching & Turning Points',
        boardNote: 'Critical Points: f′(x) = 0  |  Concavity via f″(x)',
      },
    ],
  },
  {
    id: 'lec-electrostatics',
    title: 'Gauss Law & Flux',
    subjectId: 'physics',
    subjectName: 'Physics',
    durationLabel: '41 min',
    durationSec: 2460,
    instructor: 'Pradeep Sir',
    thumbnailVariant: 'electrostatics',
    summary:
      'Symmetry-based electric field calculations for spherical shells, infinite charged planes, and cylindrical distributions.',
    keyTakeaways: [
      'Net electric flux through a closed surface depends only on enclosed charge.',
      'Inside a uniformly charged spherical shell, the electric field is identically zero.',
    ],
    chapters: [
      {
        timeSec: 0,
        timeLabel: '00:00',
        title: 'Area Vector & Electric Flux Concept',
        boardNote: 'Φ = ∫ E · dA = E A cos θ',
      },
      {
        timeSec: 1120,
        timeLabel: '18:40',
        title: 'Field Due to Spherical Shell & Solid Sphere',
        boardNote: 'E_out = kQ/r²  |  E_in(solid) = ρr / 3ε₀',
      },
    ],
  },
  {
    id: 'lec-chemical-bonding',
    title: 'VSEPR & Hybridization',
    subjectId: 'chemistry',
    subjectName: 'Chemistry',
    durationLabel: '44 min',
    durationSec: 2640,
    instructor: 'Anjali Ma’am',
    thumbnailVariant: 'bonding',
    summary:
      'Predict exact 3D molecular shapes, bond angles, lone-pair repulsions, and dipole moments for inorganic compounds.',
    keyTakeaways: [
      'Repulsion strength: Lone Pair–Lone Pair > Lone Pair–Bond Pair > Bond Pair–Bond Pair.',
      'Steric number = σ-bonds + lone pairs determines hybridization.',
    ],
    chapters: [
      {
        timeSec: 0,
        timeLabel: '00:00',
        title: 'Steric Number Shortcut Formula',
        boardNote: 'H = ½ (V + M - C + A)',
      },
      {
        timeSec: 1200,
        timeLabel: '20:00',
        title: 'Geometry vs Shape in NH₃, H₂O & SF₄',
        boardNote: 'SF₄: sp³d Hybridization → See-Saw Shape',
      },
    ],
  },
  {
    id: 'lec-definite-integration',
    title: 'Definite Integration',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    durationLabel: '49 min',
    durationSec: 2940,
    instructor: 'Pradeep Sir',
    thumbnailVariant: 'integration',
    summary:
      'Solve JEE Main & Advanced integrals rapidly using King’s property, Queen’s property, and Leibniz differentiation under integral.',
    keyTakeaways: [
      'Always check symmetry f(a + b - x) before expanding trig functions.',
      'Odd functions over symmetric interval [-a, a] integrate immediately to zero.',
    ],
    chapters: [
      {
        timeSec: 0,
        timeLabel: '00:00',
        title: 'Riemann Sum & Area Under Curve',
        boardNote: '∫ₐᵇ f(x) dx = F(b) - F(a)',
      },
      {
        timeSec: 1380,
        timeLabel: '23:00',
        title: 'King & Queen Properties in Action',
        boardNote: '∫ₐᵇ f(x) dx = ∫ₐᵇ f(a + b - x) dx',
      },
    ],
  },
];

export const PDF_NOTES: PdfNoteItem[] = [
  {
    id: 'note-phy-ch1',
    title: 'Physics Ch 1 Notes',
    subtitle: 'Kinematics, Vectors & Graphs',
    subjectId: 'physics',
    pages: 14,
    updatedLabel: 'Updated Nov 2026',
    sections: [
      {
        heading: '1. Core Equations of Uniformly Accelerated Motion',
        formula: 'v = u + at   |   s = ut + ½at²   |   v² - u² = 2as',
        points: [
          'Displacement in the nth second: s_n = u + (a/2)(2n - 1).',
          'For a particle starting from rest with constant acceleration, distances in equal intervals follow 1 : 3 : 5 : 7.',
          'Always define a positive coordinate direction before substituting signs for g (-9.8 m/s²).',
        ],
      },
      {
        heading: '2. Graphical Analysis Rules',
        formula: 'v = dx/dt   |   a = dv/dt = v (dv/dx)',
        points: [
          'Area under Acceleration–Time graph equals Change in Velocity (Δv).',
          'Area under Velocity–Time graph equals Net Displacement (with sign).',
          'Turning point occurs where velocity crosses zero and changes sign.',
        ],
      },
      {
        heading: '3. Relative Motion in 1D & 2D',
        formula: 'v_AB = v_A - v_B   |   a_AB = a_A - a_B',
        points: [
          'For two bodies thrown simultaneously under gravity, relative acceleration is zero (a_rel = g - g = 0).',
          'Minimum river crossing time: t_min = d / v_br (swim perpendicular to flow).',
        ],
      },
    ],
  },
  {
    id: 'note-math-formulas',
    title: 'Math Formulas',
    subtitle: 'Calculus, Trig & Algebra Sheet',
    subjectId: 'mathematics',
    pages: 18,
    updatedLabel: 'Exam Revision Pack',
    sections: [
      {
        heading: '1. Standard Limits & L’Hôpital Triggers',
        formula: 'lim(x→0) (sin x)/x = 1   |   lim(x→0) (1 + x)^(1/x) = e',
        points: [
          'lim(x→0) (tan x)/x = 1 and lim(x→0) (1 - cos x)/x² = ½.',
          'For 1^∞ indeterminate forms: lim f(x)^g(x) = exp(lim [f(x) - 1] · g(x)).',
        ],
      },
      {
        heading: '2. Essential Derivatives & Integrals',
        formula: '∫ dx/(x² + a²) = (1/a) tan⁻¹(x/a) + C',
        points: [
          'd/dx (tan⁻¹ x) = 1 / (1 + x²).',
          '∫ eˣ [f(x) + f′(x)] dx = eˣ f(x) + C.',
          'Integration by Parts priority order: ILATE (Inverse, Log, Algebraic, Trig, Exponential).',
        ],
      },
      {
        heading: '3. Quadratic & Sequence Identities',
        formula: 'α + β = -b/a   |   αβ = c/a   |   AM ≥ GM ≥ HM',
        points: [
          'Sum of first n squares: Σk² = n(n + 1)(2n + 1) / 6.',
          'Discriminant D = b² - 4ac > 0 gives two distinct real roots.',
        ],
      },
    ],
  },
  {
    id: 'note-chem-periodic',
    title: 'Chemistry Periodic Trends',
    subtitle: 'Inorganic Memory & Exceptions',
    subjectId: 'chemistry',
    pages: 10,
    updatedLabel: 'NCERT + JEE Notes',
    sections: [
      {
        heading: '1. Atomic & Ionic Radii Order',
        formula: 'Cation < Neutral Atom < Anion (Isoelectronic: N³⁻ > O²⁻ > F⁻ > Na⁺)',
        points: [
          'Lanthanoid contraction makes Zr and Hf have nearly identical atomic radii.',
          'In Group 13, Ga has slightly smaller radius than Al due to poor d-orbital shielding.',
        ],
      },
      {
        heading: '2. Acidic & Basic Nature of Oxides',
        points: [
          'Amphoteric oxides to remember: Al₂O₃, ZnO, PbO, SnO, BeO, Cr₂O₃.',
          'Neutral oxides: CO, NO, N₂O.',
        ],
      },
    ],
  },
];

export const QUESTION_BANKS: QuestionBankItem[] = [
  {
    id: 'qb-physics-pyq',
    title: 'Physics PYQ PDF',
    subtitle: 'Class 11 & 12 Previous Year Questions',
    subjectLabel: 'Physics · CBSE & JEE PYQs',
    year: '2020–2024',
    totalQuestions: 3,
    durationMins: 15,
    questions: [
      {
        id: 'phy-pyq-1',
        subject: 'Physics',
        question:
          'A car accelerates uniformly from rest at 4 m/s² for 5 seconds. What is the total distance covered by the car during this time?',
        options: ['20 m', '50 m', '100 m', '40 m'],
        correctIndex: 1,
        explanation:
          'Using s = ut + ½at² with u = 0, a = 4 m/s², and t = 5 s: s = 0 + ½ × 4 × 25 = 50 m.',
      },
      {
        id: 'phy-pyq-2',
        subject: 'Physics',
        question:
          'Two point charges +2 μC and -2 μC are placed 10 cm apart. What is the net electric flux through a closed sphere enclosing both charges?',
        options: ['Zero', '4 μC / ε₀', '2 μC / ε₀', 'Depends on radius'],
        correctIndex: 0,
        explanation:
          'By Gauss Law, Φ = q_enclosed / ε₀. Since q_enclosed = +2 μC + (-2 μC) = 0, the net electric flux is zero.',
      },
      {
        id: 'phy-pyq-3',
        subject: 'Physics',
        question:
          'A ball is thrown vertically upward with speed u. The ratio of distances travelled by it in the last second of ascent and first second of descent is:',
        options: ['1 : 2', '2 : 1', '1 : 1', '1 : 3'],
        correctIndex: 2,
        explanation:
          'Time of ascent equals time of descent symmetrically. Both cover ½g(1)² = g/2, so the ratio is 1 : 1.',
      },
    ],
  },
  {
    id: 'qb-chemistry-pyq',
    title: 'Chemistry PYQ PDF',
    subtitle: 'Class 11 & 12 Previous Year Questions',
    subjectLabel: 'Chemistry · CBSE & JEE PYQs',
    year: '2020–2024',
    totalQuestions: 3,
    durationMins: 15,
    questions: [
      {
        id: 'chem-pyq-1',
        subject: 'Chemistry',
        question:
          'Which of the following elements has the highest negative electron gain enthalpy in the periodic table?',
        options: ['Fluorine (F)', 'Chlorine (Cl)', 'Oxygen (O)', 'Bromine (Br)'],
        correctIndex: 1,
        explanation:
          'Chlorine has a more negative electron gain enthalpy than Fluorine because Fluorine’s compact 2p orbital causes high inter-electronic repulsion.',
      },
      {
        id: 'chem-pyq-2',
        subject: 'Chemistry',
        question:
          'Among B, Be, N, and O, arrange the elements in correct increasing order of their First Ionization Enthalpy (IE₁):',
        options: [
          'B < Be < O < N',
          'Be < B < O < N',
          'B < Be < N < O',
          'O < N < B < Be',
        ],
        correctIndex: 0,
        explanation:
          'Be (2s²) has higher IE₁ than B (2p¹) due to penetrating 2s orbital, and N (2p³ half-filled) has higher IE₁ than O (2p⁴). Thus B < Be < O < N.',
      },
      {
        id: 'chem-pyq-3',
        subject: 'Chemistry',
        question: 'Which of the following oxides is amphoteric in nature?',
        options: ['CO₂', 'Na₂O', 'Al₂O₃', 'SO₂'],
        correctIndex: 2,
        explanation:
          'Al₂O₃ reacts with both acids and bases to form salts and water, making it amphoteric.',
      },
    ],
  },
  {
    id: 'qb-math-pyq',
    title: 'Mathematics PYQ PDF',
    subtitle: 'Class 11 & 12 Previous Year Questions',
    subjectLabel: 'Mathematics · CBSE & JEE PYQs',
    year: '2020–2024',
    totalQuestions: 3,
    durationMins: 15,
    questions: [
      {
        id: 'math-pyq-1',
        subject: 'Mathematics',
        question: 'What is the derivative of y = sin(3x²) with respect to x?',
        options: ['cos(3x²)', '6x cos(3x²)', '3x cos(3x²)', '-6x cos(3x²)'],
        correctIndex: 1,
        explanation:
          'By Chain Rule: d/dx [sin(3x²)] = cos(3x²) · d/dx(3x²) = 6x cos(3x²).',
      },
      {
        id: 'math-pyq-2',
        subject: 'Mathematics',
        question: 'Evaluate the definite integral I = ∫₀^(π/2) [√sin x / (√sin x + √cos x)] dx.',
        options: ['π / 2', 'π / 4', '1', 'π'],
        correctIndex: 1,
        explanation:
          'Applying King’s Property f(π/2 - x): I = ∫₀^(π/2) [√cos x / (√cos x + √sin x)] dx. Adding both gives 2I = π/2, hence I = π/4.',
      },
      {
        id: 'math-pyq-3',
        subject: 'Mathematics',
        question: 'The value of lim(x→0) [(1 - cos 2x) / x²] is:',
        options: ['0', '1', '2', '4'],
        correctIndex: 2,
        explanation:
          '1 - cos 2x = 2 sin²x. Thus lim(x→0) [2 (sin x / x)²] = 2 × 1² = 2.',
      },
    ],
  },
];

export const LIVE_CLASSES: LiveClassSession[] = [
  {
    id: 'live-1',
    title: 'Kinematics & Relative Motion Doubt Marathon',
    subjectId: 'physics',
    instructor: 'Pradeep Sir',
    scheduleLabel: 'Live Now · Started 18 mins ago',
    isLiveNow: true,
    attendees: 142,
    topicFocus: 'River-boat problems, rain-umbrella vectors & projectile on inclined plane',
    initialMessages: [
      {
        id: 'm1',
        sender: 'Pradeep Sir',
        text: 'Welcome everyone! Drop your NCERT or HC Verma question numbers in chat.',
        time: '10:02 AM',
        isTeacher: true,
      },
      {
        id: 'm2',
        sender: 'Aarav Verma',
        text: 'Sir please explain why minimum drift angle changes when v_river > v_boat.',
        time: '10:06 AM',
      },
      {
        id: 'm3',
        sender: 'Sneha Gupta',
        text: 'The vector triangle diagram on board made it super clear!',
        time: '10:08 AM',
      },
    ],
  },
  {
    id: 'live-2',
    title: 'Periodic Properties & Exceptions Rapid Revision',
    subjectId: 'chemistry',
    instructor: 'Anjali Ma’am',
    scheduleLabel: 'Today · 5:30 PM IST',
    isLiveNow: false,
    attendees: 89,
    topicFocus: 'Ionization enthalpy anomalies, electron affinity & oxide acidity order',
    initialMessages: [
      {
        id: 'm4',
        sender: 'Anjali Ma’am',
        text: 'Keep NCERT Part 1 Page 86 ready before we start at 5:30 PM.',
        time: '9:30 AM',
        isTeacher: true,
      },
    ],
  },
  {
    id: 'live-3',
    title: 'Definite Integration: King & Queen Property PYQs',
    subjectId: 'mathematics',
    instructor: 'Pradeep Sir',
    scheduleLabel: 'Tomorrow · 4:00 PM IST',
    isLiveNow: false,
    attendees: 118,
    topicFocus: '2019–2024 JEE Main & CBSE Integrals solved step-by-step',
    initialMessages: [],
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Live Class Started: Kinematics Doubt Marathon',
    detail: 'Pradeep Sir is live now solving river-boat and relative motion numericals.',
    timeLabel: '18m ago',
    unread: true,
    targetTab: 'live',
  },
  {
    id: 'n2',
    title: 'New PDF Notes Uploaded: Physics Ch 1 Notes',
    detail: '14-page formula & graph summary added to Study Materials.',
    timeLabel: '2h ago',
    unread: true,
    targetTab: 'home',
  },
  {
    id: 'n3',
    title: 'IIT-JEE 2022 Question Bank Ready',
    detail: 'Test your speed with step-by-step solutions across Physics, Chemistry & Math.',
    timeLabel: 'Yesterday',
    unread: false,
    targetTab: 'courses',
  },
];
