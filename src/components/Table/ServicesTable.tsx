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
import { fetchServices } from "@/lib/fetch";

interface ServicesTableProps {}

//servicesApiUrl
const servicesApiURL = `${window.origin}/api/crud/services`;

const ServicesTable: FC<ServicesTableProps> = ({}) => {
  const { servicesFetchStatus } = useStatesContext();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [services, setServices] = useState<Services[] | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchServices(servicesApiURL)
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
      })
      .catch((error) => setError(true))
      .finally(() => setLoading(false));
  }, [servicesFetchStatus]);

  // return if error!
  if (error)
    return (
      <div>something went wrong. Please check your internet connection.</div>
    );

  // return if fetching
  if (isLoading) return <div>loading.........</div>;

  // return if data is loaded
  return (
    <div>
      <Table>
        <TableCaption>A list of your services.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Created by</TableHead>
            <TableHead>Created At</TableHead>
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
                <TableCell className="font-medium">{id}</TableCell>
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
