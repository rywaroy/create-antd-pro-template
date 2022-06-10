import { useEffect, useState } from 'react';
import { Table, Layout, Button, message, Modal } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import validate from 'validate-npm-package-name';
import { PlusOutlined } from '@ant-design/icons';
import {
  getProjectList,
  getProjectObject,
  setProjectObject,
  deleteProjectObject,
} from '@/utils';
import 'antd/dist/antd.css';
import styles from './index.less';

const { Header, Content } = Layout;

export default function IndexPage() {
  const [data, setData] = useState([]);

  const getData = () => {
    setData(getProjectList());
  };

  const deleteProject = (name) => {
    Modal.confirm({
      title: '确认删除',
      content: `确认删除 ${name} 吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        deleteProjectObject(name);
        getData();
      },
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
    },
    {
      title: '项目简介',
      dataIndex: 'description',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 180,
      render: (_, record) => [
        <Button type="link" key="detail" href={`/#/detail/${record.name}`}>
          详情
        </Button>,
        <Button
          type="link"
          key="delete"
          onClick={() => deleteProject(record.name)}
        >
          删除
        </Button>,
      ],
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        <h1 className={styles.title}>Antd Pro 模板生成工具</h1>
      </Header>
      <Content>
        <div className={styles.content}>
          <div className={styles.buttons}>
            <ModalForm
              title="新建项目"
              trigger={
                <Button type="primary">
                  <PlusOutlined />
                  新建项目
                </Button>
              }
              autoFocusFirstInput
              modalProps={{
                width: 400,
                destroyOnClose: true,
              }}
              onFinish={async (values) => {
                const projectObject = {
                  ...values,
                  routes: [],
                };
                setProjectObject(projectObject);
                message.success('创建成功');
                getData();
                return true;
              }}
            >
              <ProFormText
                name="name"
                label="项目名称"
                rules={[
                  {
                    validator: (_, value) => {
                      const { validForNewPackages } = validate(value);
                      if (!validForNewPackages) {
                        return Promise.reject('项目名称不合法');
                      }
                      return Promise.resolve();
                    },
                  },
                  {
                    validator: (_, value) => {
                      const list = getProjectObject();
                      if (list[value]) {
                        return Promise.reject('项目名称重复');
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              />
              <ProFormText
                name="description"
                label="项目简介"
                rules={[{ required: true, message: '请输入项目简介' }]}
              />
            </ModalForm>
          </div>
          <Table
            rowKey="name"
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </div>
      </Content>
    </Layout>
  );
}
