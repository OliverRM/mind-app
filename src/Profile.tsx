import { Fragment } from "react/jsx-runtime";
import { useSetUser } from "./appContext";
import { useProfile } from "./dataSource";

const Profile = () => {
  const { data, isLoading, isError } = useProfile();
  const setUser = useSetUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error fetching profile data</div>;
  }

  return (
    <div className="h-full overflow-y-scroll">
      <div className="sticky top-0 mb-2 mt-20 bg-bdazzled-700 py-2">
        <h1 className="text-center text-2xl text-white">Profil</h1>
        <h2 className="text-center text-sm font-semibold text-neutral-200">
          {data.name}
        </h2>
      </div>
      <div className="bg-white p-4">
        {data.extraData.map((item) => (
          <Fragment key={item.label}>
            <div className="text-sm text-gray-500">{item.label}:</div>
            <div className="mb-2">{item.value}</div>
          </Fragment>
        ))}
        <button
          className="mx-auto mb-8 mt-12 block rounded bg-vermilion-700 px-4 py-2 text-center font-semibold text-white"
          onClick={() => setUser(null)}
        >
          Abmelden
        </button>
      </div>
    </div>
  );
};

export default Profile;
