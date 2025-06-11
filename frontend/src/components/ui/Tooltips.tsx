'use client';

import * as Tooltip from '@radix-ui/react-tooltip';

export function TooltipDemo({ children, tooltip }: { children: React.ReactNode; tooltip: string }) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            align="center"
            sideOffset={8}
            className="px-3 py-1.5 rounded-md bg-foreground text-background text-sm shadow-md"
          >
            {tooltip}
            <Tooltip.Arrow className="fill-foreground" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
