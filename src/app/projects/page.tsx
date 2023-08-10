import TitleBar from "@/components/TitleBar";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <div>
        <TitleBar title="Projects" description="manage your Projects" />
      </div>
      <div></div>
    </div>
  );
};

export default page;
