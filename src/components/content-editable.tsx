/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

type Props = {
  text: any;
  setText: any;
  placeholder: string;
  className?: string;
};

export default function ContentEditable({
  text,
  setText,
  placeholder,
  className,
}: Props) {
  const [editTools, setEditTools] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);

  const handleTextFormat = () => {
    const formatType = "bold";
    const selObj = window.getSelection();
    if (selObj && selObj.rangeCount > 0) {
      selObj.getRangeAt(0);
      document.execCommand(formatType);
    } else {
      console.log("empty string");
    }
  };

  const handleSaveText = () => {
    const bodyText = textRef.current;
    if (bodyText) {
      setText(bodyText.innerHTML);
      setEditTools(false);
    }
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.innerHTML = text;
    }
  }, [text]);

  return (
    <>
      <div
        className={`${className} focus:outline-none shadow-none`}
        data-placeholder={placeholder}
        contentEditable="true"
        spellCheck={false}
        ref={textRef}
        onFocus={() => setEditTools(true)}
        onBlur={handleSaveText}
      />

      <button
        className={cn(
          "fixed top-3 left-20 btn w-14 font-bold transition-all duration-500 bg-transparent z-20",
          editTools
            ? " text-black bg-gray-300 scale-100"
            : "bg-transparent text-transparent scale-80"
        )}
        onClick={handleTextFormat}
      >
        B
      </button>
    </>
  );
}
