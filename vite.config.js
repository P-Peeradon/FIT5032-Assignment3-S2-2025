import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    define: {
        'process.env.VITE_FIREBASE_API_KEY': JSON.stringify(import.meta.env.VITE_FIREBASE_API_KEY),
        'process.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify(
            import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
        ),
        'process.env.VITE_FIREBASE_APP_ID': JSON.stringify(import.meta.env.VITE_FIREBASE_APP_ID),
        'process.env.VITE_FIREBASE_MEASUREMENT_ID': JSON.stringify(
            import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
        ),
    },
});
