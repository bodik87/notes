import Modal from "../modal";

type Props = {
  firstStart: boolean;
  setFirstStartModal: React.Dispatch<React.SetStateAction<boolean>>;
  setFirstStart: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Start({
  firstStart,
  setFirstStartModal,
  setFirstStart,
}: Props) {
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
    </>
  );
}
