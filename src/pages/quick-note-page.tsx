import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { IQuickNote } from "../lib/types";
import { DeleteIcon } from "../components/icons";
import BackButton from "../components/back-button";
import { text } from "../lang";
import ContentEditable from "../components/content-editable";

export default function QuickNotePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quickNotes, setQuickNotes] = useLocalStorage<IQuickNote[]>(
    "quickNotes",
    []
  );

  const existedQuickNote = quickNotes.find((el) => el.id === id);

  const deleteFastNote = (id: string) => {
    const updatedQuickNotes = quickNotes.filter((el) => el.id !== id);
    setQuickNotes(updatedQuickNotes);
    navigate("/");
  };

  const onSubmit = (text: string) => {
    if (text) {
      const quickNote = { id: id as string, quickNoteBody: text };
      if (quickNotes.length === 0) {
        setQuickNotes([quickNote]);
      } else {
        if (!existedQuickNote) {
          setQuickNotes([...quickNotes, quickNote]);
        } else {
          const updatedQuickNotes = quickNotes.map((el) => {
            if (el.id === id) {
              return quickNote;
            } else {
              return el;
            }
          });
          setQuickNotes(updatedQuickNotes);
        }
      }
    }
  };

  const [language] = useLocalStorage<string>("lang", "EN");

  return (
    <section className="page px-3">
      <div className="page-header">
        <BackButton />

        {existedQuickNote && (
          <button
            className="btn bg-app-red/15"
            onClick={() => deleteFastNote(existedQuickNote.id)}
          >
            <DeleteIcon />
          </button>
        )}
      </div>

      <ContentEditable
        setText={onSubmit}
        placeholder={text.quickNote[language]}
        className="p-4 pb-5 text-lg rounded-3xl bg-yellow-100"
        text={existedQuickNote ? existedQuickNote.quickNoteBody : ""}
      />
    </section>
  );
}
