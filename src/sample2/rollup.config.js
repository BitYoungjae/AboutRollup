import json from '@rollup/plugin-json';

export default {
  input: './src/sample2/index.js',
  output: {
    format: 'cjs',
    file: './dist/bundle.js',
  },
  plugins: [json()],
};
