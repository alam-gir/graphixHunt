import { FC, HTMLAttributes } from "react";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  open?: boolean;
}

const Modal: FC<ModalProps> = ({ children, open = false, ...props }) => {
  return <>{open && <div {...props}>{children}</div>}</>;
};

export default Modal;
