"use client";

import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

interface FileUploaderProps {
  onFileChange: (setState: Dispatch<SetStateAction<FileList | null>>) => null;
}

const FileUploader: FC<FileUploaderProps> = ({ onFileChange }) => {
  // changeHandler
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files || null;
    onFileChange((prev) => [selectedFiles]);
  };
  return <input type="file" name="" id="" onChange={changeHandler} multiple />;
};

export default FileUploader;
