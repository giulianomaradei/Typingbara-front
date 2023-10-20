import Echo from 'laravel-echo';
import Pusher from 'pusher-js';


export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()

  const PUSHER_KEY = runtimeConfig.public.PUSHER_KEY;
  const PUSHER_HOST = runtimeConfig.public.PUSHER_HOST;
  const PUSHER_AUTH_URL = runtimeConfig.public.PUSHER_AUTH_URL;

  if (process.client) {
    window.Pusher = Pusher;
  }
  const echo = new Echo({
    broadcaster: 'pusher',
    key: PUSHER_KEY, // .env
    wsHost: PUSHER_HOST,
    wsPort: 6001,
    wssPort: 6001,
    forceTLS: true,
    disableStats: true,
    cluster: 'mt1',
    authEndpoint: PUSHER_AUTH_URL,
    auth:        {
      headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token") ?? "",
      },
  },

  })

  return {
    provide: {
      echo: echo,
    },
  };
});
