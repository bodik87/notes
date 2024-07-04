import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import { IArticle, IChapter, IFolder } from "../lib/types";
import BackButton from "../components/back-button";
import {
  DeleteIcon,
  FolderIcon,
  QuickNoteIcon,
  TransferIcon,
} from "../components/icons";
import ContentEditablePreview from "../components/content-editable-preview";
import Modal from "../components/modal";
import { text } from "../lang";

type Inputs = { folderTitle: string };

export default function FolderPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const newFolderChapterId = searchParams.get("chapterId") as string;

  const [chapters] = useLocalStorage<IChapter[]>("chapters", []);
  const [folders, setFolders] = useLocalStorage<IFolder[]>("folders", []);
  const [articles, setArticles] = useLocalStorage<IArticle[]>("articles", []);
  const [language] = useLocalStorage<string>("lang", "EN");

  const existedFolder = folders.filter((el) => el.id === id)[0];

  const deleteFolder = (id: string) => {
    if (confirm(`${text.delete[language]}?`) === true) {
      const updatedFolders = folders.filter((el) => el.id !== id);
      const updatedArticles = articles.filter(
        (article) => article.folderId !== id
      );
      setFolders(updatedFolders);
      setArticles(updatedArticles);
      navigate("/");
    }
  };

  const { register, handleSubmit } = useForm<Inputs>({
    values: {
      folderTitle: existedFolder && (existedFolder.folderTitle as string),
    },
  });

  const onSubmit: SubmitHandler<Inputs> = ({ folderTitle }) => {
    if (existedFolder) {
      const folder: IFolder = {
        id: existedFolder.id,
        folderTitle,
        chapterId: existedFolder.chapterId,
      };

      const updatedFolders = folders.map((el) => {
        if (el.id === existedFolder.id) {
          return folder;
        } else {
          return el;
        }
      });
      setFolders(updatedFolders);
    } else {
      const newFolder: IFolder = {
        id: id as string,
        folderTitle,
        chapterId: newFolderChapterId,
      };
      if (folders.length === 0) {
        setFolders([newFolder]);
      } else {
        setFolders([...folders, newFolder]);
      }
    }
  };

  const [transferModal, setTransferModal] = useState(false);

  const transferFolder = (chapterId: string) => {
    const updatedFolder: IFolder = { ...existedFolder, chapterId };
    const updatedFolders = folders.map((folder) => {
      if (folder.id === updatedFolder.id) {
        return updatedFolder;
      } else {
        return folder;
      }
    });
    setFolders(updatedFolders);
    setTransferModal(false);
  };

  const newArticleId = uuidv4();

  return (
    <>
      {transferModal && (
        <Modal setOpen={setTransferModal}>
          {chapters
            .filter((el) => el.id !== existedFolder.chapterId)
            .map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => transferFolder(chapter.id)}
                className="h-[40px] px-3.5 w-full text-left"
              >
                {chapter.chapterTitle}
              </button>
            ))}
        </Modal>
      )}

      <section className="page p-3">
        <div className="page-header">
          <BackButton />

          {existedFolder && (
            <div className="actions-row">
              <Link
                to={`/articles/${newArticleId}?folderId=${existedFolder.id}`}
                className="btn"
              >
                <QuickNoteIcon />
              </Link>

              {chapters.length > 1 && (
                <button className="btn" onClick={() => setTransferModal(true)}>
                  <TransferIcon />
                </button>
              )}

              <button
                className="btn"
                onClick={() => deleteFolder(existedFolder.id)}
              >
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>

        <div className="parent-row">
          <FolderIcon />
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("folderTitle", {
                required: true,
                onBlur: handleSubmit(onSubmit),
              })}
              placeholder={text.folderTitle[language]}
              autoComplete="off"
              spellCheck={"false"}
              onKeyUp={(e) => e.key === "Enter" && e.currentTarget.blur()}
              autoFocus={!existedFolder}
            />
          </form>
        </div>

        {existedFolder && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                {articles
                  .filter((article) => article.folderId === existedFolder.id)
                  .filter((_, index) => {
                    return index % 2 === 0;
                  })
                  .map((article) => (
                    <ArticleItem
                      key={article.id}
                      article={article}
                      existedFolder={existedFolder}
                    />
                  ))}
              </div>
              <div className="flex flex-col gap-2">
                {articles
                  .filter((article) => article.folderId === existedFolder.id)
                  .filter((_, index) => {
                    return index % 2 !== 0;
                  })
                  .map((article) => (
                    <ArticleItem
                      key={article.id}
                      article={article}
                      existedFolder={existedFolder}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

type ArticleItemProps = {
  article: IArticle;
  existedFolder: IFolder;
};

function ArticleItem({ article, existedFolder }: ArticleItemProps) {
  return (
    <Link
      to={`/articles/${article.id}?folderId=${existedFolder.id}`}
      className="p-3 max-h-[220px] text-sm rounded-2xl bg-app-gray overflow-hidden"
    >
      <ContentEditablePreview
        text={
          article.articleBody.length > 160
            ? article.articleBody.slice(0, 160) + "..."
            : article.articleBody
        }
      />
    </Link>
  );
}
