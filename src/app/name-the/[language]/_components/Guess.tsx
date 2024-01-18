"use client";

import { useLayoutEffect, useRef } from "react";

const codeAreaMask = "linear-gradient(90deg, black 90%, transparent)";

export default function Guess({ codeHtml }: { codeHtml: string }) {
  const codeRef = useRef<HTMLPreElement>(null);

  useLayoutEffect(() => {
    const placeholder = codeRef.current?.querySelectorAll(".hljs-placeholder");

    if (placeholder) {
      placeholder.forEach((el) => {
        el.textContent = "?";
      });
    }
  }, []);

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
          className="w-full rounded-md border border-neutral-300 px-4 py-2"
        />
      </div>
    </div>
  );
}
