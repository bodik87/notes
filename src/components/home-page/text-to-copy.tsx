import { useLocalStorage } from "usehooks-ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { ITextToCopy } from "../../lib/types";
import { text } from "../../lang";
import DraggableRow from "../draggable-row";
import Modal from "../modal";
import Chip from "../chip";
import Snippet from "../snippet";

type Inputs = { textToCopy: string };

type TextToCopyProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TextToCopy({ open, setOpen }: TextToCopyProps) {
  const [language] = useLocalStorage<string>("lang", "EN");
  const [texts, setTexts] = useLocalStorage<ITextToCopy[]>("texts", []);
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ textToCopy }) => {
    if (textToCopy) {
      const newText = { id: uuidv4(), textToCopy };
      if (texts.length === 0) {
        setTexts([newText]);
      } else {
        setTexts([...texts, newText]);
      }
      reset();
      setOpen(false);
    }
  };

  const handleClose = (id: string) => {
    if (confirm(`${text.delete[language]}?`) === true) {
      setTexts(texts.filter((el) => el.id !== id));
    }
  };

  return (
    <>
      {open && (
        <Modal setOpen={setOpen}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("textToCopy", { required: true })}
              placeholder={text.textToCopy[language]}
              autoComplete="off"
              spellCheck={"false"}
              className="bg-transparent text-lg"
              onKeyUp={(e) => e.key === "Enter" && e.currentTarget.blur()}
              autoFocus
            />

            <button
              type="submit"
              className="btn mt-4 ml-auto w-20 bg-app-green/25"
            >
              Ok
            </button>
          </form>

          {texts.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {texts.map((text) => (
                <Chip
                  key={text.id}
                  id={text.id}
                  label={text.textToCopy}
                  onClose={handleClose}
                />
              ))}
            </div>
          )}
        </Modal>
      )}

      <section
        className={`${
          texts.length === 0 ? "mt-0" : "mt-4"
        } flex gap-2 items-center text-sm`}
      >
        <DraggableRow>
          {texts.map((text) => (
            <Snippet key={text.id} label={text.textToCopy} />
          ))}
        </DraggableRow>
      </section>
    </>
  );
}
