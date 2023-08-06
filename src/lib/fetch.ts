import { Services } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-hot-toast";

// create service
export const createService = async (apiURL: string, data: any) => {
  const response = await fetch(apiURL, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // if success
  if (response.ok) {
    // toast appear on success
    toast.success("Alhamdulillah. New service Created successfully!");
  }
};

// fething services all
export const fetchServices = async (url: string) => {
  try {
    const response = await fetch(url);
    return response;
  } catch (error) {
    throw new Error("services fetching error");
  }
};

// Delete service
export const deleteService = async (id: number) => {
  const queryURL = `http://localhost:3000/api/crud/services`;
  const response = await fetch(queryURL, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(id),
  });

  if (response.ok) {
    toast.success("Deleted Service Successfully!");
  }
  return response;
};
