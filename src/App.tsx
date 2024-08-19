import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendar as faCalendarOutline,
  faLightbulb as faLightbulbOutline,
  faUser as faUserOutline,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCalendar as faCalendarSolid,
  faLightbulb as faLightbulbSolid,
  faUser as faUserSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  To,
  useMatch,
  useNavigate,
} from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Login from "./Login";
import Profile from "./Profile";
import Timetable from "./Timetable";
import Wiki from "./Wiki";
import WikiArticle from "./WikiArticle";
import { useUser } from "./appContext";

const NavButton = (props: {
  text: ReactNode;
  iconSelected: IconProp;
  iconUnselected: IconProp;
  target: To & Parameters<typeof useMatch>[0];
}) => {
  const navigate = useNavigate();
  const match = useMatch(props.target);

  const isSelected = !!match;

  return (
    <button
      className={`flex flex-col items-center text-xs ${isSelected ? "text-bdazzled-700" : "text-neutral-600"}`}
      onClick={() => navigate(props.target)}
    >
      <FontAwesomeIcon
        icon={isSelected ? props.iconSelected : props.iconUnselected}
        className="mb-1 h-5"
      />
      {props.text}
    </button>
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
              <Route path="/timetable" element={<Timetable />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wiki" element={<Wiki />} />
              <Route path="/wiki/:articleId" element={<WikiArticle />} />
            </Routes>
          </ErrorBoundary>
        </div>
        <div className="row-start-2 flex h-12 shrink-0 items-center justify-evenly border-t border-neutral-300 bg-neutral-200">
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
            text="Profil"
            iconSelected={faUserSolid}
            iconUnselected={faUserOutline}
            target="/profile"
          />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
