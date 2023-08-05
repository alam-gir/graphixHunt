"use client";
import { FC } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import AddServiceForm from "./AddServiceForm";

interface TitleBarProps {
  title: string;
  description: string;
}

const TitleBar: FC<TitleBarProps> = ({ title, description }) => {
  return (
    <div className="px-16 py-4 flex justify-between border-b">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm ">{description}</p>
      </div>
      <div>
        <Dialog>
          <DialogTrigger className="h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            + Add New
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Service</DialogTitle>
              <DialogDescription>
                Create a new service for manage.
              </DialogDescription>
            </DialogHeader>
            <AddServiceForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TitleBar;
