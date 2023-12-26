import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useREM } from './utils/flexible'
import mLibs from './libs'
import directives from './directives'
import 'virtual:svg-icons-register'
import './styles/index.scss'
import store from './store'
import useTheme from './utils/theme'

import './permission'

// rem换算
useREM()
// 初始化主题
useTheme()

createApp(App).use(store).use(router).use(mLibs).use(directives).mount('#app')
