import moment from "moment";
import "moment/locale/de";
import { useRef, useState } from "react";
import { ErrorScreen, LoadingScreen } from "./InfoScreen";
import SessionDetails, { SessionPreview } from "./SessionDetails";
import { useGetSessionsGroupedByDayQuery } from "./directus";
import { dataSource } from "./query";
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

function App() {
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

  const [selectedSession, setSelectedSession] = useState<SessionPreview | null>(
    null,
  );

  const sessionsQuery = useGetSessionsGroupedByDayQuery(dataSource, {});

  if (sessionsQuery.isLoading) return <LoadingScreen />;

  if (!sessionsQuery.data)
    return <ErrorScreen onClick={() => sessionsQuery.refetch()} />;

  const roomPositions = sessionsQuery.data.rooms.map((r) => r.id);

  return (
    <div className="flex h-screen">
      {/* Safe area background */}
      <div className="absolute top-[calc(-100rem+var(--safe-area-inset-top))] h-[100rem] w-full border-b" />
      {/* Title bar */}
      <div className="absolute top-0 h-10 w-full border-b">
        {sessionsQuery.isFetching ? (
          <div className="absolute bottom-1.5 left-0 right-0 text-center italic text-white">
            Lädt...
          </div>
        ) : moment(sessionsQuery.dataUpdatedAt).isBefore(
            moment().subtract(5, "minutes"),
          ) ? (
          <div className="absolute bottom-2 left-0 right-0 text-center text-sm text-white">
            Zuletzt aktualisiert:{" "}
            {moment(sessionsQuery.dataUpdatedAt).fromNow()}
          </div>
        ) : (
          <div className="absolute bottom-1.5 left-0 right-0 text-center text-white">
            Mind-Akademie
          </div>
        )}
      </div>
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
            style={{ height: hourHeight, transform: "translateY(-0.3rem)" }}
            key={i}
          >
            {i + hourOffset}
            <sup>00</sup>
          </div>
        ))}
      </div>
      {/* Main content (scrolls horizontally) */}
      <div className="mt-[var(--safe-area-inset-top)] flex snap-x snap-mandatory scroll-pl-2 divide-x overflow-x-scroll pr-[var(--safe-area-inset-right)]">
        {sessionsQuery.data.days.map(
          ({ id: dayId, date, sessions, comments }) => (
            /* Day column */
            <div
              className="flex w-[calc(100%+var(--safe-area-inset-right)-0.5rem-max(0.5rem,var(--safe-area-inset-right)))] max-w-2xl flex-shrink-0 snap-start flex-col bg-[#F2F2F2]"
              key={dayId}
            >
              {/* Date header */}
              <div className="h-6 flex-shrink-0 border-b bg-[#274E90] text-center text-white">
                {moment(date).locale("de").format("dddd")}
              </div>
              {/* Room headers */}
              <div
                className="flex h-12 flex-shrink-0 divide-x overflow-y-scroll border-b bg-[#6487DC] text-sm text-white"
                style={{
                  scrollbarGutter: "stable",
                }}
              >
                {sessionsQuery.data.rooms.map((r) => (
                  <div
                    className="flex flex-1 items-center justify-center overflow-y-hidden text-center"
                    key={r.id}
                  >
                    {r.name}
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
                  {sessions!
                    .map((s) => s!)
                    .map((s) => (
                      <div
                        className="flex flex-col justify-center border bg-white p-px text-center text-xs"
                        style={{
                          position: "absolute",
                          top: `calc(${getSessionHeight(s.time_start!)} - 1px)`,
                          left: `calc(${
                            s
                              .rooms!.map((room) =>
                                roomPositions.indexOf(room!.rooms_id!.id),
                              )
                              .reduce((a, b) => (a < b ? a : b)) /
                            roomPositions.length
                          }* (100% + 1px) - 1px`,
                          width: `calc(${
                            s.rooms!.length / roomPositions.length
                          } * (100% + 1px) + 1px)`,
                          height: `calc(${getSessionHeight(
                            s.time_start!,
                            s.time_end!,
                          )} + 1px)`,
                          backgroundColor: s.type!.background_color!,
                          color: s.type!.text_color!,
                          boxShadow: getWatchesSession(s.id)
                            ? "rgb(255 169 0) 0px 0px 12px 1px inset"
                            : undefined,
                        }}
                        onClick={() => setSelectedSession(s)}
                        key={s.id}
                      >
                        {s.type!.requires_referee ? (
                          <>
                            <div className="font-semibold">{s.referee}</div>
                            <div>{s.title}</div>
                          </>
                        ) : (
                          <div className="font-semibold">{s.title}</div>
                        )}
                      </div>
                    ))}
                  {comments!
                    .map((c) => c!)
                    .map((c) => (
                      <div
                        className="text-center text-xs"
                        style={{
                          position: "absolute",
                          top: `calc(${getSessionHeight(c.time!)} - 1px)`,
                          left: `calc(${
                            (c
                              .rooms!.map((room) =>
                                roomPositions.indexOf(room!.rooms_id!.id),
                              )
                              .reduce((a, b) => (a < b ? a : b)) /
                              roomPositions.length) *
                            100
                          }% - 1px`,
                          width: `calc(${
                            (c.rooms!.length / roomPositions.length) * 100
                          }% + 1px)`,
                        }}
                        key={c.id}
                      >
                        {c.content}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ),
        )}
      </div>
      {selectedSession && (
        <SessionDetails
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
}

export default App;
