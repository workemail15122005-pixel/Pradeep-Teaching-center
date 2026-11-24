import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Pause,
  Play,
  RotateCcw,
  Save,
  X,
} from 'lucide-react';
import { VideoLecture } from '../data/curriculum';
import { LectureThumbnailArt } from './Illustrations';

interface LecturePlayerModalProps {
  lecture: VideoLecture;
  isCompleted: boolean;
  savedNote: string;
  onClose: () => void;
  onToggleComplete: (lectureId: string) => void;
  onSaveNote: (lectureId: string, note: string) => void;
}

function formatTime(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function LecturePlayerModal({
  lecture,
  isCompleted,
  savedNote,
  onClose,
  onToggleComplete,
  onSaveNote,
}: LecturePlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSec, setCurrentSec] = useState(0);
  const [speed, setSpeed] = useState<1 | 1.25 | 1.5 | 2>(1);
  const [noteDraft, setNoteDraft] = useState(savedNote);
  const [noteSavedToast, setNoteSavedToast] = useState(false);

  useEffect(() => {
    setNoteDraft(savedNote);
  }, [savedNote, lecture.id]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      setCurrentSec((prev) => {
        const next = prev + speed * 4;
        if (next >= lecture.durationSec) {
          setIsPlaying(false);
          return lecture.durationSec;
        }
        return next;
      });
    }, 500);
    return () => window.clearInterval(interval);
  }, [isPlaying, speed, lecture.durationSec]);

  const activeChapter =
    [...lecture.chapters]
      .reverse()
      .find((ch) => currentSec >= ch.timeSec) ?? lecture.chapters[0];

  const progressRatio = Math.min(1, currentSec / lecture.durationSec);

  const handleSave = () => {
    onSaveNote(lecture.id, noteDraft);
    setNoteSavedToast(true);
    window.setTimeout(() => setNoteSavedToast(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lecture-player-title"
    >
      <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl border border-slate-200 flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 py-4 bg-white/95 backdrop-blur-md border-b border-slate-100">
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500">
              {lecture.subjectName} · {lecture.instructor} · {lecture.durationLabel}
            </p>
            <h2
              id="lecture-player-title"
              className="text-lg sm:text-xl font-bold text-slate-900 truncate"
            >
              {lecture.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleComplete(lecture.id)}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                isCompleted
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? 'Completed' : 'Mark Watched'}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close lecture player"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Interactive Chalkboard Video Stage */}
          <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg">
            <div className="relative aspect-video w-full">
              <LectureThumbnailArt
                variant={lecture.thumbnailVariant}
                progressRatio={progressRatio}
                className="w-full h-full object-cover"
              />
              {/* Measured contrast scrim for live chalkboard note */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-between p-4 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-slate-200 bg-slate-900/75 px-3 py-1.5 rounded-lg border border-white/10">
                    {activeChapter.title}
                  </span>
                  <span className="font-mono-nums text-xs text-slate-200 bg-slate-900/75 px-2.5 py-1.5 rounded-lg border border-white/10">
                    {speed}x
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-900/85 border border-white/15 rounded-xl px-4 py-3 backdrop-blur-xs">
                    <p className="text-[11px] font-medium text-amber-300 mb-0.5">
                      Board Formula Focus
                    </p>
                    <p className="font-mono-nums text-sm sm:text-base text-white">
                      {activeChapter.boardNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Player Controls */}
            <div className="px-4 py-3 bg-slate-900 text-white space-y-2.5">
              <input
                type="range"
                min={0}
                max={lecture.durationSec}
                value={currentSec}
                onChange={(e) => setCurrentSec(Number(e.target.value))}
                aria-label="Seek lecture timeline"
                className="w-full accent-blue-500 cursor-pointer h-1.5 rounded-lg"
              />
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentSec(0);
                      setIsPlaying(true);
                    }}
                    aria-label="Restart lecture"
                    className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <span className="font-mono-nums text-xs text-slate-300 ml-1">
                    {formatTime(currentSec)} / {formatTime(lecture.durationSec)}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {([1, 1.25, 1.5, 2] as const).map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setSpeed(rate)}
                      className={`min-h-[34px] px-2.5 rounded-lg text-xs font-mono-nums transition-colors ${
                        speed === rate
                          ? 'bg-white text-slate-900 font-semibold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Two-column Chapters & Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Lecture Chapters</h3>
              <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50">
                {lecture.chapters.map((ch) => {
                  const isCurrent = ch.timeSec === activeChapter.timeSec;
                  return (
                    <button
                      key={ch.timeLabel}
                      type="button"
                      onClick={() => {
                        setCurrentSec(ch.timeSec);
                        setIsPlaying(true);
                      }}
                      className={`w-full text-left px-4 py-3 flex items-start justify-between gap-3 transition-colors min-h-[48px] ${
                        isCurrent ? 'bg-blue-50/90' : 'hover:bg-white'
                      }`}
                    >
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-semibold ${
                            isCurrent ? 'text-blue-700' : 'text-slate-800'
                          }`}
                        >
                          {ch.title}
                        </p>
                        <p className="text-xs text-slate-500 font-mono-nums mt-0.5 truncate">
                          {ch.boardNote}
                        </p>
                      </div>
                      <span className="font-mono-nums text-xs text-slate-500 flex items-center gap-1 shrink-0 pt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        {ch.timeLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Key Takeaways</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {lecture.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">·</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="lecture-personal-note"
                    className="text-sm font-bold text-slate-900"
                  >
                    My Lecture Notes
                  </label>
                  {noteSavedToast && (
                    <span className="text-xs font-medium text-emerald-700">Saved</span>
                  )}
                </div>
                <textarea
                  id="lecture-personal-note"
                  rows={3}
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  placeholder="Write important formulas or doubts to revise later..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="min-h-[40px] px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
