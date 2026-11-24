import React from 'react';
import { CheckCircle2, Circle, Play, X } from 'lucide-react';
import {
  SubjectFolder,
  VIDEO_LECTURES,
  VideoLecture,
} from '../data/curriculum';
import { SubjectFolderIcon } from './Illustrations';

interface SubjectExplorerModalProps {
  subject: SubjectFolder;
  completedTopics: Record<string, boolean>;
  onToggleTopic: (topicId: string) => void;
  onSelectLecture: (lecture: VideoLecture) => void;
  onClose: () => void;
}

export function SubjectExplorerModal({
  subject,
  completedTopics,
  onToggleTopic,
  onSelectLecture,
  onClose,
}: SubjectExplorerModalProps) {
  const subjectLectures = VIDEO_LECTURES.filter(
    (lec) => lec.subjectId === subject.id,
  );
  const doneCount = subject.topics.filter((t) => completedTopics[t.id]).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="subject-explorer-title"
    >
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl border border-slate-200 flex flex-col">
        <div
          className={`${subject.gradientClass} text-white px-5 py-5 sm:px-6 flex items-center justify-between gap-4`}
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <SubjectFolderIcon subjectId={subject.id} className="w-9 h-9" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white/85">
                {subject.topicCountLabel} · Faculty: {subject.instructor}
              </p>
              <h2
                id="subject-explorer-title"
                className="text-xl font-bold tracking-tight truncate"
              >
                {subject.displayTitle} Folder
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close subject folder"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">{subject.description}</p>
            <span className="font-mono-nums text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
              {doneCount} / {subject.topics.length} Topics Completed
            </span>
          </div>

          {/* Chapters & Topics Checklist */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900">Syllabus Topics</h3>
            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 overflow-hidden">
              {subject.topics.map((topic) => {
                const isDone = !!completedTopics[topic.id];
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => onToggleTopic(topic.id)}
                    className="w-full text-left px-4 py-3.5 flex items-start justify-between gap-3 hover:bg-slate-50 transition-colors min-h-[56px]"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300" />
                        )}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">
                          {topic.chapter} · {topic.difficulty} · {topic.duration}
                        </p>
                        <p
                          className={`text-sm font-semibold mt-0.5 ${
                            isDone ? 'text-slate-400 line-through' : 'text-slate-900'
                          }`}
                        >
                          {topic.title}
                        </p>
                        {topic.keyFormula && (
                          <p className="font-mono-nums text-xs text-blue-700 mt-1">
                            {topic.keyFormula}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Linked Video Lectures */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900">
              Recommended {subject.displayTitle} Lectures
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {subjectLectures.map((lec) => (
                <button
                  key={lec.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectLecture(lec);
                  }}
                  className="text-left p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 flex items-center justify-between gap-3 transition-colors min-h-[56px]"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {lec.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {lec.instructor} · {lec.durationLabel}
                    </p>
                  </div>
                  <span className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
