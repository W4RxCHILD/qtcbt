export default function QuizControls() {
  const sharedButtonClasses = `w-56 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white 
    dark:bg-blue-300 dark:hover:bg-blue-200 dark:text-black 
    font-semibold rounded-md shadow border border-white dark:border-black transition`;

  return (
    <div className="sticky top-4 z-10 flex justify-center">
      <div className="flex flex-row gap-2">
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
          Reset
        </button>
      </div>
    </div>
  );
}
