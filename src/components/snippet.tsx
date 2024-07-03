import { Copy } from "lucide-react";

type Props = { label: string };

export default function Snippet({ label }: Props) {
  return (
    <div className="btn bg-app-green/15 rounded-3xl">
      {label}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-lg active:bg-app-green/50 transition-all"
        onClick={() => {
          navigator.clipboard.writeText(label);
        }}
      >
        <Copy size={16} />
      </button>
    </div>
  );
}
