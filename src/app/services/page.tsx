import AddDialog from "@/components/AddDialog";
import AddServiceForm from "@/components/AddServiceForm";
import TitleBar from "@/components/TitleBar";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <TitleBar title="Services" description="Manage your services">
        <AddDialog
          triggerText="+ Add New"
          tittle="Create Service"
          description="Create a new service for manage."
        >
          <AddServiceForm />
        </AddDialog>
      </TitleBar>
    </div>
  );
};

export default page;
