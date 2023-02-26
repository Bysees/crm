import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/crm/',
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      components: path.resolve(__dirname, "./src/components"),
      styles: path.resolve(__dirname, "./src/assets/styles"),
      icons: path.resolve(__dirname, "./src/assets/icons"),
      images: path.resolve(__dirname, "./src/assets/images"),
      service: path.resolve(__dirname, "./src/service")
    }
  }
})
