import { getCurrentUser } from "@/services/user.service";

/**
 * 获取当前用户信息
 * @returns 
 */
export const loadUserInfo = async () => {
    const { result } = await getCurrentUser();
    return result.user;
}