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
import { signInWithCredentials } from "@/lib/signin";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email({ message: "This is not a valid email." }),
  password: z
    .string()
    .min(5, { message: "Password required minimum length of 5." })
    .max(20, { message: "password max length of 20." }),
});

interface SingInFormProps {}

const SingInForm: FC<SingInFormProps> = ({}) => {
  //loading state
  const [isLoading, setLoading] = useState<boolean>(false);

  //router for navigate after signin
  const router = useRouter();

  // defining form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //defining submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      //start loading
      setLoading(true);

      const signinRes = await signInWithCredentials(values);
      if (!signinRes?.error) {
        toast.success("Alhamdulillah.Logged in successfully!.");

        // replace sign-in link to home
        router.replace("/");
      }
      if (signinRes?.error === "404" || signinRes?.error === "401")
        toast.error("Failed to login.Enter valid email and password.");
    } catch (error) {
      toast.error("Failed to login, Maybe server error! please try again.");
    } finally {
      // stop loading
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
        {/* email form field  */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* password form field  */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button
            type="submit"
            variant={"default"}
            disabled={isLoading}
            className=" shadow-purple bg-gradient-to-r from-[#9E8EFF] hover:from-100% to-[#DED3FD]"
          >
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center p-2 ml-2">
                <Loader color="fill-gray-400" />
              </div>
            ) : (
              "Sign-in"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SingInForm;
