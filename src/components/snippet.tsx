import { Copy } from "lucide-react";

type Props = { label: string };

export default function Snippet({ label }: Props) {
  return (
    <div className="flex items-center pl-3.5 gap-1.5 py-1 pr-1 flex-nowrap w-full bg-app-green/15 rounded-3xl whitespace-nowrap">
      {label}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full active:bg-app-green/50 transition-all"
        onClick={() => {
          navigator.clipboard.writeText(label);
        }}
      >
        <Copy size={16} />
      </button>
    </div>
  );
}
