import { db } from "@/lib/db";
import { Services } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    // get data from req
    const serviceData: Services = await req.json();

    // store services
    const serviceCreated = await db.services.create({
      data: {
        name: serviceData.name,
        author: serviceData.author,
      },
    });

    return new Response("success", { status: 201 });
  } catch (error: any) {
    return new Response("error", { status: 500 });
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

export const DELETE = async (req: NextRequest) => {
  try {
    const id = await req.json();
    const deletdService = await db.services.delete({ where: { id } });
    return new Response("ok", { status: 200 });
  } catch (error: any) {
    return new Response("error", { status: 500 });
  }
};
