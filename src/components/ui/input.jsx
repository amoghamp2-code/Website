export function Input({ className = "", ...props }) {
  const base = "w-full h-10 rounded-xl border bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 dark:border-neutral-800";
  return <input className={`${base} ${className}`} {...props} />;
}
