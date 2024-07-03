import { useEffect, useRef } from "react";

type Props = { text: string; className?: string };

export default function ContentEditablePreview({ text, className }: Props) {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = text;
    }
  }, [text]);

  return (
    <div
      ref={previewRef}
      className={`${className} focus:outline-none shadow-none`}
    />
  );
}
