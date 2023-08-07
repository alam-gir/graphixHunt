import { Services } from "@prisma/client";
import { toast } from "react-hot-toast";
import { getURL } from "./getURL";

// create service
export const createService = async (data: any, onFinish: () => void) => {
  const response = await fetch(`${getURL("/api/crud/services")}`, {
    method: "POST",
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

  // onFinish run
  onFinish();
};

// update service
export const updateService = async (
  data: any,
  prevService: Services,
  onSuccess: () => void
) => {
  const response = await fetch(
    `${getURL("/api/crud/services")}/${prevService.id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data, id: prevService.id }),
    }
  );

  // if success
  if (response.ok) {
    // toast appear on success
    toast.success("Alhamdulillah. Service updated successfully!");
    // onFinish run
    onSuccess();
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

// fething single service
export const getServicebyID = async (id: number) => {
  try {
    const response = await fetch(`${getURL("/api/crud/services")}/${id}`);
    return response;
  } catch (error) {
    throw new Error("services fetching error");
  }
};

// Delete service
export const deleteService = async (id: number, APIUrl: string) => {
  const response = await fetch(APIUrl, {
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
