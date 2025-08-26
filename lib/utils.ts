import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//handle exceptions
// utils/errorHandler.ts
import axios from "axios";
import { toast } from "react-hot-toast";

export function handleApiError(err: unknown, fallbackMessage = "Something went wrong") {
  if (axios.isAxiosError(err)) {
    toast.error(
        err.response?.data?.message ||
        err.response?.statusText ||
        fallbackMessage
    );
  } else if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error(fallbackMessage);
  }
}
