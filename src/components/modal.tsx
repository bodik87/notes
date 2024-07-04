import { cn } from "../lib/utils";

type Props = {
  center?: boolean;
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({ center, setOpen, children }: Props) {
  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className="bg-black/15 fixed inset-0 z-30"
      />
      <div
        className={cn(
          "p-4 bg-white rounded-2xl fixed max-w-md mx-auto shadow-md z-40",
          center ? "inset-3 h-fit top-1/2 -translate-y-1/2" : "inset-x-3 top-3"
        )}
      >
        {children}
      </div>
    </>
  );
}
