import { useEffect, useState, useRef } from 'react';
import { Layout } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-components';
import { getProjectObject, getPageTypeData } from '@/utils';
import Menu from './components/Menu';
import styles from './index.less';

const { Sider, Content, Header } = Layout;

export default function ProjectDetail(props) {
  const [title, setTitle] = useState('');
  const [addRouteVisible, setAddRouteVisible] = useState(false);
  const [routes, setRoutes] = useState([]);
  const parentRoute = useRef();

  const selectRoute = (route) => {
    console.log(route);
  };

  const addRoute = (parantRoute) => {
    console.log(parantRoute);
    parentRoute.current = parantRoute;
    setAddRouteVisible(true);
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
        <h1 className={styles.title}>{title}</h1>
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
        <Content>11</Content>
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
            newRoute.component = `./${componentName}`;
            newRoute.content = getPageTypeData(pageType);
            newRoute.path = path;
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