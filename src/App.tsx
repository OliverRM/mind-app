import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendar as faCalendarOutline,
  faUser as faUserOutline,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCalendar as faCalendarSolid,
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
import Timetable from "./Timetable";

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
  return (
    <HashRouter>
      <div className="flex h-screen flex-col">
        <div className="min-h-0 grow">
          <Routes>
            <Route path="/" element={<Navigate to="/timetable" />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/profile" element={<div>Profile</div>} />
          </Routes>
        </div>
        <div className="row-start-2 flex h-12 shrink-0 items-center justify-evenly border-t border-neutral-300 bg-neutral-200">
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
