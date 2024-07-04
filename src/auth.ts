import {jwtDecode} from 'jwt-decode';

// 检查当前是否是登录状态
export function isAuthenticated(): boolean {
  // 获取存储在 localStorage 中的 JWT token
  const token = localStorage.getItem('AuthToken');
  if (!token) {
    return false; // 如果 token 不存在，说明用户未登录
  }

  try {
    // 解析 token
    const decodedToken: any = jwtDecode(token);
    // 检查 token 是否在有效期内
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      return false; // 如果 token 已经过期，说明用户未登录
    }

    return true; // token 存在且未过期，说明用户已登录
  } catch (error) {
    return false; // 解析 token 出错，说明用户未登录
  }
}
