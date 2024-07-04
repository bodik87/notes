import { Link } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import { IChapter, IFolder } from "../../lib/types";
import { CollapseIcon, ExpandIcon, FolderIcon, PlusIcon } from "../icons";
import { useEffect, useState } from "react";
import { Ellipsis } from "lucide-react";
import { text } from "../../lang";
import { Reorder, useDragControls } from "framer-motion";

export default function Chapters() {
  const [language] = useLocalStorage<string>("lang", "EN");
  const [chapters, setChapters] = useLocalStorage<IChapter[]>("chapters", []);

  const [items, setItems] = useState(chapters);

  useEffect(() => {
    setItems(chapters);
  }, [chapters]);

  const newChapterId = uuidv4();

  return (
    <section className="mt-4 px-3 flex flex-col gap-4">
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className="flex flex-col gap-3"
      >
        {items.map((chapter) => (
          <ChapterItem
            key={chapter.id}
            chapter={chapter}
            items={items}
            setChapters={setChapters}
          />
        ))}
      </Reorder.Group>

      <Link
        to={`/chapter/${newChapterId}`}
        className="flex items-center gap-3 text-lg"
      >
        <PlusIcon className="stroke-app-blue" /> {text.chapter[language]}
      </Link>
    </section>
  );
}

type Props = {
  chapter: IChapter;
  items: IChapter[];
  setChapters: React.Dispatch<React.SetStateAction<IChapter[]>>;
};

function ChapterItem({ chapter, items, setChapters }: Props) {
  const [folders] = useLocalStorage<IFolder[]>("folders", []);
  const [foldersList, setFoldersList] = useState(false);

  const controls = useDragControls();

  const currentFolders = folders.filter(
    (folder) => folder.chapterId === chapter.id
  );
  return (
    <>
      <Reorder.Item
        key={chapter.id}
        value={chapter}
        onDragEnd={() => setChapters(items)}
        dragListener={false}
        dragControls={controls}
        dragConstraints={{ top: -20, bottom: 20 }}
        className="flex items-center bg-app-blue/10 rounded-3xl pl-5 pr-1.5 py-1.5 touch-none"
      >
        <button
          className="w-full flex items-center gap-3 text-lg font-medium"
          onClick={() => {
            if (currentFolders.length > 0) {
              setFoldersList(!foldersList);
            }
          }}
        >
          {chapter.chapterTitle}

          {currentFolders.length > 0 && (
            <span
              onPointerDown={(e) => controls.start(e)}
              className="ml-auto cursor-grab active:cursor-grabbing"
            >
              {foldersList ? <ExpandIcon /> : <CollapseIcon />}
            </span>
          )}
        </button>

        <Link className="ml-2 btn" to={`/chapter/${chapter.id}`}>
          <Ellipsis />
        </Link>
      </Reorder.Item>

      {foldersList && (
        <div>
          {currentFolders.map((folder) => (
            <Link
              to={`/folders/${folder.id}`}
              key={folder.id}
              className="ml-5 mb-4 last:mb-0 w-full flex gap-3 items-center text-lg whitespace-nowrap"
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
