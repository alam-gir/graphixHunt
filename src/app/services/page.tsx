import TitleBar from "@/components/TitleBar";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <TitleBar title="Services" description="manage your services" />
    </div>
  );
};

export default page;
