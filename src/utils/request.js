import { ElAlert, ElMessage } from "element-plus";

const BASE_URL = "http://localhost:9082";
const TIMEOUT = 10000;
const MAX_RETRIES = 3;

// 请求队列管理
const pendingRequests = new Map();

// 生成请求Key
const getRequestKey = (url, options) => {
  // 对于GET请求，将查询参数也纳入请求键的计算
  if ((options.method || "GET") === "GET" && options.params) {
    return `${options.method || "GET"}_${url}_${JSON.stringify(options.params)}`;
  }
  return `${options.method || "GET"}_${url}_${JSON.stringify(options.body || {})}`;
};

// 请求重试函数
const retryRequest = async (url, options, retries = 0) => {
  try {
    return await request(url, options);
  } catch (error) {
    if (retries < MAX_RETRIES && error.name !== "AbortError") {
      return await retryRequest(url, options, retries + 1);
    }
    throw error;
  }
};

const request = async (url, options = {}) => {
  const timeout = options.timeout || TIMEOUT;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  // 检查是否存在相同请求
  const requestKey = getRequestKey(url, options);
  if (pendingRequests.has(requestKey)) {
    controller.abort();
    throw new Error("重复请求已被取消");
  }

  try {
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
          ?.content,
      },
      signal: controller.signal,
    };
    if (options.params) {
      const query = new URLSearchParams(options.params).toString();
      url += (url.includes('?') ? '&' : '?') + query;
    }
    
    // 合并headers，确保自定义headers不被覆盖
    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    if (options.data && !mergedOptions.body) {
      mergedOptions.body = JSON.stringify(options.data);
    }

    // 如果是FormData，不设置Content-Type
    if (mergedOptions.body instanceof FormData) {
      delete mergedOptions.headers["Content-Type"];
    }

    // 添加请求到队列
    pendingRequests.set(requestKey, controller);

    const response = await fetch(`${BASE_URL}${url}`, mergedOptions);

    // 处理不同的响应状态
    switch (response.status) {
      case 401:
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("登录已过期");
      case 403:
        throw new Error("没有权限访问");
      case 429:
        throw new Error("请求过于频繁");
    }

    // 尝试解析JSON，如果失败则返回原始响应
    let data;
    try {
      data = await response.json();
    } catch (e) {
      if (!response.ok) {
        throw new Error(`请求失败: ${response.status}`);
      }
      return response;
    }

    if (!response.ok) {
      throw new Error(data.message || `请求失败: ${response.status}`);
    }

    // 添加类型检查
    if (typeof data === 'object' && data !== null) {
      if ("data" in data) {
        return data["data"];
      }
    }
    return data;
  } catch (error) {
    const errorMessage = error.message || "未知错误";
    console.error(`请求失败: ${url}`, errorMessage);

    if (error.name === "AbortError") {
      throw new Error("请求超时");
    }

    // 对于404错误，提供更友好的错误信息
    if (errorMessage.includes("404")) {
      throw new Error("请求的资源不存在");
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
    // 从队列中移除请求
    pendingRequests.delete(requestKey);
  }
};

export default request;
