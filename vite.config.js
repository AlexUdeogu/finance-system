import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Set this to true to listen on all addresses, including the local network
    port: 5173, // You can specify any port you prefer
  },
});
