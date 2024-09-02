import moment from "moment";
import "moment/dist/locale/de";
import { useEffect, useRef, useState } from "react";
import { ErrorScreen, LoadingScreen } from "./InfoScreen";
import SessionDetails from "./SessionDetails";
import TitleBar from "./TitleBar";
import { useSchedule } from "./dataSource";
import { useGetWatchesSession } from "./settings";

const hourOffset = 7;
const hourHeight = "4rem";

const getSessionHeight = (start: string, end?: string) =>
  `calc(${
    end === undefined
      ? new Date(`1970-01-01T${start}Z`).getTime() / 1000 / 60 / 60 - hourOffset
      : new Date(`1970-01-01T${end}Z`).getTime() / 1000 / 60 / 60 -
        new Date(`1970-01-01T${start}Z`).getTime() / 1000 / 60 / 60
  } *
    ${hourHeight})`;

function Timetable() {
  const getWatchesSession = useGetWatchesSession();

  const scrollRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const scrollElem = useRef<{ elem: HTMLDivElement | null }>({ elem: null });

  const onScrollTouchStart = (e: React.TouchEvent<HTMLDivElement>) =>
    (scrollElem.current.elem = e.currentTarget);
  const onScroll = (e: React.UIEvent<HTMLDivElement>) =>
    Object.values(scrollRefs.current).forEach(
      (el) =>
        el !== scrollElem.current.elem &&
        (el.scrollTop = e.currentTarget.scrollTop),
    );

  const [nowState, setNowState] = useState<string>(moment().format("HH:mm:ss"));
  useEffect(() => {
    setInterval(() => setNowState(moment().format("HH:mm:ss")), 10000);
  }, []);

  const [selectedSession, setSelectedSession] = useState<number | null>(null);

  const scheduleQuery = useSchedule();

  if (scheduleQuery.isLoading) return <LoadingScreen />;

  if (!scheduleQuery.data)
    return <ErrorScreen onClick={() => scheduleQuery.refetch()} />;

  return (
    <div className="flex h-full w-full">
      <TitleBar className="absolute w-full border-b" query={scheduleQuery}>
        Mind-Akademie
      </TitleBar>
      {/* Time bar */}
      <div
        className="scrollbar-hide mt-[calc(2.5rem+var(--safe-area-inset-top))] w-[calc(2rem+var(--safe-area-inset-left))] flex-shrink-0 overflow-y-scroll border-r bg-[#F2F2F2] pb-[var(--safe-area-inset-bottom)] pr-1 pt-[4.5rem]"
        ref={(el) => {
          scrollRefs.current["__time__"] = el!;
        }}
        onScroll={onScroll}
        onTouchStart={onScrollTouchStart}
      >
        {Array.from({ length: 24 - hourOffset }, (_, i) => (
          <div
            className="text-right text-xs"
            style={{ height: hourHeight, transform: "translateY(-0.5rem)" }}
            key={i}
          >
            {i + hourOffset}
            <sup>00</sup>
          </div>
        ))}
      </div>
      {/* Main content (scrolls horizontally) */}
      <div className="mt-[calc(2.5rem+var(--safe-area-inset-top))] flex snap-x snap-mandatory scroll-pl-2 divide-x overflow-x-scroll bg-[#b0b0b0] pr-[var(--safe-area-inset-right)]">
        {scheduleQuery.data.days.map((day, dayId) => (
          /* Day column */
          <div
            className="flex w-[calc(100%+var(--safe-area-inset-right)-0.5rem-max(0.5rem,var(--safe-area-inset-right)))] max-w-2xl flex-shrink-0 snap-start flex-col bg-[#F2F2F2]"
            key={dayId}
          >
            {/* Date header */}
            <div className="h-6 flex-shrink-0 border-b bg-[#274E90] text-center text-white">
              {day.name}
            </div>
            {/* Room headers */}
            <div
              className="flex h-12 flex-shrink-0 divide-x overflow-y-scroll border-b bg-[#6487DC] text-sm text-white"
              style={{
                scrollbarGutter: "stable",
              }}
            >
              {day.columns.map(({ title }, colId) => (
                <div
                  className="flex flex-1 items-center justify-center overflow-y-hidden text-center"
                  key={colId}
                >
                  {title}
                </div>
              ))}
            </div>
            {/* Sessions */}
            <div
              className="flex-grow overflow-x-hidden overflow-y-scroll"
              ref={(el) => {
                scrollRefs.current[dayId] = el!;
              }}
              onScroll={onScroll}
              onTouchStart={onScrollTouchStart}
            >
              <div
                className="relative w-full overflow-hidden"
                style={{
                  height: `calc(${
                    24 - hourOffset
                  } * ${hourHeight} + var(--safe-area-inset-bottom))`,
                }}
              >
                {scheduleQuery.data.sessions
                  .filter((s) => s.day === dayId)
                  .map((s) => (
                    <div
                      className="flex flex-col justify-center bg-white p-px text-center text-xs"
                      style={{
                        position: "absolute",
                        top: `calc(${getSessionHeight(s.timeStart)} - 1px)`,
                        left: `calc(${
                          s.columnStart / day.columns.length
                        }* (100% + 1px) - 1px`,
                        width: `calc(${
                          (s.columnEnd - s.columnStart + 1) / day.columns.length
                        } * (100% + 1px) + 1px)`,
                        height: `calc(${getSessionHeight(
                          s.timeStart,
                          s.timeEnd,
                        )} + 1px)`,
                        backgroundColor: s.backgroundColor,
                        color: s.textColor,
                        border: s.border ? "1px solid #000" : "none",
                        boxShadow:
                          s.sessionId !== null &&
                          getWatchesSession(s.sessionId.toString())
                            ? "#274e90 0px 0px 0px 2px inset"
                            : undefined,
                      }}
                      onClick={
                        s.sessionId !== null
                          ? () => setSelectedSession(s.sessionId)
                          : undefined
                      }
                      key={s.id}
                    >
                      <div
                        className={s.cancelled ? "line-through opacity-50" : ""}
                      >
                        <>
                          <div className="font-semibold">{s.title}</div>
                          {s.subtitle !== null && <div>{s.subtitle}</div>}
                        </>
                      </div>
                    </div>
                  ))}
                {/* Current time indicator */}
                {moment(day.date).isSame(moment(), "day") && (
                  <hr
                    className="absolute left-0 right-0 border-none"
                    style={{
                      top: getSessionHeight(nowState),
                      boxShadow: "0 0 2px 1px #DA441B",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedSession && (
        <SessionDetails
          sessionId={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
}

export default Timetable;
