const fs = require('fs-extra');
const path = require('path');
const send = require('koa-send');
const archiver = require('archiver');
const listPageTemplate = require('../../pageTemplates/listPageTemplate');

const data = {
  name: 'new-propject',
  description: '项目',
  routes: [
    {
      id: 0.20493418542691688,
      name: '页面1',
      component: 'A',
      content: {
        searchFormColumns: [
          {
            title: 'text',
            dataIndex: 'text',
            valueType: 'text',
            hideInTable: true,
          },
          {
            title: 'select',
            dataIndex: 'select',
            valueType: 'select',
            hideInTable: true,
          },
          {
            title: 'dateRange',
            dataIndex: 'dateRange',
            valueType: 'dateRange',
            hideInTable: true,
          },
        ],
        tableButtons: [
          {
            text: '新建',
            type: 'primary',
          },
        ],
        tableColumns: [
          { title: '标题1', dataIndex: '标题1', hideInSearch: true },
          { title: '标题2', dataIndex: '标题2', hideInSearch: true },
          { title: '标题3', dataIndex: '标题3', hideInSearch: true },
          { title: '标题4', dataIndex: '标题4', hideInSearch: true },
          { title: '标题5', dataIndex: '标题5', hideInSearch: true },
        ],
      },
      path: '/a',
      pageType: 'list',
    },
    {
      id: 0.2049,
      name: '页面2',
      routes: [
        {
          id: 0.20493418542691688,
          name: '页面3',
          component: 'B',
          content: {
            searchFormColumns: [
              {
                title: 'text',
                dataIndex: 'text',
                valueType: 'text',
                hideInTable: true,
              },
            ],
            tableButtons: [],
            tableColumns: [
              { title: '标题1', dataIndex: '标题1', hideInSearch: true },
              { title: '标题2', dataIndex: '标题2', hideInSearch: true },
              { title: '标题3', dataIndex: '标题3', hideInSearch: true },
              { title: '标题4', dataIndex: '标题4', hideInSearch: true },
            ],
          },
          path: '/b',
          pageType: 'list',
        },
      ],
    },
  ],
};

module.exports = async function project(ctx) {
  let { name, routes } = ctx.request.body;
  if (name === 'antd-pro') {
    name = 'new-project';
  }
  const templatePath = path.join(__dirname, '../..', 'template');
  const antdProPath = path.join(templatePath, 'antd-pro');
  const newFile = path.join(templatePath, name);
  await fs.copy(antdProPath, newFile);

  const createPage = (route) => {
    const { pageType, content } = route;
    if (pageType === 'list') {
      const text = listPageTemplate(route.component, content);
      const pagesPath = path.join(
        newFile,
        'src',
        'pages',
        route.component,
        'index.jsx',
      );
      fs.ensureFile(pagesPath, () => {
        fs.writeFileSync(pagesPath, text);
      });
    }
    route.component = `./${route.component}`;

    delete route.content;
    delete route.pageType;
    delete route.id;
  };

  const createRoutes = (routes) => {
    routes.forEach((route) => {
      if (route.content) {
        createPage(route);
      } else if (route.routes) {
        delete route.id;
        createRoutes(route.routes);
      }
    });
  };

  createRoutes(routes);

  const routesConfigPath = path.join(newFile, 'config', 'routes.ts');
  routes.push({
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  });
  routes.push({
    component: './404',
  });
  const routesConfigText = `export default ${JSON.stringify(routes, null, 2)};`;
  fs.writeFileSync(routesConfigPath, routesConfigText);
  const zipName = `${name}.zip`;
  const zipPath = path.join(templatePath, zipName);
  const zipStream = fs.createWriteStream(zipPath);
  const zip = archiver('zip');
  zip.pipe(zipStream);
  // 添加整个文件夹到压缩包
  zip.directory(`${newFile}/`, false);
  await zip.finalize();
  ctx.attachment('template/' + zipName);
  await send(ctx, 'template/' + zipName);

  await fs.remove(newFile);
  await fs.remove(zipPath);
};
