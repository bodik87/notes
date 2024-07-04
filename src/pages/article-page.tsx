import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { IArticle, IFolder } from "../lib/types";
import { DeleteIcon, LinkIcon, TransferIcon } from "../components/icons";
import BackButton from "../components/back-button";
import ContentEditable from "../components/content-editable";
import Modal from "../components/modal";
import { text } from "../lang";
import LinksPanel from "../components/article-page/links-panel";

export default function ArticlePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const newArticleFolderId = searchParams.get("folderId") as string;

  const [articles, setArticles] = useLocalStorage<IArticle[]>("articles", []);
  const [folders] = useLocalStorage<IFolder[]>("folders", []);
  const [language] = useLocalStorage<string>("lang", "EN");

  const existedArticle = articles.filter((el) => el.id === id)[0];

  const deleteArticle = (id: string) => {
    if (confirm(`${text.delete[language]}?`) === true) {
      const updatedArticles = articles.filter((el) => el.id !== id);
      setArticles(updatedArticles);
      navigate(-1);
    }
  };

  const onSubmit = (text: string) => {
    if (text) {
      if (existedArticle) {
        const article: IArticle = {
          id: existedArticle.id,
          articleBody: text,
          folderId: existedArticle.folderId,
          links: existedArticle.links,
        };

        const updatedArticles = articles.map((el) => {
          if (el.id === existedArticle.id) {
            return article;
          } else {
            return el;
          }
        });
        setArticles(updatedArticles);
      } else {
        const newArticle: IArticle = {
          id: id as string,
          articleBody: text,
          folderId: newArticleFolderId,
        };
        if (articles.length === 0) {
          setArticles([newArticle]);
        } else {
          setArticles([...articles, newArticle]);
        }
      }
    }
  };

  const [transferModal, setTransferModal] = useState(false);

  const transferArticle = (folderId: string) => {
    const updatedArticle: IArticle = { ...existedArticle, folderId };
    const updatedArticles = articles.map((article) => {
      if (article.id === updatedArticle.id) {
        return updatedArticle;
      } else {
        return article;
      }
    });
    setArticles(updatedArticles);
    setTransferModal(false);
  };

  const [linksModal, setLinksModal] = useState(false);
  return (
    <>
      {linksModal && (
        <Modal setOpen={setLinksModal}>
          <LinksPanel article={existedArticle} setLinksModal={setLinksModal} />
        </Modal>
      )}

      {transferModal && (
        <Modal setOpen={setTransferModal}>
          {folders
            .filter((el) => el.id !== existedArticle.folderId)
            .map((folder) => (
              <button
                key={folder.id}
                onClick={() => transferArticle(folder.id)}
                className="h-[40px] px-3.5 w-full text-left"
              >
                {folder.folderTitle}
              </button>
            ))}
        </Modal>
      )}

      <section className="page px-3">
        <div className="page-header">
          <BackButton />

          {existedArticle && (
            <div className="flex items-center gap-2">
              {folders.length > 1 && (
                <button
                  className="btn min-w-12 bg-app-green/15"
                  onClick={() => setTransferModal(true)}
                >
                  <TransferIcon />
                </button>
              )}

              <button
                className="btn bg-app-blue/25"
                onClick={() => setLinksModal(true)}
              >
                <LinkIcon />
              </button>
              <button
                className="btn bg-app-red/10"
                onClick={() => deleteArticle(existedArticle.id)}
              >
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>

        <ContentEditable
          text={existedArticle ? existedArticle.articleBody : ""}
          setText={onSubmit}
          placeholder={text.note[language]}
          className="px-1"
        />
        {existedArticle && (
          <>
            {existedArticle.links && (
              <>
                {existedArticle.links.length > 0 && (
                  <div className="mt-4 flex flex-col gap-4">
                    {existedArticle.links.map((link) => (
                      <Link
                        key={link.id}
                        to={link.url}
                        target="_blank"
                        className="text-app-blue flex items-center gap-2"
                      >
                        <LinkIcon size={18} />
                        {link.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </section>
    </>
  );
}
