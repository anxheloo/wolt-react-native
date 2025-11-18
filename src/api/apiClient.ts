import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

// Axios Client
export const HOST = "https://backend";
export const apiClient = axios.create({
  baseURL: HOST,
});
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error && error?.response?.status === 401) {
//       useAppStore.getState().updateModalSlice({
//         currentModal: "notify",
//         modalData: {
//           title: "modal.session",
//           description: "modal.sessionMsg",
//           button: "modal.sessionBtn",
//           action: () => {
//             useAppStore.getState().updateModalSlice({ currentModal: null });
//             logout();
//           },
//         },
//       });
//     }

//     return Promise.reject(error);
//   }
// );

// React Query Client
// const DEFAULT_OPTIONS: QueryClientConfig = {
//   defaultOptions: {
//     queries: {
//       staleTime: Infinity,
//       gcTime: Infinity,
//       refetchOnWindowFocus: false,
//       refetchOnMount: false,
//       refetchOnReconnect: false, //By setting it to always it takes advantage of the staleTime and always performs that
//     },
//   },
// };
export const queryClient = new QueryClient();
