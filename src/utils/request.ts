import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 检查 token 是否存在且未过期
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.push("/login");
          break;
        case 403:
          // 权限不足
          console.error("权限不足");
          break;
        case 404:
          // 资源不存在
          console.error("请求的资源不存在");
          break;
        case 500:
          // 服务器错误
          console.error("服务器错误");
          break;
        default:
          console.error("请求失败");
      }
    }
    return Promise.reject(error);
  }
);

export default request;
