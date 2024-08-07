import { Link } from "react-router-dom";
import { SettingsIcon } from "../components/icons";
import Chapters from "../components/home-page/chapters";
import Todos from "../components/home-page/todos";
import Snippets from "../components/home-page/snippets";
import PinnedNote from "../components/home-page/pinned-note";

export default function HomePage() {
  return (
    <>
      <section className="page">
        <div className="page-header p-3">
          <span className="btn uppercase bg-gradient-to-br from-app-yellow-200/50 to-app-green/20 select-none">
            <span className="-skew-x-6 -rotate-12 font-bold text-xl">N</span>
          </span>

          <div className="actions-row">
            <Snippets />

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
