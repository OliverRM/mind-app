import { UseQueryResult } from "@tanstack/react-query";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useSetUser } from "./appContext";

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

export const QueryStateIndicator = (props: {
  query: UseQueryResult;
  className?: string;
  onRefreshClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  const setUser = useSetUser();
  const navigate = useNavigate();

  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center",
        props.className,
      )}
    >
      {props.query.isFetching ? (
        <>
          <div className="mb-8 text-2xl font-semibold text-bdazzled-700">
            Lädt...
          </div>
          <LoadingIndicator />
        </>
      ) : (
        <>
          <div className="mb-4 text-2xl font-semibold text-vermilion-700">
            Fehler
          </div>
          <p className="max-w-md text-center text-xl">
            Beim Laden der Daten ist ein Fehler aufgetreten. Hast Du eine aktive
            Internetverbindung?
          </p>
          <button
            className="mt-8 w-64 rounded-md bg-bdazzled-700 px-4 py-2 font-bold text-white"
            onClick={props.onRefreshClick ?? (() => props.query.refetch())}
          >
            Erneut versuchen
          </button>
          <button
            className="mt-4 w-64 rounded-md border border-vermilion-700 px-4 py-2 font-semibold text-vermilion-700"
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            Abmelden
          </button>
        </>
      )}
    </div>
  );
};
