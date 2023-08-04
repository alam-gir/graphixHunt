"use client";
import { FC } from "react";
import Loader from "./ui/Loader";

interface LoadingPageProps {}

const LoadingPage: FC<LoadingPageProps> = ({}) => {
  return (
    <div>
      <Loader color="fill-gray-600" />
    </div>
  );
};

export default LoadingPage;
