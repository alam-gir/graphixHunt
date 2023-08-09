"use client";
import { ChangeEvent, FC, SetStateAction, useState } from "react";
import FileUploader from "./FileUploader";
import { getFilesFromInput } from "@/lib/utils";

interface InputImageProps {}

const InputImage: FC<InputImageProps> = ({}) => {
  const [images, setImages] = useState<FileList | null>(null);

  return <div></div>;
};

export default InputImage;
