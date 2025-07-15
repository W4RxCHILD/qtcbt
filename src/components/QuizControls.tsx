export default function QuizControls() {
  const sharedButtonClasses = `flex items-center justify-center w-full h-12 px-4 
    text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 
    dark:bg-blue-300 dark:hover:bg-blue-200 dark:text-black 
    shadow transition whitespace-nowrap leading-none`;

  return (
    <div className="sticky top-4 z-10 flex justify-end pr-4 sm:pr-8 md:pr-16">
      <div className="w-56 bg-transparent p-0 m-0">
        <button
          onClick={() => window.dispatchEvent(new Event('revealAllQuestions'))}
          className={`${sharedButtonClasses} rounded-t-md border border-white border-b-0 dark:border-black`}
        >
          Check All
        </button>
        <button
          onClick={() => window.dispatchEvent(new Event('resetAllQuestions'))}
          className={`${sharedButtonClasses} rounded-b-md border border-white border-t-0 dark:border-black`}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
