// export const handleAxiosError = (error) => {
//   if (error.response && error.response.data) {
//     return {
//       message: error.response.data.message || error.message || "An error occurred",
//       status: error.response.status,
//       code: error.code || null,
//       data: error.response.data,
//     };
//   } else if (error.request) {
//     return {
//       message: error.message || "No response from server. Please check your network.",
//       status: null,
//       code: error.code || null,
//       data: null,
//     };
//   } else {
//     return {
//       message: error.message || "Unexpected error occurred",
//       status: null,
//       code: error.code || null,
//       data: null,
//     };
//   }
// };

import { toast } from "sonner";

export const handleApiError = (error) => {
  if (error.response) {
    const errorData = error.response?.data || {};
    if (typeof errorData === "object" && !Array.isArray(errorData)) {
      for (const [field, messages] of Object.entries(errorData)) {
        if (Array.isArray(messages)) {
          toast.error(`${field}: ${messages.join(", ")}`);
        } else {
          toast.error(`${field}: ${messages}`);
        }
      }
    } else if (typeof errorData === "string") {
      toast.error(errorData);
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  } else if (error.request) {
    toast.error(
      "No response from the server. Please check your internet connection."
    );
  } else {
    toast.error("An unexpected error occurred. Please try again.");
  }
};
