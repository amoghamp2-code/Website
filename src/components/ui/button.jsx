export function Button({ className = "", variant = "default", size = "md", ...props }) {
  const base = "inline-flex items-center justify-center rounded-2xl border text-sm font-medium px-4 py-2 transition active:scale-[.98]";
  const variants = {
    default: "bg-black text-white border-transparent hover:opacity-90 dark:bg-white dark:text-black",
    secondary: "bg-white text-black border hover:bg-neutral-50 dark:bg-neutral-900 dark:text-white dark:border-neutral-800",
    outline: "bg-transparent border text-current hover:bg-black/5 dark:hover:bg-white/5",
    ghost: "bg-transparent border-transparent hover:bg-black/5 dark:hover:bg-white/5",
  };
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-base",
    icon: "h-10 w-10 p-0"
  };
  return <button className={`${base} ${variants[variant] ?? variants.default} ${sizes[size] ?? sizes.md} ${className}`} {...props} />;
}
