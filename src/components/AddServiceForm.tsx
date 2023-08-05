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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "./ui/Loader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name required minimum length of 5." })
    .max(20, { message: "Name max length of 20." }),
});

interface AddServiceFormProps {}

const AddServiceForm: FC<AddServiceFormProps> = ({}) => {
  //loading state
  const [isLoading, setLoading] = useState<boolean>(false);

  //router for navigate after signin
  const router = useRouter();

  // defining form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  //defining submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // try {
    //   //start loading
    //   setLoading(true);
    //   if (!signinRes?.error) {
    //     toast.success("Alhamdulillah.Logged in successfully!.");
    //     // replace sign-in link to home
    //     router.replace("/");
    //   }
    //   if (signinRes?.error === "404" || signinRes?.error === "401")
    //     toast.error("Failed to login.Enter valid email and password.");
    // } catch (error) {
    //   toast.error("Failed to login, Maybe server error! please try again.");
    // } finally {
    //   // stop loading
    //   setLoading(false);
    // }
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
