import { defineConfig } from 'vite';
export default defineConfig({define:{__BUILD_SHA__:JSON.stringify(process.env.GITHUB_SHA||'development')},base:'./', build:{target:'es2022', chunkSizeWarningLimit:1600}, server:{host:'0.0.0.0'}});
