"use client";
import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Services } from "@prisma/client";

//types of context values
interface StatesContextTypes {
  selectedService: Services | null;
  setSelectedService: Dispatch<SetStateAction<Services | null>>;

  isOpenCreateService: boolean;
  setOpenCreateService: Dispatch<SetStateAction<boolean>>;

  isOpenUpdateService: boolean;
  setOpenUpdateService: Dispatch<SetStateAction<boolean>>;

  isOpenCategories: boolean;
  setOpenCategories: Dispatch<SetStateAction<boolean>>;

  isOpenUpdateCategories: boolean;
  setOpenUpdateCategories: Dispatch<SetStateAction<boolean>>;

  isOpenAlertDialog: boolean;
  setOpenAlertDialog: Dispatch<SetStateAction<boolean>>;

  servicesFetchStatus: boolean;
  setServicesFetchStatus: Dispatch<SetStateAction<boolean>>;

  categoryFetchStatus: boolean;
  setCategoryFetchStatus: Dispatch<SetStateAction<boolean>>;
}

// default value for context
const defaultValues: StatesContextTypes = {
  selectedService: null,
  setSelectedService: (): Services | null => null,

  isOpenCreateService: false,
  setOpenCreateService: (): boolean => false,

  isOpenUpdateService: false,
  setOpenUpdateService: (): boolean => false,

  isOpenCategories: false,
  setOpenCategories: (): boolean => false,

  isOpenUpdateCategories: false,
  setOpenUpdateCategories: (): boolean => false,

  isOpenAlertDialog: false,
  setOpenAlertDialog: (): boolean => false,

  servicesFetchStatus: false,
  setServicesFetchStatus: (): boolean => false,

  categoryFetchStatus: false,
  setCategoryFetchStatus: (): boolean => false,
};

// create context
const StateContext = createContext<StatesContextTypes>(defaultValues);

// types for States prover props
interface StatesProviderProps {
  children: React.ReactNode;
}

// define statesProver
const StatesProvider: FC<StatesProviderProps> = ({ children }) => {
  // values states
  const [isOpenCreateService, setOpenCreateService] = useState<boolean>(false);
  const [isOpenUpdateService, setOpenUpdateService] = useState<boolean>(false);

  const [isOpenCategories, setOpenCategories] = useState<boolean>(false);
  const [isOpenUpdateCategories, setOpenUpdateCategories] =
    useState<boolean>(false);

  const [isOpenAlertDialog, setOpenAlertDialog] = useState<boolean>(false);

  const [servicesFetchStatus, setServicesFetchStatus] =
    useState<boolean>(false);

  const [categoryFetchStatus, setCategoryFetchStatus] =
    useState<boolean>(false);

  const [selectedService, setSelectedService] = useState<Services | null>(null);

  //values for pass
  const values = {
    selectedService,
    setSelectedService,

    isOpenCreateService,
    setOpenCreateService,

    isOpenUpdateService,
    setOpenUpdateService,

    isOpenCategories,
    setOpenCategories,

    isOpenUpdateCategories,
    setOpenUpdateCategories,

    isOpenAlertDialog,
    setOpenAlertDialog,

    servicesFetchStatus,
    setServicesFetchStatus,

    categoryFetchStatus,
    setCategoryFetchStatus,
  };
  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
};

export const useStatesContext = () => {
  return useContext(StateContext);
};
export default StatesProvider;
