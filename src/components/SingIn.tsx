import { FC } from "react";
import { signIn } from "next-auth/react";
import SingInForm from "./SingInForm";

interface SingInProps {}

const SingIn: FC<SingInProps> = ({}) => {
  const login = async () => {
    // const res = await signIn("credentials", {
    //   email: "admin@gmail.com",
    //   password: "admin",
    //   redirect: false,
    // });
  };
  return (
    <div className="h-screen w-screen flex">
      <div className=" h-screen w-screen md:h-auto md:w-[45rem] m-auto rounded-md shadow-purple">
        <div className="container bg-gradient-to-r from-[#9E8EFF] to-[#DED3FD] h-80 flex flex-col justify-center rounded-md">
          <h1 className="text-4xl md:text-5xl font-medium capitalize text-center text-white">
            login
          </h1>
          <h4 className="text-sm md:text-md text-center tracking-wide leading-6 md:leading-10 text-[#F0F0F0]">
            Only admin can access the dashboard.
          </h4>
        </div>
        <div className=" px-8 py-16 md:pt-16 md:pb-32 md:px-32 ml-auto mr-auto">
          <SingInForm />
        </div>
      </div>
    </div>
  );
};

export default SingIn;
