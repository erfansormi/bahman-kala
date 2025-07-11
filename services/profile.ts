import axiosInstance from "@/libs/axios";
import { Product } from "@/types/main-page";
import { UpdateEmailData, UpdateNameData } from "@/utils/schemas";

export const editName = (data: UpdateNameData) => {
  return axiosInstance.put("/api/v1/users/edit-name", data);
};

export const editEmail = (data: UpdateEmailData) => {
  return axiosInstance.put("/api/v1/users/edit-email", data);
};

export const editPassword = (data: { current_password: string; new_password: string }) => {
  return axiosInstance.put("/api/v1/users/edit-password", data);
};

export const likeProductApi = (id: string) => {
  return axiosInstance.post<{ favorites_list: Product[] }>(`/api/v1/users/${id}/add-to-favorites`);
};
