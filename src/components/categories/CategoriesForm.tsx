"use client";

import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/Loader";
import { useSession } from "next-auth/react";
import { useStatesContext } from "@/context/StatesProvider";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Textarea } from "../ui/textarea";
import { fetchServices } from "@/lib/fetch";
import { Services } from "@prisma/client";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name required minimum length of 3." })
    .max(20, { message: "Name max length of 20." }),
  type: z.string(),
  archived: z.boolean().default(false),
  featured: z.boolean().default(true),
  description: z
    .string()
    .min(10, {
      message: "description must be at least 10 characters.",
    })
    .max(60, {
      message: "description must not be longer than 60 characters",
    }),
});
interface CategoriesFormProps {
  previousValue?: { name: string };
  submitHandler: (data: any) => Promise<void>;
}

const CategoriesForm: FC<CategoriesFormProps> = ({
  previousValue,
  submitHandler,
}) => {
  // get serviceStatus for refetching on success
  const { setServicesFetchStatus, setOpenCreateService } = useStatesContext();
  // services state
  const [services, setServices] = useState<Services[] | null>(null);
  //loading state
  const [isLoading, setLoading] = useState<boolean>(false);

  // getsession for data set with author name
  const { data } = useSession();

  // defining form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: previousValue
      ? previousValue
      : {
          name: "",
          type: ",",
          archived: false,
          featured: true,
          description: "",
        },
  });

  //defining submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const modifiedValues = {
      ...values,
      author: data?.user.name,
    };

    try {
      // start Loading
      setLoading(true);
      //create service then close the form
      // submitHandler(modifiedValues).then(() => setOpenCreateService(false));
      console.log({ modifiedValues });
    } finally {
      // stop loading
      setLoading(false);
    }
  };
  fetchServices()
    .then((response) => response.json())
    .then((data) => setServices(data));

  // select items by services
  const selectItems = services?.map((service, index) => {
    return (
      <>
        <SelectItem key={index} value={service.name}>
          {service.name}
        </SelectItem>
      </>
    );
  });
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
              <Label>name</Label>
              <FormControl>
                <Input placeholder="categories name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* service type field  */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>{selectItems}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Archived or not checkbox field  */}
        <FormField
          control={form.control}
          name="archived"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={
                    field.onChange as (checked: CheckedState) => void
                  }
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Archived</FormLabel>
                <FormDescription>
                  This Category will be not appear on anywhere!
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        {/* Featured or not checkbox field  */}
        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={
                    field.onChange as (checked: CheckedState) => void
                  }
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Featured</FormLabel>
                <FormDescription>
                  This Category will be appear in home page!
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        {/* description form field  */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little description about this category"
                  className="resize-none"
                  {...field}
                />
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

export default CategoriesForm;
