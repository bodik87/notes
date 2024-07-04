import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { CopyIcon, QuickNoteIcon, SettingsIcon } from "../components/icons";
import Chapters from "../components/home-page/chapters";
import QuickNotes from "../components/home-page/quick-notes";
import PinnedNote from "../components/home-page/pinned-note";
import TextToCopy from "../components/home-page/text-to-copy";
import Todos from "../components/home-page/todos";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import Modal from "../components/modal";

export default function HomePage() {
  const [, setFirstStartModal] = useState(false);
  const [firstStart, setFirstStart] = useLocalStorage<boolean>(
    "firstStart",
    true
  );

  const [textToCopyModal, setTextToCopyModal] = useState(false);

  const newQuickNoteId = uuidv4();
  return (
    <>
      {firstStart && (
        <Modal center={true} setOpen={setFirstStartModal}>
          <div className="flex flex-col items-center justify-center">
            <h1>Hello!</h1>
            <p>This is first start</p>

            <button
              onClick={() => setFirstStart(false)}
              className="btn mt-4 w-20 bg-app-blue/20"
            >
              OK
            </button>
          </div>
        </Modal>
      )}
      <section className="page">
        <div className="page-header p-3">
          <span className="btn uppercase bg-gradient-to-br from-app-yellow-200/50 to-app-green/20 select-none">
            <span className="-skew-x-6 -rotate-12 font-bold text-xl">N</span>
          </span>

          <div className="actions-row">
            <Link to={`/quick-notes/${newQuickNoteId}`} className="btn">
              <QuickNoteIcon />
            </Link>

            <button className="btn" onClick={() => setTextToCopyModal(true)}>
              <CopyIcon />
            </button>

            <Link className="btn" to={"/user"}>
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
    </>
  );
}
