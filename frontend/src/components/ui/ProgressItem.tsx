import { useState } from "react";
import { cn } from "@/lib/utils";

type ProgressItemProps = {
  label: string;
  icon?: React.ReactNode;
  actived?: boolean;
  onClick?: () => void;
  details?: string;
};

export default function ProgressItem({
  label,
  icon,
  actived = false,
  onClick,
  details,
}: ProgressItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div
        onClick={() => {
          onClick?.();
          if (details) setExpanded((prev) => !prev);
        }}
        className={cn(
          "relative cursor-pointer p-5 transition-colors duration-200 flex items-center border-b border-border",
          actived ? "bg-muted" : "hover:bg-muted/60"
        )}
      >
        <div className="flex items-center space-x-2 w-full">
          {icon && <div className="text-sm w-4 h-4 flex items-center justify-center">{icon}</div>}
          <span className={cn(actived && "font-semibold text-primary")}>{label}</span>
        </div>
        {actived && (
          <span className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-10 bg-primary rounded-r" />
        )}
      </div>
      {expanded && details && (
        <div className="ml-6 mt-2 text-sm text-muted-foreground whitespace-pre-wrap">{details}</div>
      )}
    </div>
  );
}