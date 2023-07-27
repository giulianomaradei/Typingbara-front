import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "";

  let api = axios.create({
    baseURL: defaultUrl,
  });
return {
    provide: {
      axios: api,
    },
  };
});