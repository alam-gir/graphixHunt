"use client";
import { FC, ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoriesFormModalProps {
  children: ReactNode;
  onOverlayClose?: boolean;
}

export const CategoriesFormModal: FC<CategoriesFormModalProps> = ({
  children,
  onOverlayClose,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const isOpenModal = params.get("categoriesForm") == "true" ? true : false;

  const closeModal = () => {
    onOverlayClose ? router.back() : "";
  };

  return (
    <div className={`${isOpenModal ? "" : "hidden"} h-screen w-screen fixed`}>
      <div>
        <div
          onClick={(e) => closeModal()}
          className="fixed inset-0 bg-black/40"
        />

        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded drop-shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
