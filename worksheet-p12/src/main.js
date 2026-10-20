import { createApp } from 'vue'
import App from './App.vue'

// Urutan impor harus dimulai dari tokens.css!
import './tokens.css'
import './base.css'
import './layout.css'
import './komponen.css'
import './tema.css'
import './responsif.css'

createApp(App).mount('#app')