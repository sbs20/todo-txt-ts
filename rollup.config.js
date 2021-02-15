import del from 'del';
import pkg from './package.json';
import { terser } from "rollup-plugin-terser";
import typescript from '@rollup/plugin-typescript';

const extensions = ['.js', '.d.ts']

export default async function() {
  await del('dist');
  
  const builds = [];

  builds.push({
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' }
    ],
    plugins: [
      typescript()
    ]
  });

  builds.push({
    input: 'dist/index.esm.js',
    output: [
      {
        file: 'dist/index.min.js',
        format: 'iife',
        esModule: false,
        name: 'TodoTxtTs'
      },
    ],
    plugins: [
      terser({ compress: { ecma: 2019 } }),
    ]
  });

  return builds;
}