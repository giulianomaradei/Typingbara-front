// For Nuxt 3
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
///import { faEye, faEyeSlash, faUser, faCog, faRotate, faGamepad, faCrown, faRankingStar, faCircle, faR } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
//library.add(faEye, faEyeSlash, faUser, faCog, faRotate, faGamepad, faCrown, faRankingStar, far);
library.add(fas)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})
