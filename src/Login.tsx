import { IconDefinition, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useSetUser } from "./appContext";
import background from "./assets/login.jpg";
import logo from "./assets/logo.png";
import mhn from "./assets/mhn.png";
import { baseUrl } from "./dataSource";
import { LoadingIndicator } from "./InfoScreen";

const LoginButton = (props: {
  children: React.ReactNode;
  className?: string;
  icon?: IconDefinition;
  img?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => (
  <button
    className={twMerge(
      "flex h-8 items-center justify-center gap-2.5 rounded-md bg-bdazzled-300 px-8 py-3 shadow-[0px_2px_16px_rgba(0,0,0,0.5)] active:bg-bdazzled-500",
      props.className,
    )}
    onClick={props.onClick}
  >
    {props.icon ? (
      <FontAwesomeIcon icon={props.icon} className="h-4 w-4 text-white" />
    ) : null}
    {props.img ? <img className="h-4 w-4" src={props.img} /> : null}
    <div className="text-center font-semibold text-black">{props.children}</div>
  </button>
);

const Login = () => {
  const setUser = useSetUser();
  const [passwordLogin, setPasswordLogin] = useState<{
    username: string;
    password: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onGuestLogin = () => setUser({ token: null, guest: true });
  const onPasswordLoginClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(baseUrl + "/auth/login", {
        method: "POST",
        body: JSON.stringify(passwordLogin),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const message = await response.text();
        alert("Fehler: \r\n\r\n" + message || response.statusText);
        setIsLoading(false);
        return;
      }
      const result = await response.json();
      setUser({ token: result.token, guest: false });
    } catch (e) {
      if (e instanceof TypeError && e.message === "Load failed")
        alert("Die Verbindung zum Server konnte nicht hergestellt werden.");
      else alert("Fehler: \r\n\r\n" + e);
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`flex h-screen flex-col items-center justify-evenly bg-[url("${background}")] p-safe relative bg-cover`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <img
        className="h-16 w-16 overflow-visible drop-shadow-[_0_2px_16px_rgba(0,0,0,0.5)] [-webkit-filter:_drop-shadow(0_2px_16px_rgba(0,0,0,0.5))]"
        src={logo}
      />
      <div className="text-center text-3xl font-semibold text-white shadow-black [text-shadow:_0_2px_16px_rgb(0,0,0)]">
        Mind
        <br />
        Akademie
      </div>
      <div />
      <div className="mx-4 flex flex-col gap-2 self-stretch">
        <LoginButton
          className="bg-vermilion-500 active:bg-vermilion-700"
          img={mhn}
          onClick={() => alert("Diese Funktion ist noch nicht verfügbar.")}
        >
          Anmelden via MHM-Wiki
        </LoginButton>
        <LoginButton
          icon={faEnvelope}
          onClick={() =>
            setPasswordLogin({
              username: "admin",
              password: "pP4$$w0rd",
            })
          }
        >
          Anmelden mit Passwort
        </LoginButton>
        <LoginButton onClick={onGuestLogin}>
          Ohne Anmeldung fortfahren
        </LoginButton>
      </div>
      {passwordLogin && (
        <div
          className="p-safe absolute inset-0 grid place-items-center bg-black bg-opacity-60 backdrop-blur-sm"
          onClick={() => {
            if (!isLoading) setPasswordLogin(null);
          }}
        >
          <div
            className="flex w-64 flex-col rounded-md bg-gray-200 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center text-lg">Anmelden</div>
            <div className="mb-1 mt-4 text-xs text-gray-500">Benutzername:</div>
            <input
              className="h-8 w-full rounded-md px-2 py-3 shadow-sm"
              value={passwordLogin.username}
              disabled={isLoading}
              onChange={(e) =>
                setPasswordLogin({ ...passwordLogin, username: e.target.value })
              }
            />
            <div className="mb-1 mt-4 text-xs text-gray-500">Passwort:</div>
            <input
              className="shadow-msm h-8 w-full rounded-md px-2 py-3"
              type="password"
              value={passwordLogin.password}
              disabled={isLoading}
              onChange={(e) =>
                setPasswordLogin({ ...passwordLogin, password: e.target.value })
              }
            />
            {isLoading ? (
              <LoadingIndicator className="mt-6 self-center shadow-md" />
            ) : (
              <LoginButton
                className="mt-6 bg-vermilion-500 shadow-md active:bg-vermilion-700"
                onClick={onPasswordLoginClick}
              >
                Anmelden
              </LoginButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
