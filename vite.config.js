import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    define: {
        // Map process.env to import.meta.env
        'process.env': JSON.stringify({}),
        // You can also use: 'process.env': 'import.meta.env'
        // or set specific keys like: 'process.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY)
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
