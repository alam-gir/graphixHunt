"use client";

import { FC } from "react";
import { Button } from "./ui/button";

interface TitleBarProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const TitleBar: FC<TitleBarProps> = ({ title, description, children }) => {
  return (
    <>
      <div className="px-16 py-4 flex justify-between border-b">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm ">{description}</p>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default TitleBar;
