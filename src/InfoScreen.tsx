import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

export const LoadingIndicator = (props: { className?: string }) => (
  <svg
    className={twMerge("h-8 w-8 animate-spin", props.className)}
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="#EB7F62"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="#EB7F62"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

export const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center px-8 text-center text-[#F2F2F2]">
      <h1 className="mb-8 text-4xl font-bold">Lädt...</h1>
      <LoadingIndicator />
    </div>
  );
};

export const ErrorScreen = (params: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center px-8 text-center text-[#F2F2F2]">
      <h1 className="mb-8 text-4xl font-bold">Fehler</h1>
      <p className="max-w-md text-xl">
        Beim Laden der Daten ist ein Fehler aufgetreten. Hast Du eine aktive
        Internetverbindung?
      </p>
      <button
        className="mt-8 rounded-md bg-[#6487DC] px-4 py-2 font-bold"
        onClick={params.onClick}
      >
        Erneut versuchen
      </button>
    </div>
  );
};
