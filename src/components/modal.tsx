type Props = {
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({ setOpen, children }: Props) {
  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className="bg-black/15 fixed inset-0 z-10"
      />
      <div className="p-4 bg-white rounded-3xl fixed inset-x-3 top-3 max-w-md mx-auto shadow-md z-20">
        {children}
      </div>
    </>
  );
}
