export function Badge({ className = "", variant = "default", ...props }) {
  const base = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs";
  const variants = {
    default: "bg-black text-white border-transparent dark:bg-white dark:text-black",
    secondary: "bg-neutral-100 text-neutral-900 border-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-800",
  };
  return <span className={`${base} ${variants[variant] ?? variants.default} ${className}`} {...props} />;
}
