import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/EVAL-CHENEY/', // 💡 remplace par le nom EXACT de ton repo GitHub
})
