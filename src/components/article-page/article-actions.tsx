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
    <div className="actions-row">
      {folders.length > 1 && (
        <button className="btn" onClick={() => setTransferModal(true)}>
          <TransferIcon />
        </button>
      )}

      <button className="btn" onClick={() => setLinksModal(true)}>
        <LinkIcon size={22} />
      </button>
      <button className="btn" onClick={() => deleteArticle(existedArticleId)}>
        <DeleteIcon />
      </button>
    </div>
  );
}
