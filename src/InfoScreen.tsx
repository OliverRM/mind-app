import { MouseEventHandler } from "react";

export const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center px-8 text-center text-neutral-900">
      <h1 className="mb-8 text-4xl font-bold">Lädt...</h1>
      <svg className="h-8 w-8 animate-spin text-[#274E90]" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="#274E90"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="#274E90"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </div>
  );
};

export const ErrorScreen = (params: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center px-8 text-center text-neutral-900">
      <h1 className="mb-8 text-4xl font-bold">Fehler</h1>
      <p className="max-w-md text-xl">
        Beim Laden der Daten ist ein Fehler aufgetreten. Hast Du eine aktive
        Internetverbindung?
      </p>
      <button
        className="mt-8 rounded-md bg-[#274E90] px-4 py-2 font-bold text-white hover:bg-[#6487DC]"
        onClick={params.onClick}
      >
        Erneut versuchen
      </button>
    </div>
  );
};
