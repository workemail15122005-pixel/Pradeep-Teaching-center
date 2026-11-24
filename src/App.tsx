import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  Bell,
  BookOpen,
  FileText,
  Home,
  Maximize2,
  Search,
  User,
  Video,
  X,
} from 'lucide-react';
import {
  BannerTheme,
  INITIAL_NOTIFICATIONS,
  NotificationItem,
  PDF_NOTES,
  PdfNoteItem,
  QUESTION_BANKS,
  QuestionBankItem,
  SUBJECT_FOLDERS,
  SubjectFolder,
  VIDEO_LECTURES,
  VideoLecture,
} from './data/curriculum';
import {
  DiyaLogo,
  LectureThumbnailArt,
  PtcEmblemLogo,
  SubjectFolderIcon,
  WelcomeStudentIllustration,
} from './components/Illustrations';
import { LecturePlayerModal } from './components/LecturePlayerModal';
import { PdfViewerModal, QuestionBankModal } from './components/StudyMaterialModal';
import { SubjectExplorerModal } from './components/SubjectExplorerModal';
import {
  ActivityEvent,
  ActivityView,
  CoursesView,
  LiveClassesView,
  ProfileView,
} from './components/SubPages';
import { OfflineIndicator } from './components/PWAInstallUI';

type NavTab = 'home' | 'courses' | 'live' | 'activity' | 'profile';

const STORAGE_KEY = 'pradeep_teaching_center_state_v1';

interface PersistedState {
  studentName: string;
  targetBatch: string;
  bannerTheme: BannerTheme;
  completedLectures: Record<string, boolean>;
  completedTopics: Record<string, boolean>;
  bookmarkedNotes: Record<string, boolean>;
  lectureNotes: Record<string, string>;
  quizScores: Record<string, { score: number; total: number }>;
  activities: ActivityEvent[];
}

const DEFAULT_STATE: PersistedState = {
  studentName: 'Rahul Sharma',
  targetBatch: 'Class 11 & 12 · Bihar Board',
  bannerTheme: 'sky',
  completedLectures: {},
  completedTopics: { 'phy-1': true },
  bookmarkedNotes: { 'note-phy-ch1': true },
  lectureNotes: {},
  quizScores: {},
  activities: [
    {
      id: 'act-init-1',
      label: 'Checked off Motion in a Straight Line',
      detail: 'Physics · Chapter 1 Kinematics',
      timeLabel: 'Today',
      type: 'topic',
    },
    {
      id: 'act-init-2',
      label: 'Bookmarked Physics Ch 1 Notes',
      detail: 'Kinematics, Vectors & Graphs (14 pages)',
      timeLabel: 'Yesterday',
      type: 'note',
    },
  ],
};

function loadInitialState(): PersistedState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      activities: Array.isArray(parsed.activities)
        ? parsed.activities
        : DEFAULT_STATE.activities,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export default function App() {
  const [state, setState] = useState<PersistedState>(loadInitialState);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal & drawer states
  const [activeSubject, setActiveSubject] = useState<SubjectFolder | null>(null);
  const [activeLecture, setActiveLecture] = useState<VideoLecture | null>(null);
  const [activePdfNote, setActivePdfNote] = useState<PdfNoteItem | null>(null);
  const [activeQuestionBank, setActiveQuestionBank] =
    useState<QuestionBankItem | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [toppersModalOpen, setToppersModalOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [state]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const pushActivity = (
    label: string,
    detail: string,
    type: ActivityEvent['type'],
  ) => {
    setState((prev) => ({
      ...prev,
      activities: [
        {
          id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          label,
          detail,
          timeLabel: 'Just now',
          type,
        },
        ...prev.activities.slice(0, 19),
      ],
    }));
  };

  const handleToggleLectureComplete = (lectureId: string) => {
    const lec = VIDEO_LECTURES.find((l) => l.id === lectureId);
    setState((prev) => {
      const nextVal = !prev.completedLectures[lectureId];
      return {
        ...prev,
        completedLectures: {
          ...prev.completedLectures,
          [lectureId]: nextVal,
        },
      };
    });
    if (lec && !state.completedLectures[lectureId]) {
      pushActivity(`Completed lecture: ${lec.title}`, lec.subjectName, 'video');
    }
  };

  const handleSaveLectureNote = (lectureId: string, note: string) => {
    const lec = VIDEO_LECTURES.find((l) => l.id === lectureId);
    setState((prev) => ({
      ...prev,
      lectureNotes: { ...prev.lectureNotes, [lectureId]: note },
    }));
    if (lec && note.trim()) {
      pushActivity(`Saved notes on ${lec.title}`, lec.subjectName, 'note');
    }
  };

  const handleToggleTopic = (topicId: string) => {
    let topicTitle = topicId;
    let subjectTitle = '';
    for (const folder of SUBJECT_FOLDERS) {
      const found = folder.topics.find((t) => t.id === topicId);
      if (found) {
        topicTitle = found.title;
        subjectTitle = folder.displayTitle;
        break;
      }
    }
    const willComplete = !state.completedTopics[topicId];
    setState((prev) => ({
      ...prev,
      completedTopics: {
        ...prev.completedTopics,
        [topicId]: willComplete,
      },
    }));
    if (willComplete) {
      pushActivity(`Completed topic: ${topicTitle}`, subjectTitle, 'topic');
    }
  };

  const handleToggleBookmarkNote = (noteId: string) => {
    const note = PDF_NOTES.find((n) => n.id === noteId);
    const willBookmark = !state.bookmarkedNotes[noteId];
    setState((prev) => ({
      ...prev,
      bookmarkedNotes: {
        ...prev.bookmarkedNotes,
        [noteId]: willBookmark,
      },
    }));
    if (note && willBookmark) {
      pushActivity(`Bookmarked ${note.title}`, note.subtitle, 'note');
    }
  };

  const handleRecordQuizScore = (bankId: string, score: number, total: number) => {
    const bank = QUESTION_BANKS.find((b) => b.id === bankId);
    setState((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [bankId]: { score, total },
      },
    }));
    if (bank) {
      pushActivity(
        `Scored ${score}/${total} in ${bank.title}`,
        bank.subjectLabel,
        'quiz',
      );
    }
  };

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;

    const lectures = VIDEO_LECTURES.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.subjectName.toLowerCase().includes(q) ||
        l.summary.toLowerCase().includes(q),
    );
    const notes = PDF_NOTES.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.subtitle.toLowerCase().includes(q),
    );
    const banks = QUESTION_BANKS.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.subtitle.toLowerCase().includes(q),
    );
    const topics = SUBJECT_FOLDERS.flatMap((folder) =>
      folder.topics
        .filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.chapter.toLowerCase().includes(q) ||
            folder.displayTitle.toLowerCase().includes(q),
        )
        .map((t) => ({ folder, topic: t })),
    );

    return { lectures, notes, banks, topics };
  }, [searchQuery]);

  const bannerGradientClass =
    state.bannerTheme === 'mint'
      ? 'bg-gradient-to-r from-[#D9F7E8] via-[#E3FAEF] to-[#C8F2DE]'
      : state.bannerTheme === 'peach'
        ? 'bg-gradient-to-r from-[#FDEBD2] via-[#FFF4E4] to-[#FCE2C0]'
        : 'bg-gradient-to-r from-[#DCEBFF] via-[#EEF5FF] to-[#FCE6D4]';

  const navItems: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'live', label: 'Live Classes', icon: Video },
    { id: 'activity', label: 'My Activity', icon: Activity },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8FB] text-slate-900 pb-20 lg:pb-10">
      {/* Top App Bar (Clean 3-Zone Layout) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Brand Zone */}
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
          >
            <PtcEmblemLogo className="w-9 h-9 shrink-0" />
            <span className="font-display text-base sm:text-lg font-extrabold tracking-tight text-slate-900">
              Pradeep Teaching Center
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-6"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`text-sm font-semibold whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                    isActive
                      ? 'text-blue-600 border-blue-600'
                      : 'text-slate-600 border-transparent hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Zone: Notification Bell + Student Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen((open) => !open)}
              aria-label={`Notifications (${unreadCount} unread)`}
              className="relative min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              aria-label="Open student profile"
              className="hidden sm:flex items-center gap-2 min-h-[40px] pl-2 pr-3 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                P.T.C
              </span>
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <User className="w-4 h-4" />
              </span>
            </button>

            {/* Notifications Popover */}
            {notificationsOpen && (
              <div className="absolute right-0 top-13 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-xl p-4 z-40 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900">Notifications</h2>
                  <button
                    type="button"
                    onClick={() =>
                      setNotifications((prev) =>
                        prev.map((n) => ({ ...n, unread: false })),
                      )
                    }
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => {
                        setNotifications((prev) =>
                          prev.map((item) =>
                            item.id === n.id ? { ...item, unread: false } : item,
                          ),
                        );
                        setNotificationsOpen(false);
                        if (n.targetTab) setActiveTab(n.targetTab);
                      }}
                      className="w-full text-left py-2.5 hover:bg-slate-50 rounded-lg px-2 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-bold text-slate-900">{n.title}</p>
                        <span className="text-[11px] text-slate-400 shrink-0">
                          {n.timeLabel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{n.detail}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Hero Welcome Banner + Search (Responsive Grid on Desktop, Stacked on Mobile) */}
            <section className="space-y-4">
              <div
                className={`rounded-3xl ${bannerGradientClass} px-5 py-4 sm:px-8 sm:py-5 flex items-center justify-between gap-4 shadow-xs border border-black/5 overflow-hidden`}
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <WelcomeStudentIllustration
                    theme={state.bannerTheme}
                    className="w-28 sm:w-40 h-auto shrink-0 -my-2"
                  />
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-800">
                      <DiyaLogo className="w-5 h-5 shrink-0" />
                      <span className="truncate">Pradeep Teaching Center</span>
                    </div>
                    <h1 className="font-display text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
                      Welcome to Class 11 &amp; 12
                    </h1>
                    <p className="text-xs sm:text-base text-slate-700 leading-snug max-w-md">
                      Smart Lectures, Notes &amp; PYQs. Start Learning Today!
                    </p>
                  </div>
                </div>

                {/* Subtle quick banner-mood dots matching the 3 phone screens in the photo */}
                <div className="hidden md:flex items-center gap-2 shrink-0 bg-white/70 backdrop-blur-xs px-3 py-2 rounded-2xl border border-white">
                  <span className="text-xs font-medium text-slate-600 mr-1">Mood</span>
                  {(
                    [
                      { id: 'sky', bg: 'bg-[#7FB3F5]', label: 'Sky theme' },
                      { id: 'mint', bg: 'bg-[#57D097]', label: 'Mint theme' },
                      { id: 'peach', bg: 'bg-[#F5B06C]', label: 'Peach theme' },
                    ] as const
                  ).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      aria-label={m.label}
                      onClick={() =>
                        setState((prev) => ({ ...prev, bannerTheme: m.id }))
                      }
                      className={`w-5 h-5 rounded-full ${m.bg} transition-transform ${
                        state.bannerTheme === m.id
                          ? 'ring-2 ring-slate-900 scale-110'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search topics, videos, notes..."
                  aria-label="Search topics, videos, notes"
                  className="w-full min-h-[48px] pl-12 pr-11 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </section>

            {/* Live Search Results Panel */}
            {searchResults ? (
              <section className="rounded-3xl bg-white border border-slate-200 p-5 space-y-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-900">
                    Search Results for “{searchQuery}”
                  </h2>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Reset
                  </button>
                </div>

                {searchResults.lectures.length === 0 &&
                searchResults.notes.length === 0 &&
                searchResults.banks.length === 0 &&
                searchResults.topics.length === 0 ? (
                  <p className="text-sm text-slate-500 py-4">
                    No matching topics, videos, or notes found. Try “Motion”, “Periodic”,
                    “Calculus”, or “PYQ”.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.lectures.map((lec) => (
                      <button
                        key={lec.id}
                        type="button"
                        onClick={() => setActiveLecture(lec)}
                        className="text-left p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 flex items-center gap-3 transition-colors"
                      >
                        <div className="w-20 aspect-video rounded-lg overflow-hidden bg-slate-900 shrink-0">
                          <LectureThumbnailArt variant={lec.thumbnailVariant} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-blue-600 font-semibold">
                            Video Lecture · {lec.durationLabel}
                          </p>
                          <p className="text-sm font-bold text-slate-900 truncate">
                            {lec.title}
                          </p>
                        </div>
                      </button>
                    ))}

                    {searchResults.notes.map((note) => (
                      <button
                        key={note.id}
                        type="button"
                        onClick={() => setActivePdfNote(note)}
                        className="text-left p-3.5 rounded-2xl border border-slate-200 hover:border-amber-400 flex items-center gap-3 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-amber-700 font-semibold">PDF Notes</p>
                          <p className="text-sm font-bold text-slate-900 truncate">
                            {note.title}
                          </p>
                        </div>
                      </button>
                    ))}

                    {searchResults.banks.map((bank) => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => setActiveQuestionBank(bank)}
                        className="text-left p-3.5 rounded-2xl border border-slate-200 hover:border-orange-400 flex items-center gap-3 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-orange-700 font-semibold">
                            Question Bank
                          </p>
                          <p className="text-sm font-bold text-slate-900 truncate">
                            {bank.title}
                          </p>
                        </div>
                      </button>
                    ))}

                    {searchResults.topics.map(({ folder, topic }) => (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => setActiveSubject(folder)}
                        className="text-left p-3.5 rounded-2xl border border-slate-200 hover:border-slate-400 flex items-center justify-between gap-3 transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="text-xs text-slate-500">
                            {folder.displayTitle} · {topic.chapter}
                          </p>
                          <p className="text-sm font-bold text-slate-900 truncate">
                            {topic.title}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </section>
            ) : (
              <>
                {/* Subject Folders Section */}
                <section className="space-y-3">
                  <h2 className="font-display text-lg font-bold text-slate-900">
                    Subject Folders
                  </h2>
                  <div className="grid grid-cols-3 gap-3 sm:gap-5">
                    {SUBJECT_FOLDERS.map((folder) => (
                      <button
                        key={folder.id}
                        type="button"
                        onClick={() => setActiveSubject(folder)}
                        className={`group rounded-2xl sm:rounded-3xl ${folder.gradientClass} text-white px-2.5 py-4 sm:p-6 flex flex-col items-center justify-center text-center gap-2.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all min-h-[126px] sm:min-h-[152px]`}
                      >
                        <span className="text-[11px] sm:text-sm font-extrabold tracking-wide uppercase">
                          {folder.name}
                        </span>
                        <SubjectFolderIcon
                          subjectId={folder.id}
                          className="w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-105 transition-transform"
                        />
                        <span className="text-[11px] sm:text-xs font-medium text-white/95 font-mono-nums">
                          {folder.topicCountLabel}
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Study Materials Section (placed directly below Subject Folders) */}
                <section className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="font-display text-lg font-bold text-slate-900">
                      Study Materials
                    </h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab('courses')}
                      className="min-h-[36px] px-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      See All
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 sm:gap-5">
                    {/* PDF Notes Card */}
                    <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/70 p-4 sm:p-5 shadow-xs space-y-3">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                          PDF Notes
                        </h3>
                      </div>

                      <div className="space-y-1.5">
                        {PDF_NOTES.slice(0, 2).map((note) => (
                          <button
                            key={note.id}
                            type="button"
                            onClick={() => setActivePdfNote(note)}
                            className="w-full text-left text-xs sm:text-sm font-medium text-slate-700 hover:text-blue-600 py-1.5 px-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between gap-2"
                          >
                            <span className="truncate">{note.title}</span>
                            <span className="text-[11px] text-slate-400 font-mono-nums hidden sm:inline">
                              {note.pages}p
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* PYQ PDFs Card */}
                    <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/70 p-4 sm:p-5 shadow-xs space-y-3">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                          PYQ PDFs
                        </h3>
                      </div>

                      <div className="space-y-1">
                        {QUESTION_BANKS.map((bank) => (
                          <button
                            key={bank.id}
                            type="button"
                            onClick={() => setActiveQuestionBank(bank)}
                            className="w-full text-left text-xs sm:text-sm font-medium text-slate-700 hover:text-blue-600 py-1.5 px-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between gap-2"
                          >
                            <span className="truncate">{bank.title}</span>
                            {state.quizScores[bank.id] ? (
                              <span className="text-[11px] font-mono-nums text-emerald-700 font-semibold hidden sm:inline">
                                {state.quizScores[bank.id].score}/
                                {state.quizScores[bank.id].total}
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-400 font-mono-nums hidden sm:inline">
                                {bank.questions.length}Q
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Shining Stars of PTC Results Banner (below Study Materials) */}
                <section className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="font-display text-lg font-bold text-slate-900">
                        The Shining Stars of PTC
                      </h2>
                      <p className="text-xs text-slate-500">
                        Class 11 &amp; 12 Top Results · 13 साल में 11 बार Top Result
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setToppersModalOpen(true)}
                      aria-label="View full results banner"
                      className="min-h-[36px] px-2.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 shrink-0"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      View Full
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setToppersModalOpen(true)}
                    className="group w-full text-left rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#172554] to-[#1E293B] border border-amber-400/50 hover:border-amber-300 p-2.5 sm:p-3.5 shadow-md hover:shadow-lg transition-all overflow-hidden block"
                  >
                    <div className="rounded-2xl overflow-hidden bg-slate-900 ring-1 ring-amber-300/30">
                      <img
                        src="/assets/aistudio/WhatsApp_Image_2026-11-24_at_21.55.16_85e347d6.jpeg"
                        alt="Pradeep's Teaching Centre - The Shining Stars of PTC Class 11 & 12 Top Results"
                        referrerPolicy="no-referrer"
                        className="w-full h-auto block object-cover group-hover:scale-[1.01] transition-transform duration-200"
                      />
                    </div>
                    <div className="px-2 pt-3 pb-1 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-amber-200">
                        Anjali Kumari (437) · Anmol Kumar (437) · Nitesh Kumari (432)
                      </span>
                      <span className="font-mono-nums text-slate-200">
                        Contact: 8579093200
                      </span>
                    </div>
                  </button>
                </section>
              </>
            )}
          </div>
        )}

        {activeTab === 'courses' && (
          <CoursesView
            completedLectures={state.completedLectures}
            completedTopics={state.completedTopics}
            onSelectSubject={setActiveSubject}
            onSelectLecture={setActiveLecture}
            onSelectNote={setActivePdfNote}
            onSelectBank={setActiveQuestionBank}
          />
        )}

        {activeTab === 'live' && (
          <LiveClassesView studentName={state.studentName} />
        )}

        {activeTab === 'activity' && (
          <ActivityView
            activities={state.activities}
            completedLecturesCount={
              Object.values(state.completedLectures).filter(Boolean).length
            }
            completedTopicsCount={
              Object.values(state.completedTopics).filter(Boolean).length
            }
            bookmarkedNotesCount={
              Object.values(state.bookmarkedNotes).filter(Boolean).length
            }
            quizScores={state.quizScores}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            studentName={state.studentName}
            targetBatch={state.targetBatch}
            bannerTheme={state.bannerTheme}
            onUpdateProfile={(name, batch) =>
              setState((prev) => ({
                ...prev,
                studentName: name,
                targetBatch: batch,
              }))
            }
            onChangeBannerTheme={(theme) =>
              setState((prev) => ({ ...prev, bannerTheme: theme }))
            }
          />
        )}
      </main>

      {/* Mobile & Tablet Fixed Bottom Tab Bar */}
      <nav
        aria-label="Bottom navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80"
      >
        <div className="grid grid-cols-5 items-center h-16 max-w-xl mx-auto px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`min-h-[48px] flex flex-col items-center justify-center gap-1 rounded-xl transition-colors ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[11px] font-semibold tracking-tight whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Modals */}
      {activeSubject && (
        <SubjectExplorerModal
          subject={activeSubject}
          completedTopics={state.completedTopics}
          onToggleTopic={handleToggleTopic}
          onSelectLecture={setActiveLecture}
          onClose={() => setActiveSubject(null)}
        />
      )}

      {activeLecture && (
        <LecturePlayerModal
          lecture={activeLecture}
          isCompleted={!!state.completedLectures[activeLecture.id]}
          savedNote={state.lectureNotes[activeLecture.id] ?? ''}
          onClose={() => setActiveLecture(null)}
          onToggleComplete={handleToggleLectureComplete}
          onSaveNote={handleSaveLectureNote}
        />
      )}

      {activePdfNote && (
        <PdfViewerModal
          note={activePdfNote}
          isBookmarked={!!state.bookmarkedNotes[activePdfNote.id]}
          onToggleBookmark={handleToggleBookmarkNote}
          onClose={() => setActivePdfNote(null)}
        />
      )}

      {activeQuestionBank && (
        <QuestionBankModal
          bank={activeQuestionBank}
          onRecordScore={handleRecordQuizScore}
          onClose={() => setActiveQuestionBank(null)}
        />
      )}

      {toppersModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="The Shining Stars of PTC full results banner"
          onClick={() => setToppersModalOpen(false)}
        >
          <div
            className="w-full max-w-5xl rounded-3xl bg-white p-3 sm:p-4 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-2">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Pradeep&apos;s Teaching Centre — Shining Stars of PTC
                </h2>
                <p className="text-xs text-slate-500">For 11th &amp; 12th · Contact: 8579093200</p>
              </div>
              <button
                type="button"
                onClick={() => setToppersModalOpen(false)}
                aria-label="Close results banner"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden bg-slate-100">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-11-24_at_21.55.16_85e347d6.jpeg"
                alt="Pradeep's Teaching Centre - The Shining Stars of PTC Class 11 & 12 Top Results"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[78vh] object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}

      <OfflineIndicator />
    </div>
  );
}
