export default function QuizControls() {
  const sharedButtonClasses = `inline-flex items-center justify-center 
    w-[12rem] h-[3.5rem] px-4 text-base font-semibold text-white 
    bg-blue-600 hover:bg-blue-700 
    dark:bg-blue-300 dark:hover:bg-blue-200 dark:text-black 
    shadow transition rounded-md border border-white dark:border-black`;

  return (
    <div className="sticky top-4 z-10 flex justify-center mt-4">
      <div className="flex gap-4 items-center">
        <button
          onClick={() => window.dispatchEvent(new Event('revealAllQuestions'))}
          className={sharedButtonClasses}
        >
          Check All
        </button>
        <button
          onClick={() => window.dispatchEvent(new Event('resetAllQuestions'))}
          className={sharedButtonClasses}
        >
          Reset All
        </button>
      </div>
    </div>
  );
}
