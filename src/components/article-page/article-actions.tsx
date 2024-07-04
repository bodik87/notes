import { IFolder } from "../../lib/types";
import { DeleteIcon, LinkIcon, TransferIcon } from "../icons";

type Props = {
  folders: IFolder[];
  setTransferModal: React.Dispatch<React.SetStateAction<boolean>>;
  setLinksModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteArticle: (id: string) => void;
  existedArticleId: string;
};

export default function ArticleActions({
  folders,
  setTransferModal,
  setLinksModal,
  deleteArticle,
  existedArticleId,
}: Props) {
  return (
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
        onClick={() => deleteArticle(existedArticleId)}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}
