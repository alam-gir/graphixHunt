"use client";
import { FC, useEffect, useState } from "react";
import CategoriesTable from "./Table";
import { Button } from "../ui/button";
import { Categories } from "@prisma/client";
import { fetchGET } from "@/lib/fetch";
import { useStatesContext } from "@/context/StatesProvider";
import { changeSkip } from "@/lib/utils";
import { PaginationOpt } from "@/types/types";
import Loader from "../ui/Loader";

interface CategoriesBodyProps {}

const CategoriesBody: FC<CategoriesBodyProps> = ({}) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { categoryFetchStatus } = useStatesContext();
  const [categories, setCategories] = useState<Categories[]>();
  const [categoriesLength, setCategoriesLength] = useState<number>();
  const [paginationOpt, setPaginationOpt] = useState<PaginationOpt>({
    skip: 0,
    take: 10,
  });

  useEffect(() => {
    // start loading
    setLoading(true);
    fetchGET(
      `/api/crud/categories/?skip=${paginationOpt?.skip}&take=${paginationOpt?.take}`,
      "Categories fetched failed!"
    )
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
        setCategoriesLength(data.totalDataLength);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [paginationOpt, categoryFetchStatus]);

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
