import { Close, Star } from "./Icons";
import { useGetSessionByIdQuery } from "./directus";
import { dataSource } from "./query";
import { useGetWatchesSession, useSetWatchesSession } from "./settings";

export type SessionPreview = {
  __typename?: "sessions";
  id: string;
  title?: string | null;
  referee?: string | null;
  cancelled?: boolean | null;
  time_start?: string | null;
  time_end?: string | null;
  type?: {
    __typename?: "session_types";
    name?: string | null;
    requires_referee?: boolean | null;
    background_color?: string | null;
    text_color?: string | null;
  } | null;
  rooms?: Array<{
    __typename?: "sessions_rooms";
    rooms_id?: {
      __typename?: "rooms";
      id: string;
      name?: string | null;
    } | null;
  } | null> | null;
};

const SessionDetails = (params: {
  session: SessionPreview;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const getWatchesSession = useGetWatchesSession();
  const setWatchesSession = useSetWatchesSession();

  const query = useGetSessionByIdQuery(dataSource, {
    sessionId: params.session.id,
  });

  const sessionP = params.session;
  const sessionQ = query.data?.sessions_by_id;
  const session = sessionQ || sessionP;

  return (
    <div className="fixed  bottom-0 left-0 right-0 top-0 bg-black bg-opacity-75">
      <div className="absolute bottom-[calc(1rem+var(--safe-area-inset-bottom))] left-[calc(1rem+var(--safe-area-inset-left))] right-[calc(1rem+var(--safe-area-inset-right))] top-[calc(1rem+var(--safe-area-inset-top))] overflow-y-auto bg-white p-4">
        <div className="flex">
          <h3 className="flex-grow text-2xl text-[#d54839]">
            {sessionQ?.title_long || sessionP.title}
          </h3>
          <button
            className="ml-2 flex-shrink-0 self-start p-2"
            onClick={params.onClose}
          >
            <Close className="h-4 w-4 text-slate-400" />
          </button>
        </div>
        <hr className="border-[#d54839]" />
        <div className="mb-4 mt-4 flex text-sm text-slate-600">
          <div className="flex-grow">
            <div>
              {session.type?.name} von{" "}
              {sessionQ?.referee_long || sessionP.referee}
            </div>
            <div>
              {sessionQ ? <>{sessionQ.day?.display}, </> : null}
              {session.time_start} bis {session.time_end}
            </div>
            <div>
              {session.rooms?.length
                ? session.rooms!.length <= 1
                  ? session.rooms![0]!.rooms_id!.name
                  : session
                      .rooms!.map((r) => r!.rooms_id!.name)
                      .slice(0, -1)
                      .join(", ") +
                    " und " +
                    session.rooms![session.rooms!.length - 1]!.rooms_id!.name
                : ""}
            </div>
          </div>
          <Star
            filled={getWatchesSession(sessionP.id)}
            className="h-8 text-amber-500"
            onClick={() =>
              setWatchesSession(sessionP.id, !getWatchesSession(sessionP.id))
            }
          />
        </div>
        {session.cancelled ? (
          <div className="font-semibold text-red-700">Abgesagt</div>
        ) : null}
        {!query.data ? (
          <div className="italic">{query.isLoading ? "Lädt..." : "Fehler"}</div>
        ) : sessionQ?.description ? (
          sessionQ.description
            ?.split("\n")
            .filter((p) => p)
            .map((p) => <p className="mt-2">{p}</p>)
        ) : null}
      </div>
    </div>
  );
};

export default SessionDetails;
