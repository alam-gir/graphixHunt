import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Dispatch, FC, SetStateAction } from "react";

interface AlertTriggerProps {
  heading: string;
  description: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
  onConfirm: any;
}

const AlertTrigger: FC<AlertTriggerProps> = ({
  heading,
  description,
  defaultOpen,
  open,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <AlertDialog
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{heading}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertTrigger;
