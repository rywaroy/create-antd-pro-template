import { useEffect, useState, useRef } from 'react';
import { Layout, Button, message, Modal } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-components';
import {
  getProjectObject,
  getPageTypeData,
  setProjectObject,
  findRoute,
} from '@/utils';
import Menu from './components/Menu';
import ListPageContent from './components/ListPageContent';
import { downLoadProjectApi } from '@/services';
import styles from './index.less';

const { Sider, Content, Header } = Layout;

export default function ProjectDetail(props) {
  const [title, setTitle] = useState('');
  const [addRouteVisible, setAddRouteVisible] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [currentRoute, setCurrentRoute] = useState({});
  const parentRoute = useRef();

  const selectRoute = (route) => {
    setCurrentRoute(route);
  };

  const addRoute = (parantRoute) => {
    parentRoute.current = parantRoute;
    setAddRouteVisible(true);
  };

  const saveProject = () => {
    const data = getProjectObject();
    const detail = data[props.match.params.name];
    detail.routes = routes;
    setProjectObject(detail);
    message.success('保存成功');
  };

  const updateRoute = (data) => {
    const newCurrentRoute = { ...currentRoute };
    newCurrentRoute.content = data;
    setCurrentRoute(newCurrentRoute);
    const newRoutes = [...routes];
    const route = findRoute(currentRoute.id, newRoutes);
    route.content = data;
    setRoutes(newRoutes);
  };

  const deleteRoute = () => {
    Modal.confirm({
      title: '确认删除',
      content: '确认删除该页面吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const newRoutes = [...routes];
        findRoute(currentRoute.id, newRoutes, (route, routes, i) => {
          routes.splice(i, 1);
        });
        setRoutes(newRoutes);
        setCurrentRoute({});
      },
    });
  };

  const downLoadProject = () => {
    const name = props.match.params.name;
    downLoadProjectApi({
      name,
      routes,
    }).then((response) => {
      const blob = new Blob([response.data], {
        type: 'application/octet-stream',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name + '.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  };

  useEffect(() => {
    const data = getProjectObject();
    const detail = data[props.match.params.name];
    setRoutes(detail.routes);
    setTitle(detail.name);
  }, []);

  return (
    <Layout className={styles.content}>
      <Header>
        <div className={styles.top}>
          <h1 className={styles.title}>{title}</h1>
          <div>
            <Button
              type="primary"
              onClick={saveProject}
              style={{ marginRight: '10px' }}
            >
              保存
            </Button>
            <Button type="primary" onClick={downLoadProject}>
              下载
            </Button>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider>
          <div className={styles.menu}>
            <Menu
              routes={routes}
              addRoute={addRoute}
              selectRoute={selectRoute}
            />
          </div>
        </Sider>
        <Content>
          {currentRoute.pageType === 'list' && (
            <ListPageContent
              route={currentRoute}
              updateRoute={updateRoute}
              deleteRoute={deleteRoute}
            />
          )}
        </Content>
      </Layout>

      <ModalForm
        title="添加路由"
        initialValues={{
          type: 1,
          pageType: 'list',
        }}
        onVisibleChange={(v) => setAddRouteVisible(v)}
        autoFocusFirstInput
        modalProps={{
          width: 400,
          destroyOnClose: true,
        }}
        onFinish={async (values) => {
          const { name, type, pageType, path, componentName } = values;
          const newRoute = {
            id: Math.random(),
            name,
          };
          if (type === 1) {
            newRoute.component = componentName;
            newRoute.content = getPageTypeData(pageType);
            newRoute.path = path;
            newRoute.pageType = pageType;
          }
          if (type === 2) {
            newRoute.routes = [];
          }

          if (parentRoute.current) {
            parentRoute.current.routes.push(newRoute);
          } else {
            routes.push(newRoute);
          }
          setRoutes([...routes]);
          return true;
        }}
        visible={addRouteVisible}
      >
        <ProFormText
          name="name"
          label="name"
          rules={[{ required: true, message: '请输入name' }]}
        />
        <ProFormRadio.Group
          name="type"
          label="路由类型"
          options={[
            {
              label: '页面',
              value: 1,
            },
            {
              label: '父级菜单',
              value: 2,
            },
          ]}
        />
        <ProFormSelect
          name="pageType"
          label="页面类型"
          options={[{ label: '列表页面', value: 'list' }]}
        />
        <ProFormText name="path" label="path" />
        <ProFormText name="componentName" label="组件名" />
      </ModalForm>
    </Layout>
  );
}
