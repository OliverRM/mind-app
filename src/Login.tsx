import { IconDefinition, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { twMerge } from "tailwind-merge";
import { useSetUser } from "./appContext";
import background from "./assets/login.jpg";
import logo from "./assets/logo.png";
import mhn from "./assets/mhn.png";

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

  const onClick = () => setUser({ name: "Test User" });

  return (
    <div
      className={`flex h-screen flex-col items-center justify-evenly bg-[url("${background}")] bg-cover`}
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
          onClick={onClick}
        >
          Anmelden via MHM-Wiki
        </LoginButton>
        <LoginButton icon={faEnvelope} onClick={onClick}>
          Anmelden via Magic Link
        </LoginButton>
        <LoginButton onClick={onClick}>Ohne Anmeldung fortfahren</LoginButton>
      </div>
    </div>
  );
};

export default Login;
