import { useState, useRef } from 'react';
import { Table, Button, Input, Modal } from 'antd';
import {
  ModalForm,
  ProFormDigit,
  ProFormText,
} from '@ant-design/pro-components';
import { EditOutlined } from '@ant-design/icons';
import CreateAction from './CreateAction';
import styles from './index.less';

export default function CreateTable(props) {
  const { tableColumns, setTableColumns } = props;
  const [dataSource, setDataSource] = useState([{ id: 1 }, { id: 2 }]);
  const [actionVisible, setActionVisible] = useState(false);

  const addColumn = (number) => {
    const newTableColumns = [...tableColumns];
    const newDataSource = [...dataSource];
    const len = tableColumns.length;
    for (let i = 0; i < number; i++) {
      const name = `标题${len + i + 1}`;
      const column = {
        title: name,
        dataIndex: name,
        hideInSearch: true,
      };
      newTableColumns.push(column);
      for (let j = 0; j < newDataSource.length; j++) {
        newDataSource[j][name] = `测试数据${j + 1}`;
      }
    }
    setTableColumns(newTableColumns);
    setDataSource(newDataSource);
  };

  const addOpt = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.createTable}>
      <div className={styles.createTableButtons}>
        <ModalForm
          title="批量添加"
          width={400}
          trigger={<Button type="primary">批量添加</Button>}
          autoFocusFirstInput
          onFinish={(values) => {
            addColumn(values.number);
            return true;
          }}
        >
          <ProFormDigit
            name="number"
            label="表格列数量"
            fieldProps={{ min: 1, precision: 0 }}
            rules={[{ required: true, message: '请输入数量' }]}
          />
        </ModalForm>
        <Button type="primary" onClick={() => setActionVisible(true)}>
          添加操作
        </Button>
      </div>
      {tableColumns.length > 0 && (
        <Table
          columns={tableColumns}
          dataSource={dataSource}
          rowKey="id"
          components={{
            header: {
              cell: (cellProps) => {
                const { children, ...rest } = cellProps;
                const text = children[1];
                return (
                  <th {...rest}>
                    {children}
                    <ModalForm
                      title="修改文本"
                      width={400}
                      trigger={<EditOutlined />}
                      autoFocusFirstInput
                      onFinish={(values) => {
                        const newTableColumns = [...tableColumns];
                        newTableColumns.forEach((item) => {
                          if (item.title === text) {
                            item.title = values.title;
                          }
                        });
                        setTableColumns(newTableColumns);
                        return true;
                      }}
                    >
                      <ProFormText
                        name="title"
                        label="文本"
                        rules={[{ required: true, message: '请输入文本' }]}
                      />
                    </ModalForm>
                  </th>
                );
              },
            },
          }}
        />
      )}
      <Modal
        title="添加操作"
        visible={actionVisible}
        okText="确定"
        cancelText="取消"
        wrapClassName="custom-modal"
        destroyOnClose={true}
        footer={null}
        onCancel={() => setActionVisible(false)}
      >
        <CreateAction onCancel={() => setActionVisible(false)} onOk={addOpt} />
      </Modal>
    </div>
  );
}
