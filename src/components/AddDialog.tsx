import { Dispatch, FC, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface AddDialogProps {
  triggerText?: string;
  tittle: string;
  description: string;
  isOpen?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const AddDialog: FC<AddDialogProps> = ({
  triggerText,
  tittle,
  description,
  isOpen,
  setOpen,
  children,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {triggerText == undefined ? null : (
        <DialogTrigger className="h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          {triggerText}
        </DialogTrigger>
      )}
      <DialogContent className="bg-green-400">
        <DialogHeader>
          <DialogTitle>{tittle}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
