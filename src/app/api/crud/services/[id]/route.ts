import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Services } from "@prisma/client";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    // get that unique services
    const service = await db.services.findUnique({
      where: { id: parseInt(id) },
    });

    if (service) return new Response(JSON.stringify(service), { status: 200 });

    return new Response("service not found!", { status: 404 });
  } catch (error) {
    return new Response("error", { status: 500 });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    // get data from admin
    const { id } = params;
    const newData = (await req.json()).data;

    // update the data
    const updatedData = await db.services.update({
      where: { id: parseInt(id) },
      data: { name: newData.name, author: newData.author },
    });
    return new Response("ok", { status: 201 });
  } catch (error) {
    return new Response("error", { status: 500 });
  }
};
