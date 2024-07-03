import { Link } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { IQuickNote } from "../../lib/types";
import ContentEditablePreview from "../content-editable-preview";

export default function QuickNotes() {
  const [quickNotes] = useLocalStorage<IQuickNote[]>("quickNotes", []);

  return (
    <>
      {quickNotes.length > 0 && (
        <div className="mt-4 px-3 grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            {quickNotes
              .filter((_, index) => {
                return index % 2 === 0;
              })
              .map((item) => (
                <QuickNoteItem key={item.id} note={item} />
              ))}
          </div>
          <div className="flex flex-col gap-2">
            {quickNotes
              .filter((_, index) => {
                return index % 2 !== 0;
              })
              .map((item) => (
                <QuickNoteItem key={item.id} note={item} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}

type QuickNoteProps = { note: IQuickNote };

function QuickNoteItem({ note }: QuickNoteProps) {
  return (
    <Link
      to={`/quick-notes/${note.id}`}
      className="p-4 max-h-[180px] text-sm rounded-3xl bg-app-yellow-100 overflow-hidden"
    >
      <ContentEditablePreview
        text={
          note.quickNoteBody.length > 96
            ? note.quickNoteBody.slice(0, 96) + "..."
            : note.quickNoteBody
        }
      />
    </Link>
  );
}
