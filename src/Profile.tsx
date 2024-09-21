import { toCanvas } from "qrcode";
import { useEffect, useRef } from "react";
import { Fragment } from "react/jsx-runtime";
import { useSetUser } from "./appContext";
import { useProfile } from "./dataSource";
import { QueryStateIndicator } from "./InfoScreen";
import TitleBar from "./TitleBar";

const Profile = () => {
  const query = useProfile(),
    { data } = query;
  const setUser = useSetUser();

  const qrCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrCanvas.current) {
      if (data?.qrCode) toCanvas(qrCanvas.current, data.qrCode);
      else
        qrCanvas.current
          .getContext("2d")
          ?.clearRect(0, 0, qrCanvas.current.width, qrCanvas.current.height);
    }
  }, [data?.qrCode, qrCanvas.current]);

  if (!data)
    return (
      <div className="flex h-full flex-col">
        <TitleBar className="shrink-0" query={query}>
          Profil
        </TitleBar>
        <QueryStateIndicator className="grow bg-white" query={query} />
      </div>
    );

  return (
    <div className="grid h-full grid-rows-[auto,16rem,1fr,auto]">
      <TitleBar query={query}>Profil</TitleBar>
      <div className="z-10 col-start-1 row-start-2 border-b border-neutral-300 border-opacity-20 bg-white bg-opacity-80 text-center backdrop-blur-sm">
        <h2 className="mt-20 text-lg font-semibold text-bdazzled-700">
          {data.name}
        </h2>
        <canvas
          className="mt-2 inline-block h-24 w-24 text-center"
          ref={qrCanvas}
        />
      </div>
      <div className="scrollbar-hide col-start-1 row-span-3 row-start-2 grow overflow-y-scroll bg-white p-4 py-4">
        <div className="h-[16rem]" />
        {data.extraData.map((item) => (
          <Fragment key={item.label}>
            <div className="text-sm text-neutral-500">{item.label}:</div>
            <div className="mb-2">{item.value}</div>
          </Fragment>
        ))}
      </div>
      <div className="col-start-1 row-start-4 h-24 border-t border-neutral-300 border-opacity-20 bg-white bg-opacity-80 backdrop-blur-sm">
        <button
          className="mx-auto mt-6 block rounded bg-vermilion-700 px-4 py-2 text-center font-semibold text-white"
          onClick={() => setUser(null)}
        >
          Abmelden
        </button>
      </div>
    </div>
  );
};

export default Profile;
