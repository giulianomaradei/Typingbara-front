import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "https://local.lo/api";

  let api = axios.create({
    baseUrl: defaultUrl,
    headers: {
      common: {},
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if ( token && !config.url.startsWith("/auth") && !config.url.startsWith("https://random-word-api.vercel.app")) {
        config.headers.common["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

return {
    provide: {
      axios: api,
    },
  };
});