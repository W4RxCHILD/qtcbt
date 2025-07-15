export default function QuizControls() {
  const buttonBase = `min-w-[8rem] h-12 px-4 
    bg-blue-600 hover:bg-blue-700 text-white 
    dark:bg-blue-300 dark:hover:bg-blue-200 dark:text-black 
    font-semibold rounded-md shadow border border-white dark:border-black 
    text-center transition`;

  return (
    <div className="sticky top-4 z-10 flex justify-center pr-4 sm:pr-8 md:pr-16">
      <div className="flex gap-4">
        <button
          onClick={() => window.dispatchEvent(new Event('revealAllQuestions'))}
          className={buttonBase}
        >
          Check All
        </button>
        <button
          onClick={() => window.dispatchEvent(new Event('resetAllQuestions'))}
          className={buttonBase}
        >
          Reset All
        </button>
      </div>
    </div>
  );
}
