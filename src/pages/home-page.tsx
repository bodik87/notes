import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { CopyIcon, SettingsIcon } from "../components/icons";
import Chapters from "../components/home-page/chapters";
import Todos from "../components/home-page/todos";
import Snippets from "../components/home-page/snippets";
import Start from "../components/home-page/start";
import PinnedNote from "../components/home-page/pinned-note";

export default function HomePage() {
  const [, setFirstStartModal] = useState(false);
  const [firstStart, setFirstStart] = useLocalStorage<boolean>(
    "firstStart",
    true
  );

  const [textToCopyModal, setTextToCopyModal] = useState(false);

  return (
    <>
      <Start
        firstStart={firstStart}
        setFirstStartModal={setFirstStartModal}
        setFirstStart={setFirstStart}
      />

      <Snippets open={textToCopyModal} setOpen={setTextToCopyModal} />

      <section className="page">
        <div className="page-header p-3">
          <span className="btn uppercase bg-gradient-to-br from-app-yellow-200/50 to-app-green/20 select-none">
            <span className="-skew-x-6 -rotate-12 font-bold text-xl">N</span>
          </span>

          <div className="actions-row">
            <button className="btn" onClick={() => setTextToCopyModal(true)}>
              <CopyIcon />
            </button>

            <Link className="btn" to={"/user"}>
              <SettingsIcon />
            </Link>
          </div>
        </div>

        <PinnedNote />
        <Todos />
        <Chapters />
      </section>
    </>
  );
}
