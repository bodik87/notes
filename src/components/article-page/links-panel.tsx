import { v4 as uuidv4 } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocalStorage } from "usehooks-ts";
import { IArticle, LinkType } from "../../lib/types";

type Props = {
  article: IArticle;
  setLinksModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type Inputs = { title: string; url: string };

export default function LinksPanel({ article, setLinksModal }: Props) {
  const [articles, setArticles] = useLocalStorage<IArticle[]>("articles", []);
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ title, url }) => {
    if (title && url) {
      const newLink: LinkType = {
        id: uuidv4(),
        title,
        url,
        type: "link",
      };
      // Если у article вообще нет links
      if (!article.links) {
        const updatedArticle = { ...article, links: [newLink] };

        // Перезаписываем массив со статьями, заменив существующую статью
        const updatedArticles = articles.map((article) => {
          if (article.id === updatedArticle.id) {
            return updatedArticle;
          } else {
            return article;
          }
        });
        setArticles(updatedArticles);

        // Если у article уже есть links, то мы можем добавить новую ссылку
      } else {
        const updatedLinks = [...article.links, newLink];
        const updatedArticle = { ...article, links: updatedLinks };

        // Перезаписываем массив со статьями, заменив существующую статью
        const updatedArticles = articles.map((article) => {
          if (article.id === updatedArticle.id) {
            return updatedArticle;
          } else {
            return article;
          }
        });
        setArticles(updatedArticles);
      }
      reset();
      setLinksModal(false);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("url")}
        placeholder="Paste link"
        autoComplete="off"
        spellCheck={"false"}
        className="bg-transparent text-xs"
        onKeyUp={(e) => e.key === "Enter" && e.currentTarget.blur()}
        autoFocus
      />

      <input
        {...register("title")}
        placeholder="Title"
        autoComplete="off"
        spellCheck={"false"}
        className="bg-transparent text-lg"
        onKeyUp={(e) => e.key === "Enter" && e.currentTarget.blur()}
      />

      {/* <div className="mt-4 flex justify-end gap-2 items-center">
    {todos.filter((todo) => todo.isCompleted).length > 0 && (
      <button
        onClick={handleDeleteSelected}
        className="btn bg-app-red/10 text-app-red"
      >
        {text.addCompletedTodos[language]}
      </button>
    )} */}
      <button type="submit" className="btn w-20 bg-app-blue/20">
        OK
      </button>
      {/* </div> */}
    </form>
  );
}
