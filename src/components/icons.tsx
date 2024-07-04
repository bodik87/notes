import {
  ArrowLeft,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Circle,
  CircleCheck,
  CloudOff,
  Copy,
  Folder,
  Languages,
  Plus,
  Search,
  Settings2,
  Text,
  Trash,
  UserCircle,
} from "lucide-react";
import { cn } from "../lib/utils";

export function ChapterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      className="fill-white"
    >
      <path d="M21 8c-.01-.77-.34-1.35-1-1.73l-7-4c-.67-.39-1.34-.39-2 0l-7 4c-.67.38-1 .96-1 1.73v8c0 .76.33 1.34 1 1.73l7 4c.66.38 1.33.38 2 0l7-4c.66-.39.99-.97 1-1.73V8Z" />
      <path
        className="stroke-app-gray-300"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m20 6.27-7-4c-.67-.39-1.34-.39-2 0l-7 4c-.67.38-1 .96-1 1.73v8c0 .76.33 1.34 1 1.73l7 4c.66.38 1.33.38 2 0l7-4c.66-.39.99-.97 1-1.73V8c-.01-.77-.34-1.35-1-1.73Z"
      />
      <path d="m2.82 7.85-.02.01a.982.982 0 0 1-.37-1.36c.28-.49.88-.65 1.36-.37l.01.03-.98 1.69Zm17.37-1.69.01-.03a.982.982 0 0 1 1.36.37c.28.48.12 1.08-.37 1.36l-.02-.01-.98-1.69Z" />
      <path
        className="stroke-app-gray-300"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3.29 7 12 12l8.7-5"
      />
    </svg>
  );
}

export function SearchIcon() {
  return <Search />;
}

export function ExpandIcon() {
  return <ChevronUp />;
}

export function CollapseIcon() {
  return <ChevronDown />;
}

export function PlusIcon({ className }: { className?: string }) {
  return <Plus className={cn("", className)} />;
}

export function FolderIcon() {
  return <Folder className="stroke-app-yellow-300 fill-app-yellow-200" />;
}

export function DeleteIcon() {
  return <Trash stroke="#FB4D2E" size={20} />;
}

export function TransferIcon() {
  return <ArrowUpDown className="stroke-gray-800" />;
}

export function BackIcon() {
  return <ArrowLeft />;
}

export function SettingsIcon() {
  return <Settings2 className="stroke-gray-800" />;
}

export function UserIcon() {
  return <UserCircle className="stroke-app-green" />;
}

export function LanguagesIcon() {
  return <Languages className="stroke-app-rose" />;
}

export function NoConnectionIcon() {
  return <CloudOff className="stroke-app-red" />;
}

export function CopyIcon() {
  return <Copy size={20} className="stroke-app-green" />;
}

export function QuickNoteIcon() {
  return <Text />;
}

export function TodoIcon() {
  return <Circle className="stroke-app-blue" />;
}

export function TodoCheckedIcon() {
  return <CircleCheck className="stroke-app-gray-200" />;
}

export function Loader() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 54 20"
      className="mt-5 max-w-10"
    >
      <circle cx="6" cy="10" r="6" className="fill-app-green">
        <animate
          attributeName="opacity"
          begin=".1"
          dur="1s"
          repeatCount="indefinite"
          values="0;1;0"
        />
      </circle>
      <circle cx="26" cy="10" r="6" className="fill-app-green">
        <animate
          attributeName="opacity"
          begin=".2"
          dur="1s"
          repeatCount="indefinite"
          values="0;1;0"
        />
      </circle>
      <circle cx="46" cy="10" r="6" className="fill-app-green">
        <animate
          attributeName="opacity"
          begin=".3"
          dur="1s"
          repeatCount="indefinite"
          values="0;1;0"
        />
      </circle>
    </svg>
  );
}
