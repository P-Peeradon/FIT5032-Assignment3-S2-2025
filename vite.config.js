import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    // 2. Map the environment variables to the desired 'process.env' keys.
    const definedEnv = {
        'process.env.NODE_ENV': JSON.stringify(mode),
        ...Object.keys(env).reduce((prev, key) => {
            // We map VITE_FIREBASE_API_KEY to 'process.env.VITE_FIREBASE_API_KEY'
            // The key is the full string literal you want to replace in your client code.
            prev[`process.env.${key}`] = JSON.stringify(env[key]);
            return prev;
        }, {}),
    };

    console.log('Vite Define Environment:', definedEnv);

    return {
        plugins: [vue()],
        define: definedEnv,
    };
});
