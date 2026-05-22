import axios from "axios";

export const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    if (typeof responseData === "string") {
      return responseData;
    }

    if (responseData && typeof responseData === "object") {
      const typedData = responseData as {
        message?: unknown;
        error?: unknown;
      };

      if (typeof typedData.message === "string" && typedData.message.trim()) {
        return typedData.message;
      }

      if (typeof typedData.error === "string" && typedData.error.trim()) {
        return typedData.error;
      }
    }

    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};