import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ingresos: resolve(__dirname, 'ingresos.html'),
        gastos: resolve(__dirname, 'gastos.html'),
        movimientos: resolve(__dirname, 'movimientos.html'),
        metas: resolve(__dirname, 'metas.html')
      }
    }
  }
});
