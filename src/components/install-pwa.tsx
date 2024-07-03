import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { text } from "../lang";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPwa() {
  const [supportsPWA, setSupportsPWA] = useState<boolean>(
    () => localStorage.getItem("supportsPWA") === "true"
  );
  const [language] = useLocalStorage<string>("lang", "EN");
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const beforeInstallPromptEvent = e as BeforeInstallPromptEvent;
      beforeInstallPromptEvent.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(beforeInstallPromptEvent);
      localStorage.setItem("supportsPWA", "true");
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
  }, []);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  if (!supportsPWA) {
    return null;
  }

  return (
    <button
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      className="fixed bottom-3 right-3 btn bg-gradient-to-r from-app-yellow-200/50 to-app-green/25 w-fit"
      onClick={onClick}
    >
      {text.installApp[language]}
    </button>
  );
}
