import { db } from "@/lib/db";
import { uploadFileToCloudinary } from "@/lib/cloudinary";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const skipString = searchParams.get("skip");
  const takeString = searchParams.get("take");

  try {
    //get all categories
    const categories = await db.categories.findMany({
      include: {
        categoriesIcon: {
          select: {
            downloadLink: true,
            publicId: true,
          },
        },
      },
    });

    if (skipString && takeString) {
      const skip = parseInt(skipString!);
      const take = parseInt(takeString!);
      //get categories
      const paginatedCategories = await db.categories.findMany({
        include: {
          categoriesIcon: {
            select: {
              downloadLink: true,
              publicId: true,
            },
          },
        },
        skip: skip,
        take: take,
      });

      if (paginatedCategories) {
        const data = {
          categories: paginatedCategories,
          totalDataLength: categories.length,
        };
        return new Response(JSON.stringify(data), { status: 200 });
      }
      return new Response("no data found!", { status: 404 });
    }

    if (categories) {
      return new Response(JSON.stringify(categories), { status: 200 });
    } else return new Response("categories not found!", { status: 404 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 404 });
  }
};

export const POST = async (req: NextRequest) => {
  const { iconFile, ...data } = await req.json();
  try {
    //connect with coudinary & upload icon file in cloudinary
    const iconDataCloudinay = await uploadFileToCloudinary(
      iconFile,
      "graphixHunt/service_icon"
    );
    if (!iconDataCloudinay)
      return new Response("Icon Upload Faild!", { status: 403 });

    // create category and Categories icon together then iclude categoriesIcon
    try {
      const categories = await db.categories.create({
        data: {
          name: data.name,
          serviceType: data.type,
          archived: data.archived,
          featured: data.featured,
          description: data.description,
          author: data.author,
          categoriesIcon: {
            create: {
              downloadLink: iconDataCloudinay.downloadLink,
              publicId: iconDataCloudinay.public_id,
            },
          },
        },
        include: {
          categoriesIcon: {
            select: {
              downloadLink: true,
              publicId: true,
            },
          },
        },
      });
      return new Response("ok", { status: 200 });
    } catch (error) {
      return new Response("create category failed!", { status: 424 });
    }
  } catch (error) {}
  return new Response("server error!", { status: 500 });
};
