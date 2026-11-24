import React, { useState } from 'react';
import {
  Bell,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  HelpCircle,
  Play,
  Radio,
  Send,
  User,
  Users,
} from 'lucide-react';
import {
  BannerTheme,
  LIVE_CLASSES,
  PDF_NOTES,
  PdfNoteItem,
  QUESTION_BANKS,
  QuestionBankItem,
  SUBJECT_FOLDERS,
  SubjectFolder,
  SubjectId,
  VIDEO_LECTURES,
  VideoLecture,
} from '../data/curriculum';
import { LectureThumbnailArt, SubjectFolderIcon } from './Illustrations';

export interface ActivityEvent {
  id: string;
  label: string;
  detail: string;
  timeLabel: string;
  type: 'video' | 'note' | 'quiz' | 'topic';
}

interface CoursesViewProps {
  completedLectures: Record<string, boolean>;
  completedTopics: Record<string, boolean>;
  onSelectSubject: (subject: SubjectFolder) => void;
  onSelectLecture: (lecture: VideoLecture) => void;
  onSelectNote: (note: PdfNoteItem) => void;
  onSelectBank: (bank: QuestionBankItem) => void;
}

export function CoursesView({
  completedLectures,
  completedTopics,
  onSelectSubject,
  onSelectLecture,
  onSelectNote,
  onSelectBank,
}: CoursesViewProps) {
  const [filterSubject, setFilterSubject] = useState<'all' | SubjectId>('all');

  const filteredLectures =
    filterSubject === 'all'
      ? VIDEO_LECTURES
      : VIDEO_LECTURES.filter((l) => l.subjectId === filterSubject);

  return (
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Courses & Lectures</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Structured CBSE & IIT-JEE modules by Pradeep Sir and Anjali Ma’am
          </p>
        </div>

        <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start">
          {(['all', 'physics', 'chemistry', 'mathematics'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterSubject(tab)}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors whitespace-nowrap ${
                filterSubject === tab
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'all' ? 'All Subjects' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Progress Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SUBJECT_FOLDERS.map((folder) => {
          const done = folder.topics.filter((t) => completedTopics[t.id]).length;
          const pct = Math.round((done / folder.topics.length) * 100);
          return (
            <button
              key={folder.id}
              type="button"
              onClick={() => onSelectSubject(folder)}
              className="text-left rounded-2xl bg-white border border-slate-200/80 p-4 hover:border-slate-300 transition-colors flex items-center gap-4 shadow-xs"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${folder.gradientClass} flex items-center justify-center shrink-0`}
              >
                <SubjectFolderIcon subjectId={folder.id} className="w-9 h-9" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    {folder.displayTitle}
                  </h2>
                  <span className="font-mono-nums text-xs font-semibold text-slate-600">
                    {pct}%
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {folder.topicCountLabel} · {done}/{folder.topics.length} core done
                </p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${folder.gradientClass}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Video Lectures Grid */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">Recorded Video Lectures</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLectures.map((lec) => {
            const watched = !!completedLectures[lec.id];
            return (
              <button
                key={lec.id}
                type="button"
                onClick={() => onSelectLecture(lec)}
                className="group text-left rounded-2xl bg-white border border-slate-200/80 overflow-hidden hover:border-blue-300 transition-colors shadow-xs"
              >
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <LectureThumbnailArt variant={lec.thumbnailVariant} />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <Play className="w-5 h-5 fill-slate-900 ml-0.5" />
                    </span>
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 font-mono-nums text-[11px] font-semibold text-white bg-slate-950/80 px-2 py-0.5 rounded-md">
                    {lec.durationLabel}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span>
                      {lec.subjectName} · {lec.instructor}
                    </span>
                    {watched && (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Watched
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{lec.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{lec.summary}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Notes & Question Banks */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">PDF Formula Notes</h2>
          <div className="space-y-2.5">
            {PDF_NOTES.map((note) => (
              <button
                key={note.id}
                type="button"
                onClick={() => onSelectNote(note)}
                className="w-full text-left rounded-2xl bg-white border border-slate-200/80 p-4 hover:border-amber-300 transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {note.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {note.subtitle} · {note.pages} pages
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-blue-600 shrink-0">Open</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">PYQ Question Banks</h2>
          <div className="space-y-2.5">
            {QUESTION_BANKS.map((bank) => (
              <button
                key={bank.id}
                type="button"
                onClick={() => onSelectBank(bank)}
                className="w-full text-left rounded-2xl bg-white border border-slate-200/80 p-4 hover:border-orange-300 transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {bank.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {bank.subjectLabel} · {bank.totalQuestions} questions
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-blue-600 shrink-0">Solve</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

interface LiveClassesViewProps {
  studentName: string;
}

export function LiveClassesView({ studentName }: LiveClassesViewProps) {
  const [selectedSessionId, setSelectedSessionId] = useState(LIVE_CLASSES[0].id);
  const [joinedLive, setJoinedLive] = useState(true);
  const [reminders, setReminders] = useState<Record<string, boolean>>({});
  const [chatBySession, setChatBySession] = useState(() => {
    const map: Record<string, typeof LIVE_CLASSES[0]['initialMessages']> = {};
    LIVE_CLASSES.forEach((s) => {
      map[s.id] = s.initialMessages;
    });
    return map;
  });
  const [messageInput, setMessageInput] = useState('');

  const activeSession =
    LIVE_CLASSES.find((s) => s.id === selectedSessionId) ?? LIVE_CLASSES[0];
  const messages = chatBySession[activeSession.id] ?? [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = messageInput.trim();
    if (!trimmed) return;
    setChatBySession((prev) => ({
      ...prev,
      [activeSession.id]: [
        ...(prev[activeSession.id] ?? []),
        {
          id: `msg-${Date.now()}`,
          sender: studentName,
          text: trimmed,
          time: 'Just now',
        },
      ],
    }));
    setMessageInput('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Live Classes & Doubt Desk</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Interactive chalkboard sessions with real-time doubt discussion
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Stage + Chat */}
        <div className="lg:col-span-2 rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="bg-slate-950 text-white p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-300">
                <Radio className="w-4 h-4" />
                <span>
                  {activeSession.isLiveNow ? 'LIVE CLASSROOM' : 'UPCOMING SESSION'}
                </span>
              </div>
              <span className="text-xs text-slate-300 flex items-center gap-1.5 font-mono-nums">
                <Users className="w-3.5 h-3.5" />
                {activeSession.attendees} students
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <div className="sm:col-span-2 rounded-xl overflow-hidden border border-white/10 aspect-video">
                <LectureThumbnailArt
                  variant={
                    activeSession.subjectId === 'physics'
                      ? 'motion'
                      : activeSession.subjectId === 'chemistry'
                        ? 'periodic'
                        : 'integration'
                  }
                  progressRatio={joinedLive ? 0.55 : 0}
                />
              </div>
              <div className="sm:col-span-3 space-y-2">
                <h2 className="text-lg font-bold leading-snug">{activeSession.title}</h2>
                <p className="text-xs text-slate-300">
                  Faculty: {activeSession.instructor} · {activeSession.scheduleLabel}
                </p>
                <p className="text-xs text-slate-400">{activeSession.topicFocus}</p>
                <div className="pt-1">
                  {activeSession.isLiveNow ? (
                    <button
                      type="button"
                      onClick={() => setJoinedLive((j) => !j)}
                      className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        joinedLive
                          ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                          : 'bg-blue-600 text-white hover:bg-blue-500'
                      }`}
                    >
                      {joinedLive ? 'Connected to Audio & Board' : 'Join Live Stream'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setReminders((prev) => ({
                          ...prev,
                          [activeSession.id]: !prev[activeSession.id],
                        }))
                      }
                      className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        reminders[activeSession.id]
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-white/15 text-white hover:bg-white/25'
                      }`}
                    >
                      <Bell className="w-3.5 h-3.5" />
                      {reminders[activeSession.id] ? 'Reminder Set' : 'Notify Me'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Doubt Chat */}
          <div className="p-4 sm:p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Live Class Doubt Chat</h3>
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {messages.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">
                  No doubts posted yet. Ask a pre-class question below.
                </p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`rounded-xl px-3.5 py-2.5 text-sm ${
                      msg.isTeacher
                        ? 'bg-blue-50 border border-blue-100'
                        : 'bg-slate-50 border border-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs mb-0.5">
                      <span
                        className={`font-bold ${
                          msg.isTeacher ? 'text-blue-700' : 'text-slate-800'
                        }`}
                      >
                        {msg.sender}
                      </span>
                      <span className="text-slate-400 font-mono-nums">{msg.time}</span>
                    </div>
                    <p className="text-slate-700 text-xs sm:text-sm">{msg.text}</p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Ask a doubt in live chat..."
                className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
              <button
                type="submit"
                aria-label="Send doubt message"
                className="min-h-[44px] min-w-[44px] px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Upcoming Sessions List */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">Class Schedule</h3>
          <div className="space-y-2.5">
            {LIVE_CLASSES.map((session) => {
              const selected = session.id === activeSession.id;
              return (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => setSelectedSessionId(session.id)}
                  className={`w-full text-left rounded-2xl p-4 border transition-colors ${
                    selected
                      ? 'bg-blue-50/70 border-blue-400'
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span
                      className={`font-semibold ${
                        session.isLiveNow ? 'text-rose-600' : 'text-slate-500'
                      }`}
                    >
                      {session.scheduleLabel}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    {session.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">{session.instructor}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ActivityViewProps {
  activities: ActivityEvent[];
  completedLecturesCount: number;
  completedTopicsCount: number;
  bookmarkedNotesCount: number;
  quizScores: Record<string, { score: number; total: number }>;
}

export function ActivityView({
  activities,
  completedLecturesCount,
  completedTopicsCount,
  bookmarkedNotesCount,
  quizScores,
}: ActivityViewProps) {
  const quizzesTaken = Object.keys(quizScores).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Learning Activity</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Real-time summary of lectures watched, topics checked, and PYQs solved
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="rounded-2xl bg-white border border-slate-200/80 p-4">
          <p className="text-xs text-slate-500">Lectures Watched</p>
          <p className="text-2xl font-bold font-mono-nums text-slate-900 mt-1">
            {completedLecturesCount} / {VIDEO_LECTURES.length}
          </p>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200/80 p-4">
          <p className="text-xs text-slate-500">Topics Checked</p>
          <p className="text-2xl font-bold font-mono-nums text-slate-900 mt-1">
            {completedTopicsCount}
          </p>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200/80 p-4">
          <p className="text-xs text-slate-500">Saved Notes</p>
          <p className="text-2xl font-bold font-mono-nums text-slate-900 mt-1">
            {bookmarkedNotesCount}
          </p>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200/80 p-4">
          <p className="text-xs text-slate-500">PYQ Papers Solved</p>
          <p className="text-2xl font-bold font-mono-nums text-slate-900 mt-1">
            {quizzesTaken}
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Recent Study Timeline</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {activities.map((item) => (
            <div key={item.id} className="px-5 py-3.5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <span className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  {item.type === 'video' ? (
                    <Play className="w-4 h-4" />
                  ) : item.type === 'note' ? (
                    <FileText className="w-4 h-4" />
                  ) : item.type === 'quiz' ? (
                    <HelpCircle className="w-4 h-4" />
                  ) : (
                    <BookOpen className="w-4 h-4" />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.detail}</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono-nums shrink-0 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {item.timeLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProfileViewProps {
  studentName: string;
  targetBatch: string;
  bannerTheme: BannerTheme;
  onUpdateProfile: (name: string, batch: string) => void;
  onChangeBannerTheme: (theme: BannerTheme) => void;
}

export function ProfileView({
  studentName,
  targetBatch,
  bannerTheme,
  onUpdateProfile,
  onChangeBannerTheme,
}: ProfileViewProps) {
  const [nameInput, setNameInput] = useState(studentName);
  const displayBatch =
    targetBatch === 'Class 12 · IIT-JEE Batch'
      ? 'Class 11 & 12 · Bihar Board'
      : targetBatch;
  const [batchInput, setBatchInput] = useState(displayBatch);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = nameInput.trim() || 'Rahul Sharma';
    onUpdateProfile(cleanName, batchInput);
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 flex items-center gap-4 shadow-xs">
        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">{studentName}</h1>
          <p className="text-sm text-slate-500">
            {displayBatch} · Pradeep Teaching Center
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-5 shadow-xs"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Student Details</h2>
          {savedNotice && (
            <span className="text-xs font-semibold text-emerald-700">Profile updated</span>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="student-name" className="block text-xs font-semibold text-slate-700">
            Full Name
          </label>
          <input
            id="student-name"
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="w-full min-h-[44px] rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="student-batch" className="block text-xs font-semibold text-slate-700">
            Target Batch
          </label>
          <select
            id="student-batch"
            value={batchInput}
            onChange={(e) => setBatchInput(e.target.value)}
            className="w-full min-h-[44px] rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          >
            <option value="Class 11 & 12 · Bihar Board">Class 11 &amp; 12 · Bihar Board</option>
            <option value="Class 12 · Bihar Board">Class 12 · Bihar Board</option>
            <option value="Class 11 · Bihar Board">Class 11 · Bihar Board</option>
            <option value="Class 12 · CBSE Board Target">Class 12 · CBSE Board Target</option>
          </select>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-700">Welcome Banner Style</p>
          <div className="grid grid-cols-3 gap-2.5">
            {(
              [
                { id: 'sky', label: 'Sky Blue', swatch: 'bg-[#DCEBFF]' },
                { id: 'mint', label: 'Mint Green', swatch: 'bg-[#D5F5E3]' },
                { id: 'peach', label: 'Warm Peach', swatch: 'bg-[#FDEBD0]' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChangeBannerTheme(opt.id)}
                className={`min-h-[44px] px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors ${
                  bannerTheme === opt.id
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className={`w-4 h-4 rounded-full ${opt.swatch} border border-black/10 shrink-0`} />
                <span className="truncate">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
