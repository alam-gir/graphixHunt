import { FC } from "react";
import { CategoriesFormModal } from "./CategoriesFormModal";

interface FormModalProps {}

const FormModal: FC<FormModalProps> = ({}) => {
  return (
    <CategoriesFormModal>
      <div>data</div>
    </CategoriesFormModal>
  );
};

export default FormModal;
