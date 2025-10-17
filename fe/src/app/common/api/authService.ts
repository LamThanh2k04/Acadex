import { LoginType } from "../types/authType";
import { https } from "./config";

export const loginService = (data: LoginType) => {
    return https.post("/api/auth/login", data);
}