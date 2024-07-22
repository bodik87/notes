/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

type Props = {
  text: any;
  setText: any;
  placeholder: string;
  className?: string;
  toolbar?: boolean;
};

export default function ContentEditable({
  text,
  setText,
  placeholder,
  className,
  toolbar,
}: Props) {
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
        className={`${className} focus:outline-none shadow-none cursor-text`}
        data-placeholder={placeholder}
        contentEditable="true"
        spellCheck={false}
        ref={textRef}
        onBlur={handleSaveText}
      />

      {toolbar && (
        <div className="bg-gray-100 rounded-2xl">
          <button
            className="h-8 w-14 font-bold text-black scale-100"
            onClick={handleTextFormat}
          >
            B
          </button>
        </div>
      )}
    </>
  );
}
