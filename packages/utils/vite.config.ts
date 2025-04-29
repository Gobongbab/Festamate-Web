import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FestamateUtils',
      fileName: 'festamate-utils',
    },
    rollupOptions: {
      external: ['clsx', 'dayjs', 'entities', 'tailwind-merge'],
      output: {
        globals: {
          clsx: 'clsx',
          dayjs: 'dayjs',
          entities: 'entities',
          'tailwind-merge': 'tailwindMerge',
        },
      },
    },
  },
  plugins: [dts()],
});
