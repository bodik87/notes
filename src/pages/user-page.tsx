import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { IUser } from "../lib/types";
import useCheckConnection from "../lib/useCheckConnection";
import UserForm from "../components/user-page/user-form";
import Sync from "../components/user-page/sync";
import Languages from "../components/user-page/languages";
import { Loader, NoConnectionIcon, UserIcon } from "../components/icons";
import InstallPWA from "../components/install-pwa";
import { text } from "../lang";
import BackButton from "../components/back-button";

export default function UserPage() {
  const isOnline = useCheckConnection();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [user, saveUser] = useLocalStorage<IUser | null>("user", null);
  const [userForm, setUserForm] = useState(false);

  const [language] = useLocalStorage<string>("lang", "EN");

  return (
    <section className="page p-3">
      <div className="page-header">
        <BackButton />
      </div>

      <Languages />

      <div className="mt-5 flex flex-col items-center justify-center">
        <div
          className={`${
            isOnline ? "bg-app-green/15" : "bg-app-red/15"
          } w-[60px] h-[60px] flex items-center justify-center rounded-full`}
        >
          {isOnline ? <UserIcon /> : <NoConnectionIcon />}
        </div>

        {isOnline ? (
          <>
            <p className="mt-4 text-xl">
              {user ? user.name : text.noUser[language]}
            </p>

            {user ? (
              <Sync
                user={user}
                setLoading={setLoading}
                setSuccess={setSuccess}
                setError={setError}
              />
            ) : (
              <>
                {userForm ? (
                  <UserForm
                    saveUser={saveUser}
                    setLoading={setLoading}
                    setSuccess={setSuccess}
                    setError={setError}
                  />
                ) : (
                  <>
                    <button
                      onClick={() => setUserForm(true)}
                      className="mt-4 max-w-xs bg-app-blue/15 h-[60px] w-full flex justify-center items-center gap-2 text-lg rounded-3xl"
                    >
                      {text.enter[language]}
                    </button>
                  </>
                )}
              </>
            )}
            <InstallPWA />
          </>
        ) : (
          <p className="mt-4 text-xl">{text.noConnection[language]}</p>
        )}

        {loading && <Loader />}

        {success && (
          <div className="mt-4 btn bg-app-green text-white">{success}</div>
        )}

        {error && <div className="mt-4 btn bg-app-red text-white">{error}</div>}
      </div>
    </section>
  );
}
