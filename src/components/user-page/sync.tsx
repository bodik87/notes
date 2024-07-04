import { child, get, ref, remove, set } from "firebase/database";
import { DATABASE, RD_PROJECT_ITEMS, RD_PROJECT_USERS } from "../../firebase";
import { useLocalStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import {
  IArticle,
  IChapter,
  IFolder,
  IPinnedNote,
  ISnippet,
  ITodo,
  IUser,
} from "../../lib/types";
import { text } from "../../lang";

type Props = {
  user: IUser;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

type Result = {
  pinnedNote: IPinnedNote;
  snippets: ISnippet[];
  todos: ITodo[];
  chapters: IChapter[];
  folders: IFolder[];
  articles: IArticle[];
};

export default function Sync({
  user,
  setLoading,
  setSuccess,
  setError,
}: Props) {
  const navigate = useNavigate();

  const [language] = useLocalStorage<string>("lang", "EN");
  const [snippets, setSnippets] = useLocalStorage<ISnippet[]>("snippets", []);
  const [todos, setTodos] = useLocalStorage<ITodo[]>("todos", []);
  const [chapters, setChapters] = useLocalStorage<IChapter[]>("chapters", []);
  const [folders, setFolders] = useLocalStorage<IFolder[]>("folders", []);
  const [articles, setArticles] = useLocalStorage<IArticle[]>("articles", []);
  const [pinnedNote, setPinnedNote] = useLocalStorage<IPinnedNote | null>(
    "pinnedNote",
    null
  );

  const deleteLocalUser = () => {
    localStorage.clear();
    window.location.reload();
  };

  // CREATE
  const uploadToDatabase = () => {
    setSuccess("");
    setError("");
    setLoading(true);
    try {
      if (user) {
        set(ref(DATABASE, RD_PROJECT_ITEMS + user.name), {
          pinnedNote,
          snippets,
          todos,
          chapters,
          folders,
          articles,
        }).then(() => {
          setSuccess("Uploaded");
          setLoading(false);
        });
      }
    } catch (error) {
      console.log(error);
      setError("Error. Try later");
    }
  };

  // DOWNLOAD
  const downloadFromDatabase = () => {
    if (confirm("Restore data? Current data will be deleted!") === true) {
      setSuccess("");
      setError("");
      setLoading(true);
      try {
        if (user) {
          const dbRef = ref(DATABASE);
          get(child(dbRef, `${RD_PROJECT_ITEMS}/${user.name}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                const result: Result = snapshot.val();
                if (result.pinnedNote) {
                  setPinnedNote(result.pinnedNote);
                }
                if (result.snippets) {
                  setSnippets(result.snippets);
                }
                if (result.todos) {
                  setTodos(result.todos);
                }

                if (result.chapters) {
                  setChapters(result.chapters);
                }
                if (result.folders) {
                  setFolders(result.folders);
                }
                if (result.articles) {
                  setArticles(result.articles);
                }
                setSuccess("Downloaded");
              } else {
                setError("No data available");
              }
              setLoading(false);
              navigate("/");
            })
            .catch((error) => {
              console.error(error);
              setError(error);
            });
        }
      } catch (error) {
        console.log(error);
        setError("Error. Try later");
      }
    }
  };

  const deleteUser = () => {
    setSuccess("");
    setError("");
    setLoading(true);
    if (user) {
      if (confirm(`${text.delete[language]}?`) === true) {
        remove(ref(DATABASE, RD_PROJECT_ITEMS + user.name))
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error removing item:", error);
            setLoading(false);
            setError(error);
          });
        remove(ref(DATABASE, RD_PROJECT_USERS + user.name))
          .then(() => {
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error removing item:", error);
            setLoading(false);
            setError(error);
          });
        deleteLocalUser();
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="mt-4 flex flex-col items-center gap-1 w-full rounded-2xl overflow-hidden">
        <div className="flex gap-1 w-full">
          <button
            onClick={deleteUser}
            className="bg-app-red/15 h-[45px] w-full flex justify-center items-center gap-2"
          >
            {text.deleteUser[language]}
          </button>

          <button
            onClick={deleteLocalUser}
            className="bg-app-red/15 h-[45px] w-full flex justify-center items-center gap-2"
          >
            {text.exit[language]}
          </button>
        </div>
        <button
          onClick={downloadFromDatabase}
          className="bg-app-gray text-base h-[45px] w-full flex justify-center items-center gap-2"
        >
          {text.restoreData[language]}
        </button>
      </div>

      <button
        onClick={uploadToDatabase}
        className="max-w-xs mt-10 bg-app-green/25 text-lg h-[65px] w-full flex justify-center items-center gap-2 rounded-full"
      >
        {text.backup[language]}
      </button>
    </>
  );
}
