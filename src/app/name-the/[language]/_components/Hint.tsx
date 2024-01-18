"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuFile, LuFiles, LuFolders } from "react-icons/lu";
import { cn } from "@/lib/utils";

// DioxusLabs/dioxus
// /packages/html/src/eval.rs
// 6126e02143932ed08fecdc43c99e277babb1c0e7

function Hint1() {
  return (
    <div className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="github account logo"
        src="https://avatars.githubusercontent.com/u/79236386?s=48&v=4"
        className="h-8 w-8 rounded-xl border"
      />

      <div className="flex flex-col justify-center">
        <span className="text-xs text-neutral-400">DioxusLabs</span>

        <span>dioxus</span>
      </div>
    </div>
  );
}

// Fullstack GUI library for desktop, web, mobile, and more.
function Hint2() {
  return (
    <div className="pl-1 text-neutral-700">
      <span className="block text-xs text-neutral-400">About</span>
      Fullstack GUI library for desktop, web, mobile, and more.
      Fullstack GUI library for desktop, web, mobile, and more.
      Fullstack GUI library for desktop, web, mobile, and more.
      Fullstack GUI library for desktop, web, mobile, and more.
      Fullstack GUI library for desktop, web, mobile, and more.
    </div>
  );
}

function Hint3() {
  return (
    <div className="rounded-md border border-neutral-300/30 bg-white px-3 py-1 my-2 font-mono text-neutral-700">
      <LuFile className="mr-2 inline-block text-neutral-400" />
      <span className="mr-2 font-sans text-xs text-neutral-400">File path</span>
      /packages/html/src/eval.rs
    </div>
  );
}

const HINT_COUNT = 3;

export default function Hint() {
  const [currentHint, setCurrentHint] = useState(-1);
  const hintPrompt =
    currentHint === -1
      ? "Show hint"
      : currentHint === HINT_COUNT
        ? "All hints shown"
        : "Next hint";
  const hideHintButton = currentHint === HINT_COUNT - 1;

  const handleHintClick = () => {
    setCurrentHint((prev) => prev + 1);
  };

  const showHint = (hintIndex: number) => {
    return currentHint >= hintIndex;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-start gap-3 sm:flex-row">
        <AnimatePresence>
          {showHint(0) && (
            <motion.div
              key="hint-0"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden shrink-0"
            >
              <Hint1 />
            </motion.div>
          )}
          {showHint(1) && (
            <motion.div
              key="hint-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Hint2 />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="sync">
        {!hideHintButton && (
          <motion.button
            key="hint-button"
            initial={false}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onClick={handleHintClick}
            className="whitespace-nowrap px-1 text-xs font-medium text-neutral-400 hover:text-neutral-600 flex items-center gap-1"
          >
            {Array.from({ length: HINT_COUNT }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1 w-1 rounded-full",
                  index <= currentHint ? "bg-neutral-600" : "bg-neutral-200",
                )}
              />
            ))}
            <span className="ml-1 py-1">
            {hintPrompt}
            </span>
          </motion.button>
        )}

        {showHint(2) && (
          <motion.div
            key="hint-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Hint3 />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
