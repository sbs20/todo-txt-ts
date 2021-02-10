import del from 'del';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';

const extensions = ['.js', '.d.ts']

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
      typescript()
    ]
  });

  return builds;
}