import { type ClassValue, clsx } from "clsx";
import { Dispatch, SetStateAction } from "react";
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

// read file as url
export const readFileAsURL = async (
  file: File | undefined,
  setState: Dispatch<SetStateAction<string | undefined>>
) => {
  const reader = new FileReader();

  if (file) {
    const reader = new FileReader();
    reader.onload = async (event) => {
      setState(event.target?.result as string);
    };

    reader.readAsDataURL(file);
  } else setState(null);
};
