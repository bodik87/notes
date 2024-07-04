import { Link } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import { IChapter, IFolder } from "../../lib/types";
import {
  ChapterIcon,
  CollapseIcon,
  ExpandIcon,
  FolderIcon,
  PlusIcon,
} from "../icons";
import { useState } from "react";
import { Ellipsis } from "lucide-react";
import { text } from "../../lang";

export default function Chapters() {
  const [language] = useLocalStorage<string>("lang", "EN");
  const [chapters] = useLocalStorage<IChapter[]>("chapters", []);
  const newChapterId = uuidv4();
  return (
    <section className="mt-4 px-3 flex flex-col gap-5">
      {chapters.map((chapter) => (
        <ChapterItem key={chapter.id} chapter={chapter} />
      ))}

      <Link to={`/chapter/${newChapterId}`} className="flex gap-3">
        <PlusIcon className="stroke-app-blue" /> {text.chapter[language]}
      </Link>
    </section>
  );
}

type Props = { chapter: IChapter };

function ChapterItem({ chapter }: Props) {
  const [folders] = useLocalStorage<IFolder[]>("folders", []);
  const [foldersList, setFoldersList] = useState(false);

  const currentFolders = folders.filter(
    (folder) => folder.chapterId === chapter.id
  );
  return (
    <>
      <div className="flex items-center">
        <button
          className="w-full flex items-center gap-3 text-lg"
          onClick={() => {
            if (currentFolders.length > 0) {
              setFoldersList(!foldersList);
            }
          }}
        >
          <ChapterIcon />
          {chapter.chapterTitle}

          {currentFolders.length > 0 && (
            <span className="ml-auto">
              {foldersList ? <ExpandIcon /> : <CollapseIcon />}
            </span>
          )}
        </button>

        <Link
          className="ml-5 btn bg-app-blue/15 text-app-blue"
          to={`/chapter/${chapter.id}`}
        >
          <Ellipsis />
        </Link>
      </div>

      {foldersList && (
        <div>
          {currentFolders.map((folder) => (
            <Link
              to={`/folders/${folder.id}`}
              key={folder.id}
              className="ml-5 mb-5 last:mb-0 w-full flex gap-3 items-center whitespace-nowrap"
            >
              <FolderIcon />
              {folder.folderTitle}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
