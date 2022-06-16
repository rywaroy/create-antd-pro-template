import { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import ListPageModal from './ListPageModal';
import styles from './index.less';

export default function ListPageContent(props) {
  const { route, updateRoute } = props;

  const { searchFormColumns, tableButtons, tableColumns } = route.content;

  const [columns, setColumns] = useState([
    ...searchFormColumns,
    ...tableColumns,
  ]);
  const [dataSource, setDataSource] = useState([]);
  const [listPageModalVisible, setListPageModalVisible] = useState(false);

  const createPage = (data) => {
    updateRoute(data);
    setListPageModalVisible(false);
  };

  useEffect(() => {
    const newData = [{ id: 1 }, { id: 2 }];
    tableColumns.forEach((item) => {
      newData.forEach((data) => {
        data[item.dataIndex] = `测试数据${data.id}`;
      });
    });
    setDataSource(newData);
  }, [tableColumns]);

  useEffect(() => {
    setColumns([...searchFormColumns, ...tableColumns]);
  }, [searchFormColumns, tableColumns]);

  return (
    <PageContainer content={route.name}>
      <div className={styles.listPageButtons}>
        <Button type="primary" onClick={() => setListPageModalVisible(true)}>
          编辑
        </Button>
      </div>
      <ProTable
        headerTitle={'查询表格'}
        rowKey="id"
        toolBarRender={() =>
          tableButtons.map((item, index) => (
            <Button
              type={item.type}
              key={index}
              className={styles.createButtonItem}
            >
              {item.text}
            </Button>
          ))
        }
        columns={columns}
        dataSource={dataSource}
      />
      <Modal
        visible={listPageModalVisible}
        title="配置"
        width="1200px"
        okText="确定"
        cancelText="取消"
        wrapClassName="custom-modal"
        destroyOnClose={true}
        maskClosable={false}
        footer={null}
        onCancel={() => setListPageModalVisible(false)}
      >
        <ListPageModal
          content={route.content}
          onOk={createPage}
          onCancel={() => setListPageModalVisible(false)}
        />
      </Modal>
    </PageContainer>
  );
}
