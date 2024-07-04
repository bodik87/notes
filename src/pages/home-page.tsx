import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  CopyIcon,
  QuickNoteIcon,
  SearchIcon,
  SettingsIcon,
} from "../components/icons";
import Chapters from "../components/home-page/chapters";
import QuickNotes from "../components/home-page/quick-notes";
import PinnedNote from "../components/home-page/pinned-note";
import TextToCopy from "../components/home-page/text-to-copy";
import Todos from "../components/home-page/todos";
import { useState } from "react";

export default function HomePage() {
  const [textToCopyModal, setTextToCopyModal] = useState(false);

  const newChapterId = uuidv4();
  const newQuickNoteId = uuidv4();
  return (
    <section className="page">
      <div className="page-header p-3">
        <span className="btn uppercase bg-gradient-to-br from-app-yellow-200/50 to-app-green/20 select-none">
          <span className="-skew-x-6 -rotate-12 font-bold text-xl">N</span>
        </span>

        <div className="flex gap-2 items-center">
          <Link
            to={`/quick-notes/${newQuickNoteId}`}
            className="btn bg-app-yellow-100"
          >
            <QuickNoteIcon />
          </Link>

          <button
            className="btn bg-app-green/15"
            onClick={() => setTextToCopyModal(true)}
          >
            <CopyIcon />
          </button>

          <Link to={`/chapter/${newChapterId}`} className="btn bg-app-gray">
            <SearchIcon />
          </Link>

          <Link className="btn bg-app-gray" to={"/user"}>
            <SettingsIcon />
          </Link>
        </div>
      </div>

      <PinnedNote />
      <TextToCopy open={textToCopyModal} setOpen={setTextToCopyModal} />
      <QuickNotes />
      <Todos />
      <Chapters />
    </section>
  );
}
