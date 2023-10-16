import Echo from 'laravel-echo';
import Pusher from 'pusher-js';


export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    window.Pusher = Pusher;
  }
  const echo = new Echo({
    broadcaster: 'pusher',
    key: 'local', // .env
    wsHost: "typingbara-fa53f7433fea.herokuapp.com",
    wsPort: 6001,
    wssPort: 6001,
    forceTLS: false,
    disableStats: true,
    cluster: 'mt1',
    enabledTransports: ['ws', 'wss'],
    authEndpoint: 'https://typingbara-fa53f7433fea.herokuapp.com/broadcasting/auth',
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
