import { useLocalStorage } from "usehooks-ts";
import { IPinnedNote } from "../../lib/types";
import { text } from "../../lang";
import ContentEditable from "../content-editable";

export default function PinnedNote() {
  const [pinnedNote, setPinnedNote] = useLocalStorage<IPinnedNote | null>(
    "pinnedNote",
    null
  );
  const [language] = useLocalStorage<string>("lang", "EN");

  return (
    <div className="px-3">
      <ContentEditable
        text={pinnedNote ? pinnedNote : null}
        setText={setPinnedNote}
        placeholder={text.pinnedNote[language]}
        className="p-4 pb-5 text-lg rounded-2xl bg-app-yellow-100"
      />
    </div>
  );
}
