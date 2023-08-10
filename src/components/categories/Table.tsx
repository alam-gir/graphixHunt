import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Categories } from "@prisma/client";
import { MoreHorizontalIcon } from "lucide-react";
import { FC } from "react";

interface CategoriesTablePropsType {
  categories: Categories[] | undefined;
}

const CategoriesTable: FC<CategoriesTablePropsType> = ({ categories }) => {
  const TabaleCells = categories?.map((category, index) => {
    const date = new Date(category.createdAt).toLocaleDateString();
    return (
      <TableRow key={index}>
        <TableCell className="font-medium">{category.name}</TableCell>
        <TableCell>{category.archived ? "true" : "false"}</TableCell>
        <TableCell>{category.featured ? "true" : "false"}</TableCell>
        <TableCell>{category.serviceType}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell className="text-right">
          <MoreHorizontalIcon className="h-6 w-6 text-gray-600" />
        </TableCell>
      </TableRow>
    );
  });
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Archived</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Service type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{TabaleCells}</TableBody>
      </Table>
    </>
  );
};

export default CategoriesTable;
