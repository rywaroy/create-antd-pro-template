import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/detail/:name', component: '@/pages/ProjectDetail' },
  ],
  fastRefresh: {},
  outputPath: './server/static',
});
