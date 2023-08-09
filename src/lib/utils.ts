import { type ClassValue, clsx } from "clsx";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const copyToClipboard = (content: string, message: string) => {
  navigator.clipboard.writeText(content).then(() => toast.success(message));
};

export const getFilesFromInput = (files: FileList | null) => {
  console.log(files);
};
