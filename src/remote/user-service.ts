import { appClient } from "./app-client";

export const register = async (userInfo:object) => {
    return await appClient.post("/users/registration",userInfo);
}