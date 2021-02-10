import babel from '@rollup/plugin-babel';
import del from 'del';
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';

const extensions = ['.js', '.ts']

export default async function() {
  await del('dist');
  
  const builds = [];

  builds.push({
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins: [
      resolve({
        extensions
      }),
      babel({
        exclude: 'node_modules/**',
        extensions
      }),
    ]
  });

  return builds;
}