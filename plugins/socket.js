import Echo from 'laravel-echo';
import Pusher from 'pusher-js';


export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    window.Pusher = Pusher;
  }
  const echo = new Echo({
    broadcaster: 'pusher',
    key: 'local', // .env
    wsHost: "127.0.0.1",
    wsPort: 6001,
    wssPort: 6001,
    forceTLS: false,
    disableStats: true,
    cluster: 'mt1',
    enabledTransports: ['ws', 'wss'],
    authEndpoint: 'http://local.lo/broadcasting/auth',
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
