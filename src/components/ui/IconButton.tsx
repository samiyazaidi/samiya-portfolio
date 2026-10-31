import type { ButtonHTMLAttributes } from "react";
export function IconButton({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-accent/40 transition hover:bg-tertiary disabled:cursor-not-allowed disabled:opacity-35 ${className}`}
    />
  );
}
