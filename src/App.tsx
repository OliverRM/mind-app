import moment from "moment";
import "moment/locale/de";
import { useRef } from "react";
import { useGetSessionsQuery } from "./directus";

const dataSource = {
  endpoint: "https://d2pmqswy9qlmav.cloudfront.net/graphql",
  fetchParams: {
    headers: {
      Authorization: "bearer pE7rJIQGFrku4_lNGQ6EnFEJmEKv-WH7",
      "Content-Type": "application/json",
    },
  },
};

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
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement }>({});

  const onScroll = (e: React.UIEvent<HTMLDivElement>) =>
    Object.values(scrollRefs.current).forEach(
      (el) => (el.scrollTop = e.currentTarget.scrollTop),
    );

  const sessionsQuery = useGetSessionsQuery(dataSource, {});

  if (sessionsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!sessionsQuery.data) {
    return <div>Something went wrong</div>;
  }

  const roomPositions = sessionsQuery.data.rooms.map((r) => r.id);

  return (
    <div className="flex h-screen">
      <div
        className="w-12 flex-shrink-0 overflow-y-scroll border-r bg-[#F2F2F2] pr-2"
        style={{
          paddingTop: "5.5rem",
          paddingBottom: "1rem",
        }}
        ref={(el) => {
          scrollRefs.current["__time__"] = el!;
        }}
        onScroll={onScroll}
      >
        {Array.from({ length: 24 - hourOffset }, (_, i) => (
          <div
            className="text-right text-xs"
            style={{ height: hourHeight, transform: "translateY(-0.3rem)" }}
            key={i}
          >
            {i + hourOffset}:00
          </div>
        ))}
      </div>
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-scroll p-4">
        {sessionsQuery.data.days.map(
          ({ id: dayId, date, sessions, comments }) => (
            <div
              className="flex w-full flex-shrink-0 snap-center flex-col border bg-[#F2F2F2]"
              key={dayId}
            >
              <div className="h-6 flex-shrink-0 border-b bg-[#274E90] text-center text-white">
                {moment(date).locale("de").format("dddd")}
              </div>
              <div className="flex h-12 flex-shrink-0 divide-x border-b text-sm text-white">
                {sessionsQuery.data.rooms.map((r) => (
                  <div
                    className="flex flex-1 content-center items-center bg-[#6487DC] text-center"
                    key={r.id}
                  >
                    {r.name}
                  </div>
                ))}
              </div>
              <div
                className="flex-grow overflow-y-scroll"
                ref={(el) => {
                  scrollRefs.current[dayId] = el!;
                }}
                onScroll={onScroll}
              >
                <div
                  className="relative overflow-clip"
                  style={{
                    height: `calc(${24 - hourOffset} * ${hourHeight})`,
                    width: "100%",
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
                            (s
                              .rooms!.map((room) =>
                                roomPositions.indexOf(room!.rooms_id!.id),
                              )
                              .reduce((a, b) => (a < b ? a : b)) /
                              roomPositions.length) *
                            100
                          }% - 1px`,
                          width: `calc(${
                            (s.rooms!.length / roomPositions.length) * 100
                          }% + 1px)`,
                          height: `calc(${getSessionHeight(
                            s.time_start!,
                            s.time_end!,
                          )} + 1px)`,
                          backgroundColor: s.type!.background_color!,
                          color: s.type!.text_color!,
                        }}
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
    </div>
  );
}

export default App;
