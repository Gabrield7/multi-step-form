import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/Styles'),
      '@components': path.resolve(__dirname, 'src/Components'),
      '@contexts': path.resolve(__dirname, 'src/Contexts'),
      '@stores': path.resolve(__dirname, 'src/Stores'),
    }
  }
})

