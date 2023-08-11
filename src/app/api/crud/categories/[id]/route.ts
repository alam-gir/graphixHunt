import { deleteFileFromCloudinary } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

// ! get request
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    // find the catergory with given id and serve to client side
    const category = await db.categories.findUnique({
      where: { id: params.id },
    });
    if (category)
      return new Response(JSON.stringify(category), { status: 200 });

    return new Response("category not found!", { status: 404 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

// ! put request
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  return new Response("ok");
};

// ! delete request
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    //delete category
    const deleteCategory = await db.categories.delete({
      where: { id: params.id },
      include: { categoriesIcon: true },
    });
    // if confirm deleted category then delete image from coudinary with public id
    const deleteIcon = await deleteFileFromCloudinary(
      deleteCategory.categoriesIcon?.public_id!
    );
    return new Response("ok", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
