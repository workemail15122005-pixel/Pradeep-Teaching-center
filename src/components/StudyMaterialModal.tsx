import React, { useState } from 'react';
import {
  Bookmark,
  CheckCircle2,
  Download,
  FileText,
  HelpCircle,
  RotateCcw,
  X,
  XCircle,
} from 'lucide-react';
import { PdfNoteItem, QuestionBankItem } from '../data/curriculum';

interface PdfViewerModalProps {
  note: PdfNoteItem;
  isBookmarked: boolean;
  onToggleBookmark: (noteId: string) => void;
  onClose: () => void;
}

export function PdfViewerModal({
  note,
  isBookmarked,
  onToggleBookmark,
  onClose,
}: PdfViewerModalProps) {
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleDownloadText = async () => {
    const content = [
      `PRADEEP TEACHING CENTER - ${note.title}`,
      `${note.subtitle} (${note.updatedLabel})`,
      '='.repeat(48),
      '',
      ...note.sections.flatMap((sec) => [
        sec.heading,
        sec.formula ? `Formula: ${sec.formula}` : '',
        ...sec.points.map((pt) => `  - ${pt}`),
        '',
      ]),
    ]
      .filter(Boolean)
      .join('\n');

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: `${note.title} - Pradeep Teaching Center`,
          text: content,
        });
        return;
      } catch {
        // User cancelled share or WebView blocked share; fall back cleanly
      }
    }

    try {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `${note.id}.txt`;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch {
      // Ignore download fallback errors in restricted WebViews
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(content);
        setExportNotice('Copied');
        window.setTimeout(() => setExportNotice(null), 1800);
      } catch {
        // Ignore clipboard failure
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-viewer-title"
    >
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl border border-slate-200 flex flex-col">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 py-4 bg-white/95 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 id="pdf-viewer-title" className="text-lg font-bold text-slate-900 truncate">
                {note.title}
              </h2>
              <p className="text-xs text-slate-500">
                {note.subtitle} · {note.pages} pages · {note.updatedLabel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleBookmark(note.id)}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark notes'}
              className={`min-h-[40px] px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {isBookmarked ? 'Saved' : 'Bookmark'}
            </button>
            <button
              type="button"
              onClick={handleDownloadText}
              className="min-h-[40px] px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              {exportNotice ?? 'Share / Save'}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close notes"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {note.sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 space-y-3"
            >
              <h3 className="text-base font-bold text-slate-900">{section.heading}</h3>
              {section.formula && (
                <div className="rounded-xl bg-white border border-slate-200 px-4 py-2.5 font-mono-nums text-sm text-blue-700 overflow-x-auto">
                  {section.formula}
                </div>
              )}
              <ul className="space-y-2 text-sm text-slate-700 leading-relaxed">
                {section.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold mt-0.5">·</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

interface QuestionBankModalProps {
  bank: QuestionBankItem;
  onRecordScore: (bankId: string, score: number, total: number) => void;
  onClose: () => void;
}

export function QuestionBankModal({
  bank,
  onRecordScore,
  onClose,
}: QuestionBankModalProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = bank.questions.reduce(
    (acc, q) => (selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc),
    0,
  );

  const handleSubmit = () => {
    setSubmitted(true);
    onRecordScore(bank.id, correctCount, bank.questions.length);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const [pyqNotice, setPyqNotice] = useState<string | null>(null);

  const handleDownloadPyq = async () => {
    const content = [
      `PRADEEP TEACHING CENTER - ${bank.title}`,
      `${bank.subtitle} (${bank.year})`,
      '='.repeat(48),
      '',
      ...bank.questions.flatMap((q, idx) => [
        `Q${idx + 1}. ${q.question}`,
        ...q.options.map((opt, i) => `   (${String.fromCharCode(65 + i)}) ${opt}`),
        `Answer: (${String.fromCharCode(65 + q.correctIndex)}) ${q.options[q.correctIndex]}`,
        `Solution: ${q.explanation}`,
        '',
      ]),
    ].join('\n');

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: `${bank.title} - Pradeep Teaching Center`,
          text: content,
        });
        return;
      } catch {
        // Fall through cleanly
      }
    }

    try {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `${bank.id}.txt`;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch {
      // Ignore restricted WebView download error
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(content);
        setPyqNotice('Copied');
        window.setTimeout(() => setPyqNotice(null), 1800);
      } catch {
        // Ignore clipboard failure
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="question-bank-title"
    >
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl border border-slate-200 flex flex-col">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 py-4 bg-white/95 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 id="question-bank-title" className="text-lg font-bold text-slate-900 truncate">
                {bank.title}
              </h2>
              <p className="text-xs text-slate-500">
                {bank.subjectLabel} · {bank.questions.length} Questions · {bank.durationMins} min
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownloadPyq}
              className="min-h-[40px] px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              {pyqNotice ?? 'Share / Save'}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close question bank"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {submitted && (
            <div className="rounded-2xl bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-300">Practice Result</p>
                <p className="text-2xl font-bold font-mono-nums">
                  {correctCount} / {bank.questions.length} Correct
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="min-h-[40px] px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-100 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retry Paper
              </button>
            </div>
          )}

          {bank.questions.map((q, index) => {
            const chosen = selectedAnswers[q.id];
            return (
              <div
                key={q.id}
                className="rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3 bg-white"
              >
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span>
                    Question {index + 1} · {q.subject}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                  {q.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = chosen === optIndex;
                    const isCorrect = q.correctIndex === optIndex;

                    let stateClass =
                      'border-slate-200 bg-slate-50/70 text-slate-800 hover:bg-slate-100';
                    if (submitted) {
                      if (isCorrect) {
                        stateClass = 'border-emerald-500 bg-emerald-50 text-emerald-900';
                      } else if (isSelected && !isCorrect) {
                        stateClass = 'border-rose-400 bg-rose-50 text-rose-900';
                      }
                    } else if (isSelected) {
                      stateClass = 'border-blue-600 bg-blue-50 text-blue-900';
                    }

                    return (
                      <button
                        key={optIndex}
                        type="button"
                        disabled={submitted}
                        onClick={() =>
                          setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIndex }))
                        }
                        className={`min-h-[44px] text-left px-3.5 py-2.5 rounded-xl border text-sm font-medium flex items-center justify-between gap-2 transition-colors ${stateClass}`}
                      >
                        <span>{opt}</span>
                        {submitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {submitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900">Solution: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}

          {!submitted && (
            <div className="flex items-center justify-between gap-4 pt-2">
              <span className="text-xs text-slate-500 font-mono-nums">
                {answeredCount} of {bank.questions.length} answered
              </span>
              <button
                type="button"
                disabled={answeredCount === 0}
                onClick={handleSubmit}
                className="min-h-[44px] px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold transition-colors"
              >
                Check Answers
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
