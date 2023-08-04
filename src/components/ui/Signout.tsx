import { signOut } from "next-auth/react";
import { FC } from "react";

interface SignoutProps {}

const Signout: FC<SignoutProps> = ({}) => {
  const logout = async () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };
  return <button onClick={logout}>signout button</button>;
};

export default Signout;
