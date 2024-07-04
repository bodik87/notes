import { Link } from "react-router-dom";
import { LinkIcon } from "../icons";
import { IArticle } from "../../lib/types";

type Props = { existedArticle: IArticle };

export default function Links({ existedArticle }: Props) {
  return (
    <>
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
    </>
  );
}
