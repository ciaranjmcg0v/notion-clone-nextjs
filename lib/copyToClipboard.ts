"use client";

import { toast } from "sonner";

export const copyIdToClipboard = (value: string) => () => {
  navigator.clipboard.writeText(value);
  toast.success(`${value} copied to clipboard!`);
};
