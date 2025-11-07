import { defineConfig, PluginOption } from 'vite'
import { fresh } from '@fresh/plugin-vite'

const plugins: PluginOption[] = [fresh()]

if (Deno.env.get('NO_SOURCE_MAPS')) {
  plugins.push({
      name: 'remove-sourcemaps',
      transform(code) {
        return {
          code,
          map: { mappings: '' }
        }
      }
    })
}

export default defineConfig({ plugins })
