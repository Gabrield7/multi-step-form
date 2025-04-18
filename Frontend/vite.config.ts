import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/Styles'),
      '@components': path.resolve(__dirname, 'src/Components'),
      '@contexts': path.resolve(__dirname, 'src/Contexts'),
      '@stores': path.resolve(__dirname, 'src/Stores'),
      '@utils': path.resolve(__dirname, 'src/Utils'),
      '@hooks': path.resolve(__dirname, 'src/Hooks'),
    }
  },
  server: {
    proxy: {
      '/api': { // redirects /api calls for vercel dev
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})

