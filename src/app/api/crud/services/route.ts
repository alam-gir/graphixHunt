import { db } from "@/lib/db";
import { Services } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // get data from req
    const serviceData: Services = await req.json();
    // search on services if already have then inform
    const services = await db.services.findMany();
    for (let x of services) {
      if (x.name == serviceData.name)
        return new Response("conflict", { status: 409 });
    }
    // store services
    const service = await db.services.create({
      data: {
        name: serviceData.name,
        author: serviceData.author,
      },
    });
    return new Response("success", { status: 201 });
  } catch (error) {
    return new Response("create faild!", { status: 424 });
  }
};
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    // get services from db
    const services = await db.services.findMany();

    // return all services
    return new Response(JSON.stringify(services), { status: 200 });
  } catch (error) {
    return new Response("error", { status: 500 });
  }
};
