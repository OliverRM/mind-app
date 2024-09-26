import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import {
  SessionDetails,
  useGiveFeedback,
  useSessionDetails,
} from "./dataSource";
import { LoadingIndicator, QueryStateIndicator } from "./InfoScreen";
import TitleBar from "./TitleBar";

const FeedbackForm = (params: {
  feedback: Exclude<SessionDetails["feedback"], null | undefined>;
  error: string | null;
  onFeedback: (answers: unknown[]) => void;
}) => {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<unknown[]>(
    params.feedback.map(
      (f) =>
        f.answer ??
        (f.type === "string"
          ? ""
          : f.type === "boolean"
            ? false
            : f.type === "integer"
              ? null
              : null),
    ),
  );
  const setAnswer = (i: number, value: unknown) =>
    setAnswers((a) => a.map((v, j) => (i === j ? value : v)));

  return (
    <>
      {params.feedback
        .filter((f) => ["string", "boolean", "integer"].includes(f.type))
        .map((f, i) => (
          <div key={i} className="mt-4">
            <div className="">{f.question}</div>
            {f.type === "string" ? (
              <textarea
                className="mt-2 h-32 w-full rounded border border-neutral-500 p-2"
                value={answers[i] as string}
                onChange={(e) => setAnswer(i, e.target.value)}
              />
            ) : f.type === "boolean" ? (
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id={`feedback-${i}`}
                  className="mr-2"
                  checked={answers[i] as boolean}
                  onChange={(e) => setAnswer(i, e.target.checked)}
                />
                <label htmlFor={`feedback-${i}`} className="grow">
                  {f.labels?.[0] ?? "Ja"}
                </label>
              </div>
            ) : f.type === "integer" ? (
              <>
                <div className="h-4 whitespace-nowrap text-sm text-neutral-500">
                  {(f.labels ?? [f.min, f.max]).map((v, i, a) => (
                    <div
                      key={i}
                      className={twMerge(
                        "h-0",
                        i === 2 || (i === 1 && a.length === 2)
                          ? "text-right"
                          : i === 1
                            ? "text-center"
                            : "",
                      )}
                    >
                      {v}
                    </div>
                  ))}
                </div>
                <input
                  type="range"
                  className="mt-2 w-full rounded border border-neutral-500 p-2"
                  value={answers[i] as number}
                  onChange={(e) => setAnswer(i, parseInt(e.target.value))}
                  min={f.min ?? undefined}
                  max={f.max ?? undefined}
                />
              </>
            ) : null}
          </div>
        ))}
      {params.error && <div className="mt-6 text-red-500">{params.error}</div>}
      <button
        className="mt-8 w-full rounded bg-bdazzled-700 p-2 font-semibold text-white"
        onClick={() => params.onFeedback(answers)}
      >
        Feedback abschicken
      </button>
      <button
        className="mt-2 w-full rounded border border-vermilion-700 p-2 font-semibold text-vermilion-700"
        onClick={() => navigate(-1)}
      >
        Änderungen verwerfen
      </button>
    </>
  );
};

const Feedback = () => {
  const navigate = useNavigate();

  const { sessionId } = useParams();
  const query = useSessionDetails(Number(sessionId));

  const giveFeedback = useGiveFeedback(Number(sessionId));

  const [error, setError] = useState<string | null>(null);

  if (!query.data) return <QueryStateIndicator query={query} />;

  return (
    <div className="grid h-full grid-rows-[auto,1fr]">
      <TitleBar query={query}>Feedback</TitleBar>
      {giveFeedback.isPending ? (
        <div className="flex flex-col items-center justify-center bg-white">
          <div className="mb-4 text-center text-lg">
            Feedback wird
            <br />
            gesendet...
          </div>
          <LoadingIndicator />
        </div>
      ) : !query.data ? (
        <QueryStateIndicator className="bg-white" query={query} />
      ) : (
        <div className="overflow-y-auto bg-white p-4 pb-8">
          <h2 className="text-2xl text-vermilion-700">{query.data.title}</h2>
          <hr className="mb-6 border-vermilion-700" />

          {!query.data.feedback ? (
            <div>Kein Feedback vorhanden.</div>
          ) : (
            <FeedbackForm
              feedback={query.data.feedback}
              error={error}
              onFeedback={(answers) =>
                giveFeedback
                  .mutateAsync(answers)
                  .then(() => navigate(-1))
                  .catch(() => setError("Fehler beim Senden des Feedbacks."))
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Feedback;
