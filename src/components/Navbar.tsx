"use client";

import { FC } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import NavList from "./NavList";
import { signOut, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import Loader from "./ui/Loader";
import { LogOut } from "lucide-react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { status, data } = useSession();
  const user = data?.user;

  return (
    <div className="w-screen h-auto bg-secondary">
      <div className="py-4 px-16 grid grid-cols-12 gap-4">
        <div className="flex flex-col w-fit col-start-1 col-end-3">
          <h1 className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r  from-[#FC01FF] to-[#06D7DF]">
            graphicsHunt
          </h1>
          <h4 className="text-sm font-normal text-right leading-3 text-transparent bg-clip-text bg-gradient-to-l from-[#06D7DF]">
            admin
          </h4>
        </div>
        <div className="col-start-3 col-end-12 w-full h-full">
          <NavList />
        </div>

        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user?.image as string} />
                <AvatarFallback>
                  {status === "authenticated" ? (
                    Array.from(user?.name as string)[0].toLocaleUpperCase()
                  ) : (
                    <Loader color="fill-gray-600" />
                  )}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>
                {user?.name?.toLocaleUpperCase()}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
