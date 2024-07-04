import axios, { type AxiosInstance, type AxiosResponse, AxiosError } from 'axios';

// 定义 AxiosResponse 的泛型类型，用于指定返回数据的类型
interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

// 创建 Axios 实例
const booksManagerEs: AxiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:8051',
  baseURL: '/book-manager-es',
  timeout: 10000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

booksManagerEs.defaults.withCredentials = true

// 请求拦截器
booksManagerEs.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加 token
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
booksManagerEs.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    // 对响应数据做些什么
    const res: AxiosResponse<ResponseData> = {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config: response.config,
    };
    if (res.data.code !== 200) {
      // 请求失败，根据实际情况处理错误
      // throw new Error(res.data.message || '请求失败');
    }
    return res;
  },
  (error: AxiosError) => {
    // 对响应错误做些什么
    // console.error('Axios Error:', error.message);
    return Promise.reject(error);
  }
);


// 创建 Axios 实例
const booksManager: AxiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:8053',
  baseURL: '/book-manager',
  timeout: 10000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

booksManager.defaults.withCredentials = true;

// 请求拦截器
booksManager.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加 token
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
booksManager.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    // 对响应数据做些什么
    const res: AxiosResponse<ResponseData> = {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config: response.config,
    };
    if (res.data.code !== 200) {
      // 请求失败，根据实际情况处理错误
      // throw new Error(res.data.message || '请求失败');
    }
    return res;
  },
  (error: AxiosError) => {
    // 对响应错误做些什么
    // console.error('Axios Error:', error.message);
    return Promise.reject(error);
  }
);

// 创建 Axios 实例
const bookChangeCuckoo: AxiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:8054',
  baseURL: '/book-change-cuckoo',
  timeout: 10000, // 设置超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

bookChangeCuckoo.defaults.withCredentials = true

// 请求拦截器
bookChangeCuckoo.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加 token
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
bookChangeCuckoo.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    // 对响应数据做些什么
    const res: AxiosResponse<ResponseData> = {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config: response.config,
    };
    if (res.data.code !== 200) {
      // 请求失败，根据实际情况处理错误
      // throw new Error(res.data.message || '请求失败');
    }
    return res;
  },
  (error: AxiosError) => {
    // 对响应错误做些什么
    // console.error('Axios Error:', error.message);
    return Promise.reject(error);
  }
);

export { booksManagerEs, booksManager, bookChangeCuckoo };
