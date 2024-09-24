import moment from "moment";
import "moment/dist/locale/de";
import { useEffect, useRef, useState } from "react";
import { QueryStateIndicator } from "./InfoScreen";
import SessionDetails from "./SessionDetails";
import TitleBar from "./TitleBar";
import { useSchedule } from "./dataSource";

const hourOffset = 7;
const hourHeight = "4rem";

const getSessionHeight = (start: string, end?: string) =>
  `calc(${
    end === undefined
      ? new Date(`1970-01-01T${start}Z`).getTime() / 1000 / 60 / 60 - hourOffset
      : new Date(`1970-01-01T${end}Z`).getTime() / 1000 / 60 / 60 -
        new Date(`1970-01-01T${start}Z`).getTime() / 1000 / 60 / 60
  } * ${hourHeight})`;
const getSessionCenter = (start: string, end: string) =>
  `calc(${
    (new Date(`1970-01-01T${start}Z`).getTime() / 1000 / 60 / 60 +
      new Date(`1970-01-01T${end}Z`).getTime() / 1000 / 60 / 60) /
      2 -
    hourOffset
  } * ${hourHeight})`;

function Schedule() {
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

  if (!scheduleQuery.data)
    return (
      <div className="flex h-full flex-col">
        <TitleBar className="shrink-0" query={scheduleQuery}>
          Mind-Akademie
        </TitleBar>
        <QueryStateIndicator className="grow bg-white" query={scheduleQuery} />
      </div>
    );

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
            {/* Session labels */}
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
                        backgroundColor:
                          (s.subscribed && s.backgroundColorHighlighted) ||
                          s.backgroundColor,
                        border: s.border ? "1px solid #000" : "none",
                        // Legacy highlight effect
                        boxShadow:
                          s.subscribed && !s.backgroundColorHighlighted
                            ? "#274e90 0px 0px 0px 2px inset"
                            : undefined,
                      }}
                      onClick={
                        s.sessionId !== null
                          ? () => setSelectedSession(s.sessionId)
                          : undefined
                      }
                      key={s.id}
                    />
                  ))}
                {/* Session texts */}
                {scheduleQuery.data.sessions
                  .filter((s) => s.day === dayId)
                  .map((s) => (
                    <div
                      className="pointer-events-none flex flex-col items-center justify-center overflow-visible whitespace-pre bg-green-500 bg-opacity-20 text-center text-xs"
                      style={{
                        position: "absolute",
                        top: getSessionCenter(s.timeStart, s.timeEnd),
                        left: `calc(${
                          (s.columnStart + s.columnEnd + 1) /
                          (2 * day.columns.length)
                        }* (100% + 1px) - 1px`,
                        width: 0,
                        height: 0,
                        color:
                          (s.subscribed && s.textColorHighlighted) ||
                          s.textColor,
                      }}
                      key={s.id}
                    >
                      <div className="font-semibold">{s.title}</div>
                      {s.subtitle !== null && <div>{s.subtitle}</div>}
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

export default Schedule;
