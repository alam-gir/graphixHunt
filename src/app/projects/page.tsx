import TitleBar from "@/components/TitleBar";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <TitleBar title="Projects" description="manage your Projects" />
    </div>
  );
};

export default page;
