import { FC, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PopupOptions from "../PopupOptions";
import { Services } from "@prisma/client";
import { useStatesContext } from "@/context/StatesProvider";
import { fetchGET } from "@/lib/fetch";
import Loader from "../ui/Loader";

interface ServicesTableProps {}

const ServicesTable: FC<ServicesTableProps> = ({}) => {
  const { servicesFetchStatus } = useStatesContext();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [services, setServices] = useState<Services[] | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchGET("/api/crud/services", "service fetched Failed!")
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [servicesFetchStatus]);

  // return if error!
  if (error)
    return (
      <div className=" w-full text-center">
        something went wrong. Please check your internet connection.
      </div>
    );

  // return if fetching
  if (isLoading)
    return (
      <div className="w-full h-36 flex items-center justify-center">
        <Loader color="fill-gray-600" />
      </div>
    );

  // return if data is loaded
  return (
    <div>
      <Table>
        <TableCaption>A list of your services.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services?.map((service: Services, index: number) => {
            const id = service.id;
            const name = service.name;
            const author = service.author;
            const createdAt = new Date(service.createdAt).toLocaleDateString();
            return (
              <TableRow key={index}>
                <TableCell>{name}</TableCell>
                <TableCell>{author}</TableCell>
                <TableCell>{createdAt}</TableCell>
                <TableCell className="text-right">
                  <PopupOptions id={id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServicesTable;
