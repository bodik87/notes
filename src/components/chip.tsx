import { CircleX } from "lucide-react";

type Props = { label: string; id: string; onClose: (id: string) => void };

export default function Chip({ id, label, onClose }: Props) {
  return (
    <div className="btn !h-[34px] bg-app-red/10 text-sm">
      {label}
      <button onClick={() => onClose(id)}>
        <CircleX size={20} className="stroke-app-red" />
      </button>
    </div>
  );
}
