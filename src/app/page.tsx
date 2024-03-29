"use client";

import { cn } from "@/lib/utils";
import { LANGUAGES } from "@/languages";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { motion } from "framer-motion";
import Button from "./_components/Button";

export default function Home() {
  const router = useRouter();
  const today = new Date();
  const dayOfWeek = today.getDay();
  const [selectedLanguageSlug, setSelectedLanguageSlug] = useQueryState("lang");
  const buttonPrompt = selectedLanguageSlug ? "Start" : "Select a language";
  const disableButton = !selectedLanguageSlug;

  const handleClickLanguage = (languageSlug: string) => {
    setSelectedLanguageSlug(languageSlug);
  };

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

        <div className="mt-4 flex divide-x text-center text-xs text-neutral-500">
          <div className="px-2">
            <span className="font-bold tabular-nums text-neutral-800">
              172,302{" "}
            </span>
            guesses
          </div>
          <div className="px-2">
            <span className="font-bold tabular-nums text-neutral-800">
              JavaScript
            </span>{" "}
            most popular
          </div>
          <div className="px-2">
            <span className="font-bold tabular-nums text-neutral-800">72%</span>{" "}
            guessed correctly
          </div>
        </div>

        <div className="mt-6 grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
          {LANGUAGES.map((lang, i) => (
            <motion.button
              initial={{ opacity: 0, y: 5 }}
              animate={{
                opacity: lang.slug !== selectedLanguageSlug ? 0.5 : 1,
                y: 0,
              }}
              whileHover={{ opacity: 1, transition: { duration: 0.1 } }}
              onClick={() => handleClickLanguage(lang.slug)}
              transition={{ delay: 0.015 * i, ease: "easeInOut" }}
              key={lang.slug}
              className={cn(
                "relative isolate flex items-center gap-2 overflow-hidden rounded-md border border-neutral-200 bg-white p-3 transition-colors sm:flex-col sm:justify-center",
                {
                  "border-neutral-800 ring-1 ring-neutral-800":
                    lang.slug === selectedLanguageSlug,
                },
              )}
            >
              <lang.logo className="h-4 w-4 drop-shadow-md sm:h-8 sm:w-8" />
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs font-semibold text-neutral-700">
                {lang.name}
                {lang.extra && (
                  <span className="font-normal"> ({lang.extra})</span>
                )}
              </span>

              {lang.slug === selectedLanguageSlug && (
                <div
                  className="absolute left-1/2 top-0 -z-10 h-20 w-[150%] -translate-x-1/2 -translate-y-1/2 animate-selected-language-in bg-gradient-radial from-black via-transparent blur-md"
                  style={{ "--tw-gradient-from": lang.color } as any}
                />
              )}
            </motion.button>
          ))}
        </div>

        <Button
          variant="primary"
          onClick={() => {
            router.push(`/name-the/${selectedLanguageSlug}`);
          }}
          disabled={disableButton}
          className="mt-6"
        >
          {buttonPrompt}
        </Button>
      </div>
    </main>
  );
}
