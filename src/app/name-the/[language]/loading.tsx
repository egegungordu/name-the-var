import { LuLoader } from "react-icons/lu";

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center animate-fade-in">
      <LuLoader className="animate-spin text-xl text-neutral-500" />
    </div>
  );
}
