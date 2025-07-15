export default function QuizControls() {
  const sharedButtonClasses = `px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white 
    dark:bg-blue-300 dark:hover:bg-blue-200 dark:text-black 
    font-semibold rounded-md shadow border border-white dark:border-black transition 
    text-center`;

  return (
    <div className="sticky top-4 z-10 flex justify-center">
      <div className="inline-flex gap-4">
        {/* Check All Button defines width & height */}
        <div className="w-56 h-12">
          <button
            onClick={() => window.dispatchEvent(new Event('revealAllQuestions'))}
            className={`${sharedButtonClasses} w-full h-full`}
          >
            Check All
          </button>
        </div>

        {/* Reset Button auto-sizes to match */}
        <div className="h-12">
          <button
            onClick={() => window.dispatchEvent(new Event('resetAllQuestions'))}
            className={`${sharedButtonClasses} h-full px-6`}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
