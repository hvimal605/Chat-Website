import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:5173,
    proxy:{
      "/api":{
        target:"https://chat-website-isk6.onrender.com",
        changeOrigin:true,
      }
    }
  }
})
