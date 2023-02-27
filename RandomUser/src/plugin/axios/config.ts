import type { AxiosRequestConfig } from "axios"

export const axiosConfig: AxiosRequestConfig = {
  method: "get",
  baseURL: 'https://randomuser.me/api/',
  // url: '/api',
  headers: {
    "Content-Type": "multipart/form-data"
  },
  // 攜帶憑證
  withCredentials: false,
  // 返回資料型別
  responseType: "json"
};
