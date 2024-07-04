import { useLocalStorage } from "usehooks-ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { CircleX, Copy } from "lucide-react";
import { ISnippet } from "../../lib/types";
import Modal from "../modal";
import { text } from "../../lang";

type Inputs = { body: string };

type SnippetsProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Snippets({ open, setOpen }: SnippetsProps) {
  const [language] = useLocalStorage<string>("lang", "EN");
  const [snippets, setSnippets] = useLocalStorage<ISnippet[]>("snippets", []);
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ body }) => {
    if (body) {
      const newText = { id: uuidv4(), body };
      if (snippets.length === 0) {
        setSnippets([newText]);
      } else {
        setSnippets([...snippets, newText]);
      }
      reset();
      setOpen(false);
    }
  };

  const deleteSnippet = (id: string) => {
    if (confirm(`${text.delete[language]}?`) === true) {
      setSnippets(snippets.filter((snippet) => snippet.id !== id));
    }
  };

  return (
    <>
      {open && (
        <Modal setOpen={setOpen}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("body", { required: true })}
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

          {snippets.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {snippets.map((snippet) => (
                <div className="px-1.5 py-1 flex items-center flex-nowrap gap-2 bg-app-green/15 rounded-3xl whitespace-nowrap">
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-full active:bg-app-red/15 transition-all"
                    onClick={() => deleteSnippet(snippet.id)}
                  >
                    <CircleX size={20} className="stroke-app-red" />
                  </button>

                  {snippet.body}

                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-full active:bg-app-green/50 transition-all"
                    onClick={() => {
                      navigator.clipboard.writeText(snippet.body);
                    }}
                  >
                    <Copy size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
