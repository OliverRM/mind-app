import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendar as faCalendarOutline,
  faLemon as faLemonOutline,
  faLightbulb as faLightbulbOutline,
  faUser as faUserOutline,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCalendar as faCalendarSolid,
  faLemon as faLemonSolid,
  faLightbulb as faLightbulbSolid,
  faUser as faUserSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler, ReactNode } from "react";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  To,
  useMatch,
  useNavigate,
} from "react-router-dom";
import { useSetUser, useUser } from "./appContext";
import ErrorBoundary from "./ErrorBoundary";
import Feedback from "./Feedback";
import HelpTasks from "./HelpTasks";
import Login from "./Login";
import Profile from "./Profile";
import Schedule from "./Schedule";
import Wiki from "./Wiki";

const NavButton = (props: {
  text: ReactNode;
  iconSelected: IconProp;
  iconUnselected: IconProp;
  target: To & Parameters<typeof useMatch>[0];
  pattern?: Parameters<typeof useMatch>[0];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  const navigate = useNavigate();
  const match = useMatch(props.pattern ?? props.target);

  const isSelected = !!match;

  return (
    <button
      className={`flex h-12 flex-col items-center pt-1 text-xs ${isSelected ? "text-bdazzled-700" : "text-neutral-600"}`}
      onClick={props.onClick || (() => navigate(props.target))}
    >
      <FontAwesomeIcon
        icon={isSelected ? props.iconSelected : props.iconUnselected}
        className="mb-1 h-5"
      />
      {props.text}
    </button>
  );
};

const TabBar = () => {
  const navigate = useNavigate();
  const user = useUser();
  const setUser = useSetUser();

  return (
    <div className="pb-safe px-safe row-start-2 flex shrink-0 items-center justify-evenly border-t border-neutral-300 bg-neutral-200">
      <NavButton
        text="Wiki"
        iconSelected={faLightbulbSolid}
        iconUnselected={faLightbulbOutline}
        target="/wiki"
      />
      <NavButton
        text="Zeitplan"
        iconSelected={faCalendarSolid}
        iconUnselected={faCalendarOutline}
        target="/timetable"
      />
      <NavButton
        text="Dienste"
        iconSelected={faLemonSolid}
        iconUnselected={faLemonOutline}
        target="/helptasks"
        pattern="/helptasks/*"
      />
      <NavButton
        text="Profil"
        iconSelected={faUserSolid}
        iconUnselected={faUserOutline}
        target="/profile"
        onClick={() => {
          if (!user) return;
          if (user.guest === true) setUser(null);
          else navigate("/profile");
        }}
      />
    </div>
  );
};

const App = () => {
  const user = useUser();
  return !user ? (
    <Login />
  ) : (
    <HashRouter>
      <div className="flex h-screen flex-col">
        <div className="min-h-0 grow">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Navigate to="/timetable" />} />
              <Route path="/timetable" element={<Schedule />} />
              <Route path="/feedback/:sessionId" element={<Feedback />} />
              <Route path="/helptasks/*" element={<HelpTasks />} />
              <Route
                path="/profile"
                element={
                  user.guest === false ? <Profile /> : <Navigate to="/" />
                }
              />
              <Route path="/wiki" element={<Wiki />} />
            </Routes>
          </ErrorBoundary>
        </div>
        <TabBar />
      </div>
    </HashRouter>
  );
};

export default App;
