import { useState } from 'react';

interface Props {
  id: string;
  question: string;
  options: string[];
  correctIndexes: number[];
}

export default function QuestionBlock({ id, question, options, correctIndexes }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div id={id} className="mb-8 not-prose">
      {/* Question line: fixed bullet + flexible text */}
      <div className="flex items-start mb-0.5">
        <span className="text-blue-600 dark:text-blue-400 font-bold w-[1.5rem]">🔹</span>
        <p className="text-2xl font-semibold mb-0.5 text-slate-900 dark:text-slate-100">
          {question}
        </p>
      </div>

      {/* Answers block: indented to align with start of question text (not bullet) */}
      <div className="ml-[1.5rem] space-y-l">
        {options.map((option, i) => (
          <div key={i} className="flex gap-2 items-center leading-none">
            <span className="w-5 flex items-center justify-center text-xl leading-none">
              {revealed && correctIndexes.includes(i) ? (
                <span className="text-green-600 dark:text-green-400">✅</span>
              ) : (
                '•'
              )}
            </span>
            <span className="text-xl leading-tight text-slate-800 dark:text-slate-200">
              {option}
            </span>
          </div>
        ))}
      </div>

      {/* Button block: consistent margin and clean styling */}
      <div className="ml-[1.5rem] mt-4">
        <button
          onClick={() => setRevealed(true)}
          className="w-56 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white 
                     dark:bg-blue-300 dark:hover:bg-blue-200 dark:text-black 
                     font-semibold rounded-md shadow border border-white dark:border-black transition"
        >
          Check Answer
        </button>
      </div>
    </div>
  );
}
