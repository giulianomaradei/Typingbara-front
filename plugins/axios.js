import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "http://local.lo/api";

  // Obtém a variável de ambiente da URL de produção do Vercel
  const productionUrl = process.env.API_URL_PRODUCTION;

  // Escolhe a URL com base no ambiente
  const apiUrl = process.env.NODE_ENV === 'production' ? productionUrl : defaultUrl;

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