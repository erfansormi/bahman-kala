import axiosInstance from "@/libs/axios"
import { User } from "@/types/user"
import { LoginSchemaData, SignupSchemaData } from "@/utils/schemas"

export const signup = ({ email, password, first_name, last_name }: SignupSchemaData) => (
    axiosInstance.post("/api/v1/users/signup", { email, password, first_name, last_name })
)

export const login = ({ email, password }: LoginSchemaData) => (
    axiosInstance.post("/api/v1/users/login", { email, password })
)

export const getUserInfo = () => (
    axiosInstance.get<User>("/api/v1/users/me")
)
