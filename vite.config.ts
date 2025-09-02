import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // FIX: Replaced `process.cwd()` with `'.'` to fix the TypeScript error: "Property 'cwd' does not exist on type 'Process'".
  // Vite resolves `'.'` to the project root, achieving the same result as `process.cwd()`.
  const env = loadEnv(mode, '.', '')
  return {
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
    plugins: [react()],
    server: {
      host: true, // Allow external access for Capacitor live reload
    }
  }
})
