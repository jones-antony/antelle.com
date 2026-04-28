import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  devToolbar: {
    enabled: false
  },
  vite: {
    server: {
      hmr: {
        overlay: false
      }
    }
  }
});
