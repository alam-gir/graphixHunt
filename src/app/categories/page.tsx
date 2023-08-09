import TitleBar from "@/components/TitleBar";
import CategoriesForm from "@/components/categories/CategoriesForm";
import { CategoriesFormModal } from "@/components/categories/CategoriesFormModal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";
interface CategoriesPageProps {}

const CategoriesPage: FC<CategoriesPageProps> = ({}) => {
  return (
    <div>
      <div>
        <TitleBar title="Categories" description="manage your categories">
          <Link href={"/categories/?categoriesForm=true"}>
            <Button>+ Add Categories</Button>
          </Link>
        </TitleBar>
        <CategoriesFormModal onOverlayClose={true}>
          <CategoriesForm></CategoriesForm>
        </CategoriesFormModal>
      </div>
      <div>here will be show all data in table</div>
    </div>
  );
};

export default CategoriesPage;
