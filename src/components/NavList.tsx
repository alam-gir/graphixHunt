"use client";
import { navList } from "@/context/context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface NavListProps {}

const NavList: FC<NavListProps> = ({}) => {
  const pathname = usePathname();
  const List = navList.map((item, index) => {
    const isActiveLink = pathname.startsWith(item.link);
    return (
      <li
        className={`hover:text-gray-700 ${
          isActiveLink ? "text-gray-800" : "text-gray-500"
        }`}
        key={index}
      >
        <Link href={item.link}>{item.text}</Link>
      </li>
    );
  });
  return (
    <ul className="flex gap-4 items-center h-full w-full capitalize">{List}</ul>
  );
};

export default NavList;
