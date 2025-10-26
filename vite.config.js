/* eslint-env node */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Use env variable VITE_FOOTBALL_API_TOKEN to avoid committing secrets.
export default defineConfig(({ mode }) => {
  // load .env files
  const env = loadEnv(mode, globalThis.process ? globalThis.process.cwd() : '', '')
  const token = env.VITE_FOOTBALL_API_TOKEN || env.FOOTBALL_API_TOKEN || ''

  const footballProxy = {
    target: 'https://api.football-data.org/v4',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/football/, ''),
  }

  // Add auth header only when token is provided to avoid empty header issues
  if (token) {
    footballProxy.headers = {
      'X-Auth-Token': token,
    }
  }

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/football': footballProxy,
      },
    },
  }
})