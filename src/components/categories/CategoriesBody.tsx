"use client";
import { FC, useEffect, useState } from "react";
import CategoriesTable from "./Table";
import { Button } from "../ui/button";
import { Categories } from "@prisma/client";
import { fetchGET } from "@/lib/fetch";
import { useStatesContext } from "@/context/StatesProvider";
import { changeSkip } from "@/lib/utils";
import { PaginationOpt } from "@/types/types";

interface CategoriesBodyProps {}

const CategoriesBody: FC<CategoriesBodyProps> = ({}) => {
  const { categoryFetchStatus } = useStatesContext();
  const [categories, setCategories] = useState<Categories[]>();
  const [categoriesLength, setCategoriesLength] = useState<number>();
  const [paginationOpt, setPaginationOpt] = useState<PaginationOpt>({
    skip: 0,
    take: 10,
  });

  useEffect(() => {
    fetchGET(
      `/api/crud/categories/?skip=${paginationOpt?.skip}&take=${paginationOpt?.take}`,
      "Categories fetched failed!"
    )
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
        setCategoriesLength(data.totalDataLength);
      });
  }, [paginationOpt, categoryFetchStatus]);
  return (
    <div>
      <div className=" min-h-[39rem]">
        {categories && <CategoriesTable categories={categories} />}
      </div>
      <div className="flex justify-end py-8 gap-4">
        <Button
          variant="outline"
          onClick={() =>
            changeSkip("prev", setPaginationOpt, categoriesLength! + 1)
          }
          disabled={paginationOpt.skip == 0 ?? true}
        >
          Prev
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            changeSkip("next", setPaginationOpt, categoriesLength! + 1)
          }
          disabled={
            categoriesLength! - paginationOpt.skip <= paginationOpt.take ?? true
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CategoriesBody;
