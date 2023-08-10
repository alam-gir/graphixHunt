import { readFileAsURL } from "@/lib/utils";
import { FC, useEffect, useState } from "react";

interface ShowIconProps {
  iconDataURL: string | undefined;
}

const ShowIcon: FC<ShowIconProps> = ({ iconDataURL }) => {
  return (
    <div className="h-[100px] aspect-auto">
      {iconDataURL ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={iconDataURL} className="h-full w-full" alt="icon_image" />
      ) : null}
    </div>
  );
};

export default ShowIcon;
