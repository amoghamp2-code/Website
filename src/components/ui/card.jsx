export function Card({ className = "", ...props }) {
  return <div className={`rounded-2xl border bg-white dark:bg-neutral-950 dark:border-neutral-800 ${className}`} {...props} />;
}
export function CardHeader({ className = "", ...props }) {
  return <div className={`p-4 md:p-6 border-b dark:border-neutral-800 ${className}`} {...props} />;
}
export function CardTitle({ className = "", ...props }) {
  return <h3 className={`text-lg font-semibold tracking-tight ${className}`} {...props} />;
}
export function CardContent({ className = "", ...props }) {
  return <div className={`p-4 md:p-6 ${className}`} {...props} />;
}
