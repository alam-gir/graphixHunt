import TitleBar from "@/components/TitleBar";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <TitleBar title="Categories" description="manage your categories" />
    </div>
  );
};

export default page;
