import Markdown, { MarkdownToJSX } from "markdown-to-jsx";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetUser } from "./appContext";
import { useSessionDetails, useSubscribeSession } from "./dataSource";
import { Close, Star } from "./Icons";
import { QueryStateIndicator } from "./InfoScreen";

const markdownOptions: MarkdownToJSX.Options = {
  overrides: {
    a: {
      component: (props) => (
        <a
          {...props}
          className="text-bdazzled-700 underline"
          target="_blank"
          rel="noreferrer"
        />
      ),
    },
    h1: {
      props: { className: "mb-2 mt-4 font-semibold" },
    },
    h2: { props: { className: "mb-2 mt-4 font-semibold" } },
    ol: { props: { className: "mb-4 ml-6 list-disc" } },
    p: { props: { className: "mb-2" } },
    ul: { props: { className: "mb-2 ml-6 list-decimal" } },
  },
};

const SessionDetails = (params: {
  sessionId: number;
  onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}) => {
  const navigate = useNavigate();

  const setUser = useSetUser();
  const subscribeSession = useSubscribeSession(params.sessionId);

  const query = useSessionDetails(params.sessionId);

  const session = query.data;

  const fDay = (s: string) => moment(s).format("dddd");
  const fTime = (s: string) => moment(s).format("HH:mm");

  const [feedbackDelay, setFeedbackDelay] = useState(
    session ? new Date(session.startTime).getTime() - Date.now() : Number.NaN,
  );

  useEffect(() => {
    if (feedbackDelay > 0) {
      const timeout = setTimeout(() => {
        setFeedbackDelay(0);
      }, feedbackDelay);
      return () => clearTimeout(timeout);
    }
  }, [feedbackDelay]);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 bg-black bg-opacity-75"
      onClick={params.onClose}
    >
      <div
        className="absolute bottom-[calc(1rem+var(--safe-area-inset-bottom))] left-[calc(1rem+var(--safe-area-inset-left))] right-[calc(1rem+var(--safe-area-inset-right))] top-[calc(1rem+var(--safe-area-inset-top))] overflow-y-auto bg-white p-4"
        onClick={(e) => session && e.stopPropagation()}
      >
        {session ? (
          <>
            <div className="flex">
              <h3 className="flex-grow text-2xl text-[#d54839]">
                {session.title}
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
                  {session.sessionType}
                  {session.speaker !== null ? ` von ${session.speaker}` : ""}
                </div>
                <div>
                  {`${fDay(session.startTime)}, ${fTime(session.startTime)} bis ${fTime(session.endTime)} Uhr`}
                </div>
                <div>{session.location}</div>
              </div>
              <Star
                filled={session.subscribed === true}
                className="h-8 text-amber-500"
                onClick={() =>
                  typeof session.subscribed === "boolean"
                    ? subscribeSession.mutate(!session.subscribed)
                    : setUser(null)
                }
              />
            </div>
            {session.changeFlag === "Cancelled" ? (
              <div className="font-semibold text-red-700">Abgesagt</div>
            ) : null}
            {session.feedback &&
              feedbackDelay <= 0 &&
              (session.feedback.some((f) => f.answer) ? (
                <button
                  className="mb-4 mt-2 w-full rounded border border-bdazzled-700 p-2 text-bdazzled-700"
                  onClick={() => navigate(`/feedback/${session.id}`)}
                >
                  Feedback bearbeiten
                </button>
              ) : (
                <button
                  className="mb-4 mt-2 w-full rounded bg-bdazzled-700 p-2 text-white"
                  onClick={() => navigate(`/feedback/${session.id}`)}
                >
                  Feedback geben
                </button>
              ))}
            {session.abstractDescription && (
              <Markdown options={markdownOptions}>
                {session.abstractDescription}
              </Markdown>
            )}
            {session.speakerCV && (
              <>
                <h2 className="mt-4 text-sm text-neutral-500 underline">
                  Über {session.speaker || "den Redner"}:
                </h2>
                <Markdown options={markdownOptions}>
                  {session.speakerCV}
                </Markdown>
              </>
            )}
          </>
        ) : (
          <QueryStateIndicator
            className="h-full"
            query={query}
            onRefreshClick={(e) => {
              query.refetch();
              e.stopPropagation();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SessionDetails;
