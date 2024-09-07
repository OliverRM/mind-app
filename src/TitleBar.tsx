import { UseQueryResult } from "@tanstack/react-query";
import moment from "moment";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Refresh } from "./Icons";

const TitleBar = (props: {
  children: ReactNode;
  className?: string;
  query: UseQueryResult;
}) => {
  const query = props.query;

  return (
    <div
      className={twMerge(
        "relative h-[calc(2.5rem+var(--safe-area-inset-top))] text-center text-white",
        props.className,
      )}
      onClick={() => query.refetch()}
    >
      <Refresh className="absolute bottom-3 right-[calc(0.5rem+var(--safe-area-inset-right))] h-4 opacity-80" />
      {query.isFetching ? (
        <div className="absolute bottom-1.5 left-0 right-0 italic">Lädt...</div>
      ) : moment(query.dataUpdatedAt).isBefore(
          moment().subtract(5, "minutes"),
        ) ? (
        <div className="absolute bottom-2 left-0 right-0 text-sm">
          Zuletzt aktualisiert: {moment(query.dataUpdatedAt).fromNow()}
        </div>
      ) : (
        <header className="absolute bottom-1.5 left-0 right-0">
          {props.children}
        </header>
      )}
    </div>
  );
};

export default TitleBar;
