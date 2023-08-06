"use client";
import AddDialog from "@/components/AddDialog";
import AddServiceForm from "@/components/AddServiceForm";
import ServicesTable from "@/components/Table/ServicesTable";
import TitleBar from "@/components/TitleBar";
import { useStatesContext } from "@/context/StatesProvider";
import { FC } from "react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { setOpenCreateService, isOpenCreateService } = useStatesContext();

  return (
    <div>
      <div>
        <TitleBar title="Services" description="Manage your services">
          <AddDialog
            triggerText="+ Add New"
            tittle="Create Service"
            description="Create a new service for manage."
            isOpen={isOpenCreateService}
            setOpen={setOpenCreateService}
          >
            <AddServiceForm />
          </AddDialog>
        </TitleBar>
      </div>
      <div className="px-16">
        <ServicesTable />
      </div>
    </div>
  );
};

export default Page;
