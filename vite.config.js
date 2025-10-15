import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;
const FIREBASE_MEASUREMENT_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    define: {
        'process.env.VITE_FIREBASE_API_KEY': JSON.stringify(FIREBASE_API_KEY),
        'process.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify(FIREBASE_AUTH_DOMAIN),
        'process.env.VITE_FIREBASE_APP_ID': JSON.stringify(FIREBASE_APP_ID),
        'process.env.VITE_FIREBASE_MEASUREMENT_ID': JSON.stringify(FIREBASE_MEASUREMENT_ID),
    },
});
