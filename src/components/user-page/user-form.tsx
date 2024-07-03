import { SubmitHandler, useForm } from "react-hook-form";
import { DATABASE, RD_PROJECT_USERS } from "../../firebase";
import { child, get, ref, set } from "firebase/database";
import { IUser } from "../../lib/types";

type Props = {
  saveUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};
type Inputs = { name: string; password: string };

export default function UserForm({
  saveUser,
  setLoading,
  setSuccess,
  setError,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ name, password }) => {
    setSuccess("");
    setError("");
    setLoading(true);

    const localUser = { name: name.trim(), password: password.trim() };

    if (name.trim() && password.trim()) {
      const dbRef = ref(DATABASE);
      get(child(dbRef, `${RD_PROJECT_USERS}/${localUser.name}`))
        .then((snapshot) => {
          const existedUserName = snapshot.val() && snapshot.val().name;
          const existedUserPassword = snapshot.val() && snapshot.val().password;

          // "Checking for existed user"
          if (existedUserName) {
            if (localUser.password === existedUserPassword) {
              setLoading(false);
              saveUser(localUser);
              setSuccess("Success");
            } else {
              setLoading(false);
              setError("Incorrect password");
              return;
            }
          } else {
            // "Creating NEW user in Database"
            set(ref(DATABASE, RD_PROJECT_USERS + name.trim()), localUser)
              .then(() => {
                setSuccess("New user created");
                saveUser(localUser);
                setLoading(false);
              })
              .catch(() => {
                setError("Error. Problem");
                setLoading(false);
              });
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("Error. Enter current values");
      return;
    }
  };

  return (
    <>
      <form
        className="mt-4 max-w-xs rounded-3xl overflow-hidden flex flex-col gap-1 text-lg w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("name", {
            required: true,
            minLength: 3,
            maxLength: 40,
          })}
          placeholder="User"
          autoComplete="off"
          className="p-5 bg-app-gray h-[60px]"
          spellCheck={"false"}
          autoFocus
        />

        {errors.name && errors.name.type === "required" && (
          <span className="text-app-red text-xs">Required field</span>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <span className="text-app-red text-xs">Max length exceeded</span>
        )}
        {errors.name && errors.name.type === "minLength" && (
          <span className="text-app-red text-xs">Min length 3</span>
        )}

        <input
          {...register("password", {
            required: true,
            minLength: 3,
            maxLength: 40,
          })}
          placeholder="Password"
          autoComplete="off"
          className="p-5 bg-app-gray h-[60px]"
          spellCheck={"false"}
        />

        {errors.password && errors.password.type === "required" && (
          <span className="text-app-red text-xs">Required field</span>
        )}
        {errors.password && errors.password.type === "maxLength" && (
          <span className="text-app-red text-xs">Max length exceeded</span>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <span className="text-app-red text-xs">Min length 3</span>
        )}

        <button
          type="submit"
          disabled={!errors}
          className="disabled:bg-app-gray disabled:text-black/50 bg-app-green text-white p-5 h-[60px] flex items-center justify-center"
        >
          Save
        </button>
      </form>
    </>
  );
}
