import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, md } from 'vuetify/iconsets/md'
import { mdi } from 'vuetify/iconsets/mdi'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase/firebaseConfig'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createVuetify({ 
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
      mdi,
    },
  },
  components, 
  directives,
}));
app.use(VueFire, {
  firebaseApp,
  modules:[
    VueFireAuth
  ]
})

app.mount('#app')
