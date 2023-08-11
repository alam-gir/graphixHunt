import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { fetchDELETE, getServicebyID } from "@/lib/fetch";
import { useStatesContext } from "@/context/StatesProvider";
import { copyToClipboard } from "@/lib/utils";

interface CategoriesPopupOptionsProps {
  id: string;
}

const CategoriesPopupOptions: FC<CategoriesPopupOptionsProps> = ({ id }) => {
  const { setCategoryFetchStatus, setOpenUpdateService, setSelectedService } =
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
              copyToClipboard(
                id.toString(),
                "Categories ID copied to clipboard!"
              )
            }
          >
            Copy Categories ID
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
              fetchDELETE(id, "/api/crud/categories").then(() =>
                setCategoryFetchStatus((prev) => !prev)
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

export default CategoriesPopupOptions;
