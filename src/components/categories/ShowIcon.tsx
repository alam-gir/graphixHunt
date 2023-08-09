import { readFileAsURL } from "@/lib/utils";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface ShowIconProps {
  iconFile: File | undefined;
}

const ShowIcon: FC<ShowIconProps> = ({ iconFile }) => {
  const [imageDataURL, setImageDataURL] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    readFileAsURL(iconFile, setImageDataURL);
  }, [iconFile]);
  return (
    <div className="h-[100px] aspect-auto">
      {imageDataURL ? (
        <img src={imageDataURL} className="h-full w-full" alt="icon_image" />
      ) : null}
    </div>
  );
};

export default ShowIcon;
