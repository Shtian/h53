"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = PopoverPrimitive.Content;
const PopoverPortal = PopoverPrimitive.Portal;

function PopoverArrow({ className, ...props }: PopoverPrimitive.PopoverArrowProps) {
  return (
    <PopoverPrimitive.Arrow
      className={cn("fill-slate-800/80 drop-shadow", className)}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverPortal,
  PopoverArrow,
};
