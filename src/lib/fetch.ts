import { Services } from "@prisma/client";
import { toast } from "react-hot-toast";
import { getURL } from "./getURL";

// create service
export const createService = async (data: any, onSuccess: () => void) => {
  const response = await fetch(`${getURL("/api/crud/services")}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // if exist
  if (response.status == 409) {
    // toast that alreadey exist this service
    toast.error("Service is already exist!");
  }
  // if success
  if (response.ok) {
    // toast appear on success
    toast.success("Alhamdulillah. New service Created successfully!");
    // onSuccess run
    onSuccess();
  }
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
export const fetchGET = async (path: string, errorMessage: string) => {
  const url = getURL(path);
  try {
    const response = await fetch(url);
    return response;
  } catch (error) {
    throw new Error(errorMessage);
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
export const deleteService = async (id: number) => {
  const response = await fetch(`${getURL("/api/crud/services")}/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    toast.success("Deleted Service Successfully!");
  }
  return response;
};

export const POSTFetchToOrigin = async (path: string, data: any) => {
  const url = getURL(path);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    toast.success("Created New Category Successfully!");
  } else {
    toast.error("Something went wrong! Category create failed!");
  }
  return response;
};
