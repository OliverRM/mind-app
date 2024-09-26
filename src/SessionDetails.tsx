import Markdown, { MarkdownToJSX } from "markdown-to-jsx";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useSetUser } from "./appContext";
import {
  type SessionDetails,
  useBookSession,
  useSessionDetails,
  useSubscribeSession,
} from "./dataSource";
import Feedback from "./Feedback";
import { Close, Star } from "./Icons";
import { LoadingIndicator, QueryStateIndicator } from "./InfoScreen";

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

const Registration = (props: { session: SessionDetails }) => {
  const navigate = useNavigate();
  const bookSession = useBookSession(props.session.id);
  const { book } = useLocation().state as { book: boolean };

  return (
    <div
      className="p-safe fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
      onClick={() => navigate(-1)}
    >
      <div
        className="max-w-80 rounded-xl bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 mt-8 text-center text-xl font-semibold text-vermilion-700">
          {book ? "Anmeldung" : "Abmeldung"}
        </h2>
        <div className="mb-8">
          Möchtest du dich für <i>{props.session.title}</i>{" "}
          {book ? "anmelden" : "abmelden"}?
        </div>
        {bookSession.isPending ? (
          <div className="flex justify-center">
            <LoadingIndicator />
          </div>
        ) : (
          <div className="flex justify-stretch">
            <button
              className="grow basis-0 rounded border border-bdazzled-700 p-2 text-bdazzled-700"
              onClick={() => navigate(-1)}
            >
              Abbrechen
            </button>
            <button
              className={twMerge(
                "ml-2 grow basis-0 rounded p-2 text-white",
                book ? "bg-bdazzled-700" : "bg-vermilion-700",
              )}
              onClick={() =>
                bookSession
                  .mutateAsync(book)
                  .then(() => navigate(-1))
                  .catch((e) => alert(e))
              }
            >
              {book ? "Anmelden" : "Abmelden"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SessionDetails = () => {
  const navigate = useNavigate();

  const sessionId = Number.parseInt(useParams().sessionId ?? "");

  const setUser = useSetUser();
  const subscribeSession = useSubscribeSession(sessionId);

  const query = useSessionDetails(sessionId);

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
      onClick={() => navigate(-1)}
    >
      <div
        className="absolute bottom-[calc(1rem+var(--safe-area-inset-bottom))] left-[calc(1rem+var(--safe-area-inset-left))] right-[calc(1rem+var(--safe-area-inset-right))] top-[calc(1rem+var(--safe-area-inset-top))] overflow-y-auto bg-white p-4"
        style={{
          visibility: useMatch("/timetable/:sessionId/feedback")
            ? "hidden"
            : undefined,
        }}
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
                onClick={() => navigate(-1)}
              >
                <Close className="h-4 w-4 text-slate-400" />
              </button>
            </div>
            <hr className="border-[#d54839]" />
            <div className="mb-4 mt-4 flex text-sm text-neutral-500">
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
            {session.extraData.map((item) => (
              <Fragment key={item.label}>
                <div className="text-sm text-neutral-500">{item.label}:</div>
                <div className="mb-2 whitespace-pre-wrap">{item.value}</div>
              </Fragment>
            ))}
            {session.changeFlag === "Cancelled" ? (
              <div className="font-semibold text-red-700">Abgesagt</div>
            ) : null}
            {session.bookable &&
              (!session.booked ? (
                <button
                  className="mb-4 mt-2 w-full rounded bg-bdazzled-700 p-2 text-white"
                  onClick={() =>
                    navigate("register", { state: { book: true } })
                  }
                >
                  Anmelden
                </button>
              ) : (
                <button
                  className="mb-4 mt-2 w-full rounded bg-vermilion-700 p-2 text-white"
                  onClick={() =>
                    navigate("register", { state: { book: false } })
                  }
                >
                  Abmelden
                </button>
              ))}
            {session.feedback &&
              feedbackDelay <= 0 &&
              (session.feedback.some((f) => f.answer) ? (
                <button
                  className="mb-4 mt-2 w-full rounded border border-bdazzled-700 p-2 text-bdazzled-700"
                  onClick={() => navigate("feedback")}
                >
                  Feedback bearbeiten
                </button>
              ) : (
                <button
                  className="mb-4 mt-2 w-full rounded bg-bdazzled-700 p-2 text-white"
                  onClick={() => navigate("feedback")}
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
      <Routes>
        <Route
          path="register"
          element={session && <Registration session={session} />}
        />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </div>
  );
};

export default SessionDetails;
