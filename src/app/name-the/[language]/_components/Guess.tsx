"use client";

import useLayoutEffectOnce from "@/utils/use-layout-effect-once";
import useWindowEventListener from "@/utils/use-window-event-listener";
import { useRef } from "react";

const codeAreaMask = "linear-gradient(90deg, black 90%, transparent)";

export default function Guess({ codeHtml }: { codeHtml: string }) {
  const codeRef = useRef<HTMLPreElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useWindowEventListener("keydown", () => {
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
    <div className="mx-auto flex h-full max-w-screen-md animate-fade-in flex-col items-start">
      <pre
        className="my-auto w-full overflow-hidden"
        style={
          {
            maskImage: codeAreaMask,
            WebkitMaskImage: codeAreaMask,
          }
        }
      >
        <code
          ref={codeRef}
          className="font-mono text-base font-medium"
          dangerouslySetInnerHTML={{ __html: codeHtml }}
        />
      </pre>

      <div className="w-full self-center">
        <input
          ref={inputRef}
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
          className="w-full rounded-md px-4 py-2 focus:outline-none shadow-lg shadow-black/5"
        />
      </div>
    </div>
  );
}
