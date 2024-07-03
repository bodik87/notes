import { useState } from "react";
import { CollapseIcon, ExpandIcon, LanguagesIcon } from "../icons";
import { text } from "../../lang";
import { useLocalStorage } from "usehooks-ts";
import { cn } from "../../lib/utils";

export default function Languages() {
  const [expandedList, setExpandedList] = useState(false);

  const switchToEN = () => setLanguage("EN");
  const switchToPL = () => setLanguage("PL");
  const switchToUA = () => setLanguage("UA");
  const switchToRU = () => setLanguage("RU");

  const [language, setLanguage] = useLocalStorage<string>("lang", "EN");

  return (
    <>
      <div className="flex justify-between items-center w-full font-medium text-lg">
        <div className="flex items-center gap-3">
          <LanguagesIcon />
          {text.languages[language]}
        </div>
        <button
          className="btn min-w-0 bg-app-gray"
          onClick={() => setExpandedList(!expandedList)}
        >
          {expandedList ? <ExpandIcon /> : <CollapseIcon />}
        </button>
      </div>

      {expandedList && (
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            className={cn(
              "btn",
              language === "UA"
                ? "ring-2 ring-app-rose bg-app-rose/15"
                : "bg-app-gray"
            )}
            onClick={switchToUA}
          >
            UA
          </button>
          <button
            className={cn(
              "btn",
              language === "PL"
                ? "ring-2 ring-app-rose bg-app-rose/15"
                : "bg-app-gray"
            )}
            onClick={switchToPL}
          >
            PL
          </button>
          <button
            className={cn(
              "btn",
              language === "EN"
                ? "ring-2 ring-app-rose bg-app-rose/15"
                : "bg-app-gray"
            )}
            onClick={switchToEN}
          >
            EN
          </button>
          <button
            className={cn(
              "btn",
              language === "RU"
                ? "ring-2 ring-app-rose bg-app-rose/15"
                : "bg-app-gray"
            )}
            onClick={switchToRU}
          >
            RU
          </button>
        </div>
      )}
    </>
  );
}
