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
import { deleteService, getServicebyID } from "@/lib/fetch";
import { useStatesContext } from "@/context/StatesProvider";
import { copyToClipboard } from "@/lib/utils";

interface PopupOptionsProps {
  id: number;
}

const PopupOptions: FC<PopupOptionsProps> = ({ id }) => {
  const { setServicesFetchStatus, setOpenUpdateService, setSelectedService } =
    useStatesContext();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal className="text-gray-500 hover:text-gray-700" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              copyToClipboard(id.toString(), "service ID copied to clipboard!")
            }
          >
            Copy service ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              // get current service
              getServicebyID(id)
                .then((response) => response.json())
                .then((data) => setSelectedService(data))
                .then(() => setOpenUpdateService(true)); // open service form
            }}
          >
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              deleteService(id).then(() =>
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
