import { Link, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import { IArticle, IChapter, IFolder } from "../lib/types";
import BackButton from "../components/back-button";
import { DeleteIcon, FolderIcon } from "../components/icons";
import { text } from "../lang";

type Inputs = { chapterTitle: string };

export default function ChapterPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chapters, setChapters] = useLocalStorage<IChapter[]>("chapters", []);
  const [folders, setFolders] = useLocalStorage<IFolder[]>("folders", []);
  const [articles, setArticles] = useLocalStorage<IArticle[]>("articles", []);
  const [language] = useLocalStorage<string>("lang", "EN");

  const existedChapter = chapters.filter((el) => el.id === id)[0];

  const { register, handleSubmit } = useForm<Inputs>({
    values: {
      chapterTitle: existedChapter && (existedChapter.chapterTitle as string),
    },
  });

  const onSubmit: SubmitHandler<Inputs> = ({ chapterTitle }) => {
    if (existedChapter) {
      const chapter: IChapter = { id: existedChapter.id, chapterTitle };
      const updatedChapters = chapters.map((el) => {
        if (el.id === existedChapter.id) {
          return chapter;
        } else {
          return el;
        }
      });
      setChapters(updatedChapters);
    } else {
      const newChapter: IChapter = { id: id as string, chapterTitle };
      if (chapters.length === 0) {
        setChapters([newChapter]);
      } else {
        setChapters([...chapters, newChapter]);
      }
    }
  };

  const deleteChapter = (id: string) => {
    if (confirm(`${text.delete[language]}?`) === true) {
      const updatedChapters = chapters.filter((chapter) => chapter.id !== id);
      const updatedFolders = folders.filter(
        (folder) => folder.chapterId !== id
      );
      const updatedArticles = articles.filter((article) =>
        updatedFolders.some((folder) => folder.id === article.folderId)
      );

      setChapters(updatedChapters);
      setFolders(updatedFolders);
      setArticles(updatedArticles);
      navigate("/");
    }
  };

  const newFolderId = uuidv4();

  return (
    <section className="page p-3">
      <div className="page-header">
        <BackButton />

        {existedChapter && (
          <div className="flex items-center gap-2">
            <Link
              to={`/folders/${newFolderId}?chapterId=${existedChapter.id}`}
              className="btn bg-app-gray"
            >
              <FolderIcon />
            </Link>
            <button
              className="btn bg-app-red/10"
              onClick={() => deleteChapter(existedChapter.id)}
            >
              <DeleteIcon />
            </button>
          </div>
        )}
      </div>

      <div className="parent-row">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("chapterTitle", {
              required: true,
              onBlur: handleSubmit(onSubmit),
            })}
            placeholder={text.chapterTitle[language]}
            autoComplete="off"
            spellCheck={"false"}
            onKeyUp={(e) => e.key === "Enter" && e.currentTarget.blur()}
            autoFocus={!existedChapter}
          />
        </form>
      </div>

      {existedChapter &&
        folders
          .filter((folder) => folder.chapterId === existedChapter.id)
          .map((folder) => (
            <Link
              to={`/folders/${folder.id}?chapterId=${existedChapter.id}`}
              key={folder.id}
              className="child-row"
            >
              <FolderIcon />
              {folder.folderTitle}
            </Link>
          ))}
    </section>
  );
}
