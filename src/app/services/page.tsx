"use client";
import AddDialog from "@/components/AddDialog";
import ServiceForm from "@/components/ServiceForm";
import ServicesTable from "@/components/Table/ServicesTable";
import TitleBar from "@/components/TitleBar";
import { useStatesContext } from "@/context/StatesProvider";
import { createService, updateService } from "@/lib/fetch";
import { FC } from "react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const {
    isOpenCreateService,
    setOpenCreateService,
    isOpenUpdateService,
    setOpenUpdateService,
    setServicesFetchStatus,
    selectedService,
  } = useStatesContext();

  return (
    <div>
      <div>
        <TitleBar title="Services" description="Manage your services">
          {/* dialog for add service  */}
          <AddDialog
            triggerText="+ Add New"
            tittle="Create Service"
            description="Create a new service for manage."
            isOpen={isOpenCreateService}
            setOpen={setOpenCreateService}
          >
            <ServiceForm
              submitHandler={(data) =>
                createService(data, () =>
                  setServicesFetchStatus((prev) => !prev)
                )
              }
            />
          </AddDialog>
          {/* dialog for add service  */}
          <AddDialog
            tittle="Create Service"
            description="Create a new service for manage."
            isOpen={isOpenUpdateService}
            setOpen={setOpenUpdateService}
          >
            <ServiceForm
              submitHandler={(data) =>
                updateService(data, selectedService!, () =>
                  setServicesFetchStatus((prev) => !prev)
                ).then(() => setOpenUpdateService(false))
              }
              previousValue={{ name: selectedService?.name! }}
            />
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
