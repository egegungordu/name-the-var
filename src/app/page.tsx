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

  return (
    <main className="relative isolate mx-auto flex h-full w-full max-w-screen-lg flex-col px-10">
      <div className="flex w-full justify-between py-4">
        <div className="text-base font-semibold text-neutral-700 underline decoration-red-400 decoration-2">
          <span className="mr-1 font-mono text-lg font-normal">$</span>
          nameTheVar
        </div>

        <button className="rounded-full p-2 text-neutral-500 hover:bg-white">
          <LuUser className="h-4 w-4" />
        </button>
      </div>

      {/*<Image
        src="/bg.png"
        alt="background"
        layout="fill"
        objectFit="contain"
        className="absolute -z-10 max-w-[800px] max-h-[800px] blur-sm"
        style={{ "left": "50%", "top": "50%", "transform": "translate(-50%, -50%)" } as any}
      />*/}

      <div className="flex h-full flex-1 flex-col">
        <div className="relative my-auto pb-20">
          <div className="px-2">
            <p className="mx-auto max-w-sm text-center text-neutral-700">
              Guess the daily variable names from popular open source projects
              and see how you compare to others.
            </p>
          </div>

          <div className="mt-4 text-center text-xs text-neutral-500">
            <span className="font-bold tabular-nums text-neutral-800">
              172,302{" "}
            </span>
            guesses
            <span className="mx-2">|</span>
            <span className="font-bold tabular-nums text-neutral-800">
              JS
            </span>{" "}
            most popular
            <span className="mx-2">|</span>
            <span className="font-bold tabular-nums text-neutral-800">
              72%
            </span>{" "}
            guessed correctly
          </div>

          <div className="mx-auto mt-6 grid max-w-lg grid-cols-4 flex-wrap gap-2">
            {LANGUAGES.map((lang, index) => (
              <button
                onClick={() => setSelectedLanguage(index)}
                key={lang.slug}
                className={cn(
                  "relative isolate flex flex-col justify-center overflow-hidden rounded-md border border-neutral-200 bg-white p-3 transition-all hover:bg-neutral-50",
                  {
                    "border-neutral-800 ring-2 ring-neutral-800":
                      index === selectedLanguage,
                    "opacity-60": index !== selectedLanguage,
                  },
                )}
              >
                <lang.logo className="mx-auto mb-2 h-8 w-8 drop-shadow-md" />
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

          <div className="mt-6 flex justify-center">
            <button className="rounded-full bg-neutral-800 px-4 py-2 font-medium text-white transition-all duration-100 hover:bg-neutral-700 active:scale-95">
              {startPrompt}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
