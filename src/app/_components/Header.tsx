"use client";

import { LuUser } from "react-icons/lu";
import { useNTVStore } from "@/store/store";
import Link from "next/link";

export default function Header() {
  const selectedLanguage = useNTVStore((state) => state.selectedLanguage);
  const title = selectedLanguage?.title
    ? selectedLanguage.title
    : "Name the Var";
  const prefix = selectedLanguage?.title_prefix
    ? selectedLanguage.title_prefix
    : "";
  const suffix = selectedLanguage?.title_suffix
    ? selectedLanguage.title_suffix
    : "";

  return (
    <div className="mx-auto flex w-full max-w-screen-md select-none items-center justify-between py-4">
      <div className="relative">
        <Link
          href="/"
          className="whitespace-nowrap text-2xl font-semibold text-neutral-700 bg-[url('/squiggly.svg')] bg-repeat-x pb-2 animate-squiggly-slide hover:text-neutral-400"
          style={{
            backgroundPosition: "0% 100%",
          }}
        >
          {title}
        </Link>

        <div className="absolute right-full top-1/2 mr-1.5 mt-px hidden -translate-y-1/2 whitespace-nowrap text-lg text-neutral-400/70 lg:block">
          {prefix}
        </div>

        <div className="absolute left-full top-1/2 ml-1.5 mt-px hidden -translate-y-1/2 whitespace-nowrap text-lg text-neutral-400/70 lg:block">
          {suffix}
        </div>
      </div>

      <button className="rounded-full p-2 text-neutral-500 hover:bg-white">
        <LuUser className="h-5 w-5 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
}
