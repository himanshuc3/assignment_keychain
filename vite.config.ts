/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    // antd styles are irrelevant to tests, but the print stylesheet is inlined into the exported document.
    css: { include: [/print\.css/] },
  },
});
