import { useState } from 'react';

interface Props {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export default function QuestionBlock({ id, question, options, correctIndex }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div id={id} className="my-2">
      {/* Question line: fixed bullet + flexible text */}
      <div className="flex items-start mb-2">
        <span className="text-blue-600 font-bold w-[1.5rem]">🔹</span>
        <p className="text-2xl font-semibold">{question}</p>
      </div>

      {/* Answers block: indented to align with start of question text (not bullet) */}
      <div className="ml-[1.5rem]">
        {options.map((option, i) => (
          <div key={i} className="flex gap-2 items-center">
            <span className="w-5 flex items-center justify-center text-xl">
              {revealed && i === correctIndex ? (
                <span className="text-green-600">✅</span>
              ) : (
                '•'
              )}
            </span>
            <span className="text-xl">{option}</span>
          </div>
        ))}
      </div>

     <button
  onClick={() => setRevealed(true)}
  className="mt-4 px-4 py-1 border border-blue-600 text-blue-600 rounded font-medium shadow-sm hover:bg-blue-600 hover:text-white transition"
>
  Show Answer
</button>

    </div>
  );
}
