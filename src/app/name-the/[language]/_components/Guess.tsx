"use client";

import useLayoutEffectOnce from "@/utils/use-layout-effect-once";
import useWindowEventListener from "@/utils/use-window-event-listener";
import { useRef } from "react";
import Hint from "./Hint";
import { LuArrowRight } from "react-icons/lu";

// const codeAreaMask = "linear-gradient(90deg, black calc(100% - 64px), transparent)";
const codeAreaMask =
  "linear-gradient(0deg, transparent, black 64px, black calc(100% - 64px), transparent)";

export default function Guess({ language, codeHtml }: { language: string, codeHtml: string }) {
  const codeRef = useRef<HTMLPreElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useWindowEventListener("keydown", () => {
    // TODO: shouldnt focus on all keys
    inputRef.current?.focus();
  });

  useLayoutEffectOnce(() => {
    const placeholder = codeRef.current?.querySelectorAll(".hljs-placeholder");

    if (placeholder) {
      placeholder.forEach((el) => {
        el.textContent = "?";
      });
    }
  });

  return (
    <div className="mx-auto flex w-full max-w-full flex-1 animate-fade-in flex-col items-start lg:max-w-screen-md">
      <div className="mt-auto w-full">
        <Hint language={language} />
      </div>

      <div className="max-h-[469px] w-full overflow-auto rounded-md border border-neutral-300/30 bg-white">
        <pre
          className="select-none py-4 pl-4 pr-8"
          style={{
            maskImage: codeAreaMask,
            WebkitMaskImage: codeAreaMask,
          }}
        >
          <code
            ref={codeRef}
            className="font-mono text-sm font-normal"
            dangerouslySetInnerHTML={{ __html: codeHtml }}
          />
        </pre>
      </div>

      <div className="mb-auto mt-2 flex w-full items-center gap-2 self-center font-mono font-semibold">
        <input
          ref={inputRef}
          placeholder="I think it's..."
          autoFocus
          // disable paste
          onPaste={(e) => {
            e.preventDefault();
          }}
          // disable space
          onBeforeInput={(e) => {
            if ((e as any).data === " ") {
              e.preventDefault();
            }
          }}
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            const newValue = input.value === "" ? "?" : input.value;

            const placeholder =
              codeRef.current?.querySelectorAll(".hljs-placeholder");
            if (placeholder) {
              placeholder.forEach((el) => {
                el.textContent = newValue;
              });
            }
          }}
          type="text"
          className="w-full rounded-full px-4 py-2 shadow-lg shadow-black/5 focus:outline-none"
        />

        <button className="grid aspect-square h-full place-items-center rounded-full bg-white shadow-lg shadow-black/5 transition-all hover:shadow-black/10 focus:outline-none">
          <LuArrowRight className="h-4 w-4 text-neutral-500" />
        </button>
      </div>
    </div>
  );
}
