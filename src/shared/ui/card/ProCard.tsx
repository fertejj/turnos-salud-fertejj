import { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ProCardProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
  headerRight?: ReactNode;
  onClick?: () => void;
}

export default function ProCard({
  title,
  subtitle,
  children,
  actions,
  className,
  headerRight,
  onClick,
}: ProCardProps) {
  const isClickable = typeof onClick === "function";

  return (
    <div
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={cn(
        "bg-surface rounded-2xl p-6 shadow-md transition-shadow duration-200 flex flex-col gap-4",
        isClickable && "cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
        className
      )}
    >
      {(title || subtitle || headerRight) && (
        <div className="flex justify-between items-start">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-text leading-snug tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {headerRight && (
            <div className="ml-2 flex-shrink-0">{headerRight}</div>
          )}
        </div>
      )}

      {children && <div className="text-sm text-text">{children}</div>}

      {actions && (
        <div className="pt-3 mt-auto border-t border-border flex justify-end gap-2 text-sm text-primary">
          {actions}
        </div>
      )}
    </div>
  );
}
