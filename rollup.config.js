import svelte     from 'rollup-plugin-svelte'
import commonjs   from '@rollup/plugin-commonjs'
import resolve    from '@rollup/plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import rootImport from 'rollup-plugin-root-import'
import { terser } from 'rollup-plugin-terser'
import auto       from 'svelte-preprocess'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    rootImport({
      root: `${__dirname}/src`,
      useInput: 'prepend',
      extensions: ['.js', '.svelte', '.scss'],
    }),
    svelte({
      dev: !production,
      preprocess: auto({
        scss: {
          includePaths: ['src/styles'],
          data: `@import 'src/styles/variables.scss';`
        },
        postcss: {
          plugins: [require('autoprefixer')]
        }
      }),
      css: css => {
        css.write('public/build/bundle.css')
      }
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    !production && serve(),
    !production && livereload('public'),
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
}

function serve() {
  let started = false

  return {
    writeBundle() {
      if (!started) {
        started = true

        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        })
      }
    }
  }
}
