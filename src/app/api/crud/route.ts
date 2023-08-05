import { db } from "@/lib/db";
import { Services } from "@prisma/client";
import { NextRequest } from "next/server";
export const POST = async (req: NextRequest) => {
  try {
    // get data from req
    const serviceData: Services = await req.json();

    console.log(serviceData);
    // store services
    const serviceCreated = await db.services.create({
      data: {
        name: serviceData.name,
        author: serviceData.author,
      },
    });
    console.log(serviceCreated);

    return new Response("success", { status: 201 });
  } catch (error) {
    console.log(error.message);
    return new Response("error", { status: 500 });
  }
  return new Response("success", { status: 200 });
};
