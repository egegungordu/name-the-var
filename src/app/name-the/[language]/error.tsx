"use client";

import Button from "@/app/_components/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTransition } from "react";
import { LuLoader } from "react-icons/lu";

const errorZone =
  "bg-[repeating-linear-gradient(45deg,theme('colors.red.500'),theme('colors.red.500')_10px,transparent_10px,transparent_20px)]";
const linear =
  "linear-gradient(90deg, transparent, black 64px, black calc(100% - 64px), transparent)";
const radial = "radial-gradient(closest-side, #000000aa 0%, transparent 100%)";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [pending, startTransition] = useTransition();

  const handleResetClick = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));

      reset();
    });
  };

  return (
    <div className="relative isolate flex h-full w-full flex-col items-center justify-center">
      <div className="relative max-w-screen-sm animate-shake rounded-xl bg-white p-4 shadow-lg shadow-black/5">
        <div className="font-medium text-neutral-700">
          Uh oh, something went wrong while fetching the code snippet.
        </div>
        <div className="mt-2 text-xs text-red-500">{error.message}</div>

        <div className="mt-2 text-xs text-neutral-400">
          If you think this is a bug, please{" "}
          <a
            href="https://github.com/egegungordu/name-the-var/issues/new"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            create an issue
          </a>{" "}
          on GitHub.
        </div>

        <div className="absolute left-1/2 top-full mt-4 flex -translate-x-1/2 gap-2">
          <Link href="/">
            <Button variant="secondary">Go back</Button>
          </Link>

          <Button
            variant="primary"
            onClick={handleResetClick}
            disabled={pending}
          >
            Try again
          </Button>
        </div>

        {pending && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white bg-opacity-50">
            <LuLoader className="h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
