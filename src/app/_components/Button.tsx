import { cn } from "@/lib/utils";

type ButtonProps = {
  variant: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary: "bg-neutral-800 text-white hover:bg-neutral-700",
  secondary: "text-neutral-800 hover:text-neutral-500"
};

export default function Button({
  variant,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-full px-5 py-3 font-medium transition-all duration-100 active:scale-95 disabled:opacity-50 sm:px-4 sm:py-2 whitespace-nowrap",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
