import { signIn } from "next-auth/react";

interface Credetials {
  email: string;
  password: string;
}

export const signInWithCredentials = async (data: Credetials) => {
  return await signIn("credentials", {
    redirect: false,
    ...data,
  });
};
