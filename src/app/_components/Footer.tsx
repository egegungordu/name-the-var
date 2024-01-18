import Link from "next/link";
import { LuGithub } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-screen-md py-4 text-xs">
      <span className="ml-auto">
        <Link
          href="https://github.com/egegungordu/name-the-var"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-neutral-400 transition-colors hover:text-neutral-800"
        >
          <LuGithub className="h-4 w-4" />
          Source
        </Link>
      </span>
    </footer>
  );
}
