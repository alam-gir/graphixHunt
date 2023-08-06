import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { deleteService } from "@/lib/fetch";
import { useStatesContext } from "@/context/StatesProvider";

interface PopupOptionsProps {
  id: number;
}

const PopupOptions: FC<PopupOptionsProps> = ({ id }) => {
  const { setServicesFetchStatus } = useStatesContext();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal className="text-gray-500 hover:text-gray-700" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Copy service ID</DropdownMenuItem>
          <DropdownMenuItem>Update</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              deleteService(id).then((response) =>
                setServicesFetchStatus((prev) => !prev)
              )
            }
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PopupOptions;
