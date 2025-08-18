import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: 'src/standalone.ts',
            name: 'MorphChat',
            fileName: 'morphchat',
            formats: ['umd', 'es']
        },
        rollupOptions: {
            // Bundle React and all dependencies
            external: [],
            output: {
                globals: {}
            }
        },
        outDir: 'dist',
        sourcemap: true
    }
});
