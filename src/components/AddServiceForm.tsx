"use client";

import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "./ui/Loader";
import { useSession } from "next-auth/react";
import { useStatesContext } from "@/context/StatesProvider";
import { createService } from "@/lib/fetch";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name required minimum length of 3." })
    .max(20, { message: "Name max length of 20." }),
});

interface AddServiceFormProps {}

const AddServiceForm: FC<AddServiceFormProps> = ({}) => {
  // get serviceStatus for refetching on success
  const { setServicesFetchStatus, setOpenCreateService } = useStatesContext();
  //loading state
  const [isLoading, setLoading] = useState<boolean>(false);

  // getsession for data set with author name
  const { data } = useSession();

  // defining form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  //defining submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const modifiedValues = {
      ...values,
      author: data?.user.name,
    };
    const APIUrlservice = `${window.origin}/api/crud/services`;
    try {
      //start loading
      setLoading(true);

      //create service
      createService(APIUrlservice, modifiedValues).then((response) => {
        // change service status for refetch
        setServicesFetchStatus((prev) => !prev);
        // change status of isopenCreate service for closing form on success
        setOpenCreateService(false);
      });
    } finally {
      // stop loading
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
        {/* Service name input field  */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Service name</FormLabel> */}
              <FormControl>
                <Input placeholder="service name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button type="submit" variant={"default"} disabled={isLoading}>
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center p-2 ml-2">
                <Loader color="fill-gray-400" />
              </div>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddServiceForm;
