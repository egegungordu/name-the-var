"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuFile, LuLoader, LuLoader2 } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { HINT_COUNT } from "@/constants";
import {
  getTodaysHintFirst,
  getTodaysHintSecond,
  getTodaysHintThird,
} from "../_actions/get-todays-hint";

function AvatarAndOwnerAndRepo({
  avatar,
  owner,
  repo,
}: {
  avatar: string;
  owner: string;
  repo: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="github account logo"
        src={avatar}
        className="h-8 w-8 rounded-xl border"
      />

      <div className="flex flex-col justify-center">
        <span className="text-xs text-neutral-400">{owner}</span>

        <span>{repo}</span>
      </div>
    </div>
  );
}

function Description({ description }: { description: string }) {
  return (
    <div className="pl-1 text-neutral-700">
      <span className="block text-xs text-neutral-400">About</span>

      {description}
    </div>
  );
}

function Path({ path }: { path: string }) {
  return (
    <div className="my-2 rounded-md border border-neutral-300/30 bg-white px-3 py-1 font-mono text-neutral-700">
      <LuFile className="mr-2 inline-block text-neutral-400" />

      <span className="mr-2 font-sans text-xs text-neutral-400">File path</span>

      {path}
    </div>
  );
}

export default function Hint({ language }: { language: string }) {
  const [currentHint, setCurrentHint] = useState(-1);
  const hintPrompt =
    currentHint === -1
      ? "Show hint"
      : currentHint === HINT_COUNT
        ? "All hints shown"
        : "Next hint";
  const hideHintButton = currentHint === HINT_COUNT - 1;
  const [pending, startTransition] = useTransition();

  // hint 1
  const [avatarAndOwnerAndRepo, setOwnerAndRepo] = useState<null | {
    avatar: string;
    owner: string;
    repo: string;
  }>(null);
  // hint 2
  const [repoDescription, setRepoDescription] = useState<null | {
    description: string;
  }>(null);
  // hint 3
  const [filePath, setFilePath] = useState<null | { path: string }>(null);

  const handleHintClick = () => {
    if (currentHint > HINT_COUNT) return;

    const nextHint = currentHint + 1;

    if (nextHint === 0) {
      startTransition(async () => {
        const firstHint = await getTodaysHintFirst(language);
        setOwnerAndRepo(firstHint);
        setCurrentHint(nextHint);
      });
    } else if (nextHint === 1) {
      startTransition(async () => {
        const secondHint = await getTodaysHintSecond(language);
        setRepoDescription(secondHint);
        setCurrentHint(nextHint);
      });
    } else if (nextHint === 2) {
      startTransition(async () => {
        const thirdHint = await getTodaysHintThird(language);
        setFilePath(thirdHint);
        setCurrentHint(nextHint);
      });
    }
  };

  const showHint = (hintIndex: number) => {
    return currentHint >= hintIndex;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-start gap-3 sm:flex-row">
        <AnimatePresence>
          {avatarAndOwnerAndRepo && showHint(0) && (
            <motion.div
              key="hint-0"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="shrink-0 overflow-hidden"
            >
              <AvatarAndOwnerAndRepo {...avatarAndOwnerAndRepo} />
            </motion.div>
          )}
          {repoDescription && showHint(1) && (
            <motion.div
              key="hint-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Description {...repoDescription} />
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
            disabled={pending}
            className="flex items-center gap-1 whitespace-nowrap px-1 text-xs font-medium text-neutral-400 hover:text-neutral-600 disabled:text-neutral-400"
          >
            {Array.from({ length: HINT_COUNT }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1 w-1 rounded-full transition-colors",
                  index <= currentHint ? "bg-neutral-600" : "bg-neutral-200",
                )}
              />
            ))}

            <span className="ml-1 py-1">{hintPrompt}</span>

            {pending && <LuLoader className="h-3.5 w-3.5 animate-spin" />}
          </motion.button>
        )}

        {filePath && showHint(2) && (
          <motion.div
            key="hint-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Path {...filePath} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
