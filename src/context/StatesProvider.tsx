"use client";
import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

//types of context values
interface StatesContextTypes {
  isOpenCreateService: boolean;
  setOpenCreateService: Dispatch<SetStateAction<boolean>>;

  isOpenAlertDialog: boolean;
  setOpenAlertDialog: Dispatch<SetStateAction<boolean>>;

  servicesFetchStatus: boolean;
  setServicesFetchStatus: Dispatch<SetStateAction<boolean>>;
}

// default value for context
const defaultValues: StatesContextTypes = {
  isOpenCreateService: false,
  setOpenCreateService: (): boolean => false,

  isOpenAlertDialog: false,
  setOpenAlertDialog: (): boolean => false,

  servicesFetchStatus: false,
  setServicesFetchStatus: (): boolean => false,
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
  const [isOpenAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [servicesFetchStatus, setServicesFetchStatus] =
    useState<boolean>(false);

  //values for pass
  const values = {
    isOpenCreateService,
    setOpenCreateService,
    isOpenAlertDialog,
    setOpenAlertDialog,
    servicesFetchStatus,
    setServicesFetchStatus,
  };
  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
};

export const useStatesContext = () => {
  return useContext(StateContext);
};
export default StatesProvider;
