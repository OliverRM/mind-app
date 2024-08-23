import moment from "moment";
import { Close, Star } from "./Icons";
import { SessionPreview, useSessionDetails } from "./dataSource";
import { useGetWatchesSession, useSetWatchesSession } from "./settings";

const SessionDetails = (params: {
  session: SessionPreview;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const getWatchesSession = useGetWatchesSession();
  const setWatchesSession = useSetWatchesSession();

  const query = useSessionDetails(params.session.id);

  const sessionP = params.session;
  const sessionQ = query.data;
  const session = sessionQ || sessionP;

  const fTime = (s: string) => moment("1970-01-01T" + s).format("HH:mm");

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 bg-black bg-opacity-75">
      <div className="absolute bottom-[calc(1rem+var(--safe-area-inset-bottom))] left-[calc(1rem+var(--safe-area-inset-left))] right-[calc(1rem+var(--safe-area-inset-right))] top-[calc(1rem+var(--safe-area-inset-top))] overflow-y-auto bg-white p-4">
        <div className="flex">
          <h3 className="flex-grow text-2xl text-[#d54839]">{session.title}</h3>
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
              {session.type}
              {session.referee ? <> von {session.referee}</> : null}
            </div>
            <div>
              {`${session.day}, ${fTime(session.timeStart)} bis ${fTime(session.timeEnd)} Uhr`}
            </div>
            <div>{session.location}</div>
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
        {sessionQ ? (
          sessionQ.description
            ?.split("\n")
            .filter((p) => p)
            .map((p, i) => (
              <p key={i} className="mt-2">
                {p}
              </p>
            ))
        ) : (
          <div className="italic">{query.isLoading ? "Lädt..." : "Fehler"}</div>
        )}
      </div>
    </div>
  );
};

export default SessionDetails;
