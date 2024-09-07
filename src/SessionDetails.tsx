import moment from "moment";
import { Close, Star } from "./Icons";
import { useSessionDetails } from "./dataSource";
import { useGetWatchesSession, useSetWatchesSession } from "./settings";

const SessionDetails = (params: {
  sessionId: number;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const getWatchesSession = useGetWatchesSession();
  const setWatchesSession = useSetWatchesSession();

  const query = useSessionDetails(params.sessionId);

  const session = query.data;

  const fDay = (s: string) => moment(s).format("dddd");
  const fTime = (s: string) => moment(s).format("HH:mm");

  // TODO: Return loading indicator
  if (!session) return null;

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
              {session.sessionType} von {session.speaker}
            </div>
            <div>
              {`${fDay(session.startTime)}, ${fTime(session.startTime)} bis ${fTime(session.endTime)} Uhr`}
            </div>
            <div>{session.location}</div>
          </div>
          <Star
            filled={getWatchesSession(session.id.toString())}
            className="h-8 text-amber-500"
            onClick={() =>
              setWatchesSession(
                session.id.toString(),
                !getWatchesSession(session.id.toString()),
              )
            }
          />
        </div>
        {session.changeFlag === "Cancelled" ? (
          <div className="font-semibold text-red-700">Abgesagt</div>
        ) : null}
        {session.abstractDescription
          ?.split("\n")
          .filter((p) => p)
          .map((p, i) => (
            <p key={i} className="mt-2">
              {p}
            </p>
          ))}
        {session.speakerCV && (
          <h2 className="mt-4 text-sm text-slate-500 underline">
            Über der Redner:
          </h2>
        )}
        {session.speakerCV
          ?.split("\n")
          .filter((p) => p)
          .map((p, i) => (
            <p key={i} className="mt-2">
              {p}
            </p>
          ))}
      </div>
    </div>
  );
};

export default SessionDetails;
