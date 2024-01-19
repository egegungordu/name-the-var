"use client";

import { cn } from "@/lib/utils";
import useEffectOnce from "@/utils/use-effect-once";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

function AnimateCharacters({
  children,
  className,
  pauses,
  initialDelay = 0,
  inbetweenDelay = 0.04,
  pauseDelay = 0.5,
}: {
  children: string;
  className?: string;
  pauses?: number[];
  initialDelay?: number;
  inbetweenDelay?: number;
  pauseDelay?: number;
}) {
  const delays = useMemo(() => {
    let cumulativeDelay = initialDelay;
    const delays = [];

    for (let i = 0; i < children.length; i++) {
      delays.push(cumulativeDelay);
      cumulativeDelay += inbetweenDelay;
      if (pauses && pauses.includes(i)) cumulativeDelay += pauseDelay;
    }

    return delays;
  }, [pauses, children, initialDelay, inbetweenDelay, pauseDelay]);

  return (
    <div className={cn("flex flex-wrap", className)}>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.05, delay: delays[i] }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

function ThinkingDots({ className, inbetweenDelay = 0.5, initialDelay=0, dissapearAt }: { className?: string, inbetweenDelay?: number, initialDelay?: number, dissapearAt?: number }) {
  const [hide, setHide] = useState(false);

  useEffectOnce(() => {
    if (dissapearAt) {
      setTimeout(() => setHide(true), dissapearAt * 1000);
    }
  });

  if (hide) return null;

  return (
    <div
      className={cn(className, "flex items-center justify-center gap-2")}
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "spring",
            mass: 0.01,
            stiffness: 300,
            delay: i * inbetweenDelay + initialDelay,
          }}
          className="h-1.5 w-1.5 rounded-full border border-neutral-600 bg-white"
        />
      ))}
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="relative">
        {/* all my homies hate next/image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/miku-not-found.png"
          alt="miku not found"
          className="pointer-events-none h-24 w-full select-none object-contain"
        />

        <ThinkingDots inbetweenDelay={1} initialDelay={0.2} dissapearAt={3} className="absolute bottom-1/2 left-1/2 -translate-x-1/2 h-32 w-16" />

        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -30, y: 10 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 3.5,
          }}
          className="absolute bottom-4 left-3/4 flex h-32 w-16 items-center justify-center text-balance rounded-md border border-neutral-200 bg-white text-center text-xs font-medium text-neutral-500"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "upright",
          }}
        >
          <AnimateCharacters className="p-3" pauses={[6, 10]} initialDelay={4}>
            404エラー？これって、未知のメロディーかな？
          </AnimateCharacters>
        </motion.div>
      </div>

      <span className="mt-4 text-3xl font-bold text-neutral-700">
        404 Not Found
      </span>

      <span className="mt-2 text-neutral-400">
        This page doesn&apos;t exist.
      </span>
    </div>
  );
}
