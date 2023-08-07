"use client";
import { FC } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

interface NavbarProviderProps {
  children: React.ReactNode;
}

const NavbarProvider: FC<NavbarProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const returnNavbar = pathname == "/sign-in" ? null : <Navbar />;
  return (
    <>
      {returnNavbar}
      {children}
    </>
  );
};

export default NavbarProvider;
