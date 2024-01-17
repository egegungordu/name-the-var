"use client";

import { cn } from "@/lib/utils";
import { LuUser } from "react-icons/lu";
import { FaRust } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiC,
  SiCplusplus,
  SiCsharp,
  SiGo,
} from "react-icons/si";
import { useState } from "react";
import Image from "next/image";

const LANGUAGES = [
  {
    name: "JavaScript",
    paranthesis: "",
    slug: "javascript",
    color: "#f1e05a",
    logo: SiJavascript,
  },
  {
    name: "TypeScript",
    paranthesis: "",
    slug: "typescript",
    color: "#2b7489",
    logo: SiTypescript,
  },
  {
    name: "Python",
    paranthesis: "",
    slug: "python",
    color: "#3572a5",
    logo: SiPython,
  },
  {
    name: "Rust",
    // paranthesis is implemented just for this lmao
    paranthesis: "Unofficial",
    slug: "rust",
    color: "#dea584",
    logo: FaRust,
  },
  {
    name: "C",
    paranthesis: "",
    slug: "c",
    color: "#555555",
    logo: SiC,
  },
  {
    name: "C++",
    paranthesis: "",
    slug: "cpp",
    color: "#f34b7d",
    logo: SiCplusplus,
  },
  {
    name: "C#",
    paranthesis: "",
    slug: "csharp",
    color: "#178600",
    logo: SiCsharp,
  },
  {
    name: "Go",
    paranthesis: "",
    slug: "go",
    color: "#00ADD8",
    logo: SiGo,
  },
];

const GO_INDEX = LANGUAGES.findIndex((lang) => lang.slug === "go");

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const startPrompt = selectedLanguage === GO_INDEX ? "Go" : "Start";
  const today = new Date();
  const dayOfWeek = today.getDay();

  return (
    <main className="relative isolate mx-auto flex h-full flex-col">
      {/*<Image
        src="/bg.png"
        alt="background"
        layout="fill"
        objectFit="contain"
        className="absolute -z-10 max-w-[800px] max-h-[800px] blur-sm"
        style={{ "left": "50%", "top": "50%", "transform": "translate(-50%, -50%)" } as any}
      />*/}

      <div className="relative mx-auto my-auto flex max-w-lg flex-col items-center pb-20">
        <div className="text-neutral-700">
          <div className="flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
            <div className="text-xs font-semibold">
              {today.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-2 w-2 rounded-full",
                    index === dayOfWeek ? "bg-neutral-800" : "bg-neutral-200",
                  )}
                />
              ))}
            </div>
          </div>
          <p className="mt-2 max-w-md">
            Guess the daily variable name from popular open source projects and
            see how you compare to others.
          </p>
        </div>

        <div className="mt-4 flex divide-x text-xs text-neutral-500 text-center">
          <div className="px-2">
            <span className="font-bold tabular-nums text-neutral-800">
              172,302{" "}
            </span>
            guesses
          </div>
          <div className="px-2">
            <span className="font-bold tabular-nums text-neutral-800">JavaScript</span>{" "}
            most popular
          </div>
          <div className="px-2">
            <span className="font-bold tabular-nums text-neutral-800">72%</span>{" "}
            guessed correctly
          </div>
        </div>

        <div className="mt-6 grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
          {LANGUAGES.map((lang, index) => (
            <button
              onClick={() => setSelectedLanguage(index)}
              key={lang.slug}
              className={cn(
                "relative isolate flex items-center gap-2 overflow-hidden rounded-md border border-neutral-200 bg-white p-3 transition-all hover:opacity-100 sm:flex-col sm:justify-center",
                {
                  "border-neutral-800 ring-2 ring-neutral-800":
                    index === selectedLanguage,
                  "opacity-60": index !== selectedLanguage,
                },
              )}
            >
              <lang.logo className="h-4 w-4 drop-shadow-md sm:h-8 sm:w-8" />
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs font-semibold text-neutral-700">
                {lang.name}
                {lang.paranthesis && (
                  <span className="font-normal"> ({lang.paranthesis})</span>
                )}
              </span>

              {index === selectedLanguage && (
                <div
                  className="absolute left-1/2 top-0 -z-10 h-20 w-[150%] -translate-x-1/2 -translate-y-1/2 animate-selected-language-in bg-gradient-radial from-black via-transparent blur-md"
                  style={{ "--tw-gradient-from": lang.color } as any}
                />
              )}
            </button>
          ))}
        </div>

        <button className="mt-6 rounded-full bg-neutral-800 px-5 py-3 font-medium text-white transition-all duration-100 hover:bg-neutral-700 active:scale-95 sm:px-4 sm:py-2">
          {startPrompt}
        </button>
      </div>
    </main>
  );
}
