import { useState } from "react";
import { router } from "expo-router";
import { signup } from "@/services/auth";
import { useForm } from "react-hook-form";
import * as SecureStore from "expo-secure-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "react-native-toast-notifications";
import { signupSchema, SignupSchemaData } from "@/utils/schemas";
import { AxiosError } from "axios";
import { useUserStore } from "@/store/user-store";
import axiosInstance from "@/libs/axios";
import { useUserTokenStore } from "@/store/user-token";

export const useSignup = () => {
  const toast = useToast();
  const { setUser } = useUserStore();
  const { setToken } = useUserTokenStore();
  const [loading, setLoading] = useState(false);
  const form = useForm<SignupSchemaData>({ resolver: zodResolver(signupSchema) });

  const onSubmit = (data: SignupSchemaData) => {
    setLoading(true);
    signup(data)
      .then((res) => {
        setUser(res.data);
        SecureStore.setItem("token", res.data.token);
        setToken(res.data.token);
        axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
        toast.show("ثبت نام با موفقیت انجام شد", { type: "success" });
        router.replace("/");
      })
      .catch((err: AxiosError<{ message: string }>) => {
        toast.show(err.response?.data.message || err.message, { type: "danger" });
      })
      .finally(() => setLoading(false));
  };

  return {
    onSubmit,
    loading,
    form,
  };
};
