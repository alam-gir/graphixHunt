import { PaginationOpt } from "@/types/types";
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
  } else setState(undefined);
};

// categories pagination

export const changeSkip = (
  action: "next" | "prev",
  setPaginationOpt: Dispatch<SetStateAction<PaginationOpt>>,
  length: number
) => {
  if (action == "next") {
    setPaginationOpt((prev) => {
      let endOfPage: number = length - prev.skip;
      return endOfPage <= prev.take
        ? { ...prev, skip: prev.skip }
        : { ...prev, skip: prev.skip + prev.take };
    });
  }
  if (action == "prev") {
    setPaginationOpt((prev) => {
      return prev.skip == prev.take || prev.skip == 0
        ? { ...prev, skip: 0 }
        : { ...prev, skip: prev.skip - prev.take };
    });
  }
};
