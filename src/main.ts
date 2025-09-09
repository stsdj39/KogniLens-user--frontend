/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'
// 导入 Tailwind CSS
import './styles/main.css'
const app = createApp(App)

registerPlugins(app)

app.mount('#app')
