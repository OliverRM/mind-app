import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useSetUser, useUser } from "./appContext";
import { useHelpTasks, useTakeHelpTask } from "./dataSource";
import { Close } from "./Icons";
import { LoadingIndicator, QueryStateIndicator } from "./InfoScreen";
import TitleBar from "./TitleBar";

const TaskDetails = () => {
  const taskId = Number.parseInt(useParams()["taskId"] ?? "");
  const navigate = useNavigate();
  const user = useUser();
  const setUser = useSetUser();

  const query = useHelpTasks();
  const takeHelpTask = useTakeHelpTask(taskId);

  const task = query.data?.find((task) => task.id === taskId);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 p-8 text-white"
      onClick={() => navigate(-1)}
    >
      <div
        className="absolute bottom-[calc(1rem+var(--safe-area-inset-bottom))] left-[calc(1rem+var(--safe-area-inset-left))] right-[calc(1rem+var(--safe-area-inset-right))] top-[calc(1rem+var(--safe-area-inset-top))] overflow-y-auto bg-white p-4"
        onClick={(e) => task && e.stopPropagation()}
      >
        {task ? (
          <>
            <div className="flex">
              <h3 className="flex-grow text-2xl text-vermilion-700">
                {task.name}
              </h3>
              <button
                className="ml-2 flex-shrink-0 self-start p-2"
                onClick={() => navigate(-1)}
              >
                <Close className="h-4 w-4 text-slate-400" />
              </button>
            </div>
            <hr className="border-vermilion-500" />
            {task.descriptionUrl ? (
              <button
                className="text-semibold mb-2 mt-8 w-full rounded border border-bdazzled-700 p-2 text-bdazzled-700"
                onClick={() =>
                  task.descriptionUrl &&
                  window.open(task.descriptionUrl, "_blank")
                }
              >
                Mehr Informationen{" "}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </button>
            ) : null}
            <div className="mt-6 text-sm">
              <div className="inline-block text-neutral-500">Zeit:</div>{" "}
              <div className="inline-block text-black">
                {moment(task.startTime).format("dddd, H:mm")} bis{" "}
                {moment(task.endTime).format("H:mm")} Uhr
              </div>
            </div>
            <div className="mt-2 text-sm">
              <div className="inline-block text-neutral-500">Ort:</div>{" "}
              <div className="inline-block text-black">{task.location}</div>
            </div>
            <div className="mt-2 text-sm">
              <div className="inline-block text-neutral-500">Plätze:</div>{" "}
              <div className="inline-block text-black">
                {task.slotCount - task.assignedTo.length} von {task.slotCount}{" "}
                frei
              </div>
            </div>
            {user?.guest === false && (
              <>
                <div className="mt-2 text-sm text-neutral-500">Angemeldet:</div>
                {task.assignedTo.length > 0 ? (
                  task.assignedTo.map((name, i) =>
                    name ? (
                      <div key={i} className="text-sm text-black">
                        {name}
                      </div>
                    ) : (
                      <div key={i} className="text-sm italic text-black">
                        Anonym
                      </div>
                    ),
                  )
                ) : (
                  <div className="text-sm italic text-black">
                    Keine Anmeldungen
                  </div>
                )}
              </>
            )}
            {takeHelpTask.isPending ? (
              <LoadingIndicator className="mt-8 w-full" />
            ) : task.status === "Available" ? (
              <button
                className="mt-8 w-full rounded bg-bdazzled-700 p-2 text-white"
                onClick={() =>
                  user?.guest === true
                    ? setUser(null)
                    : takeHelpTask.mutateAsync(true).catch((e) => alert(e))
                }
              >
                Anmelden
              </button>
            ) : task.status === "Yours" ? (
              <button
                className="mt-8 w-full rounded bg-vermilion-700 p-2 text-white"
                onClick={() =>
                  takeHelpTask.mutateAsync(false).catch((e) => alert(e))
                }
              >
                Abmelden
              </button>
            ) : null}
          </>
        ) : (
          <QueryStateIndicator query={query} />
        )}
      </div>
    </div>
  );
};

const HelpTasks = () => {
  const navigate = useNavigate();
  const query = useHelpTasks();

  if (!query.data)
    return (
      <div className="flex h-full flex-col">
        <TitleBar className="shrink-0" query={query}>
          Dienste
        </TitleBar>
        <QueryStateIndicator className="grow bg-white" query={query} />
      </div>
    );

  return (
    <div className="grid h-full grid-rows-[auto,1fr]">
      <TitleBar query={query}>Dienste</TitleBar>
      <div className="divide-y divide-neutral-200 overflow-y-scroll bg-white">
        {query.data.map((task) => (
          <div
            key={task.id}
            className="overflow-x-hidden overflow-ellipsis whitespace-nowrap px-4 py-2"
            onClick={() => navigate(`/helptasks/${task.id}`)}
          >
            <div className="text-sm text-neutral-500">
              {moment(task.startTime).format("dddd, H:mm")} bis{" "}
              {moment(task.endTime).format("H:mm")} Uhr, {task.location}
            </div>
            <div className="text-lg">{task.name}</div>
            <div className="text-sm text-neutral-500">
              {task.status === "Available"
                ? `${task.slotCount - task.assignedTo.length} von ${task.slotCount} Plätzen frei`
                : task.status === "Unavailable"
                  ? "Belegt"
                  : task.status === "Yours"
                    ? "Zugewiesen an dich"
                    : `Unbekannt / ${task.status}`}
            </div>
          </div>
        ))}
      </div>
      <Routes>
        <Route path="/:taskId" element={<TaskDetails />} />
      </Routes>
    </div>
  );
};

export default HelpTasks;
