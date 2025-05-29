'use client';

import * as React from 'react';
import {
  DropdownMenu as DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';

export interface DropdownOption {
  label: string;
  value: string;
}

export {
 DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  
} from '@radix-ui/react-dropdown-menu';




interface DropdownProps {
  triggerLabel: string;
  options: DropdownOption[];
  onSelect?: (value: string) => void;
  className?: string;
}

export const DropdownMenu: React.FC<DropdownProps> = ({
  triggerLabel,
  options,
  onSelect,
  className,
}) => {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors',
            className
          )}
        >
          {triggerLabel}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-2 min-w-[180px] rounded-md border bg-white p-1 shadow-md"
        sideOffset={5}
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => onSelect?.(option.value)}
            className="cursor-pointer rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
};
