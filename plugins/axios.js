import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const apiUrl = process.env.API_URL_PRODUCTION || "http://local.lo/api";

  let api = axios.create({
    baseUrl: apiUrl,
    headers: {
      common: {},
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token && !config.url.startsWith("/auth") && !config.url.startsWith("https://random-word-api.vercel.app")) {
        console.log(config.url, token);
        config.headers = config.headers || {}; // Certifique-se de criar o objeto headers se não existir
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      if(!config.url.startsWith('https://')){
        config.url = defaultUrl + config.url;
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