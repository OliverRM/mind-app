import { Fragment } from "react/jsx-runtime";
import { useProfile } from "./dataSource";

const Profile = () => {
  const { data, isLoading, isError } = useProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error fetching profile data</div>;
  }

  return (
    <div className="h-full overflow-y-scroll">
      <div className="sticky top-0 mb-2 mt-20 bg-bdazzled-700 py-2">
        <h1 className="text-center text-2xl text-white">{data.name}</h1>
        <h2 className="text-center text-sm font-semibold text-neutral-200">
          {data.subtitle}
        </h2>
      </div>
      <h2 className={`mb-6 text-center text-sm font-semibold`}>
        <span
          className={`rounded-full px-3 py-0.5 ${
            data.paymentStatus === "PAYED"
              ? "bg-green-500"
              : data.paymentStatus === "PENDING"
                ? "bg-yellow-500"
                : "bg-neutral-400"
          }`}
        >
          {data.paymentStatus === "PAYED"
            ? "Betrag bezahlt"
            : data.paymentStatus === "PENDING"
              ? "Betrag ausstehend"
              : data.paymentStatus}
        </span>
      </h2>
      <div className="bg-white p-4">
        {data.extraData.map((item) => (
          <Fragment key={item.label}>
            <div className="text-sm text-gray-500">{item.label}:</div>
            <div className="mb-2">{item.value}</div>
          </Fragment>
        ))}
        <button
          className="mx-auto mb-8 mt-12 block rounded bg-vermilion-700 px-4 py-2 text-center font-semibold text-white"
          onClick={() => alert("Auf Wiedersehen!")}
        >
          Abmelden
        </button>
      </div>
    </div>
  );
};

export default Profile;
