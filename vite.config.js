import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Configuracion principal de Vite para el entorno React con SWC.
export default defineConfig({
  plugins: [react()],
})
