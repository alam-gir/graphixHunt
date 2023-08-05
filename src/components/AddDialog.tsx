import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface AddDialogProps {
  triggerText: string;
  tittle: string;
  description: string;
  children: React.ReactNode;
}

const AddDialog: FC<AddDialogProps> = ({
  triggerText,
  tittle,
  description,
  children,
}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          {triggerText}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tittle}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddDialog;
