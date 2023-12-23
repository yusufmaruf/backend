// vitest.config.ts
import { defineConfig, configDefaults } from 'vitest/config'
// import viteConfig from './vite.config'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'backends/seeds/*'],
    coverage: {
      provider: 'v8'
    }
  }
})
