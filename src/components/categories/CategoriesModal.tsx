"use client";
import { FC } from "react";
import { useStatesContext } from "@/context/StatesProvider";
import { CategoriesFormModal } from "./CategoriesFormModal";

interface CategoriesModalProps {
  children: React.ReactNode;
}

const CategoriesModal: FC<CategoriesModalProps> = ({ children }) => {
  // context
  const { isOpenCategories, setOpenCategories } = useStatesContext();
  return (
    <div>
      {/* <CategoriesForm/> */}
      <CategoriesFormModal>{children}</CategoriesFormModal>
    </div>
  );
};

export default CategoriesModal;
