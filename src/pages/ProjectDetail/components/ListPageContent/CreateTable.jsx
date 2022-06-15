import { useState, useRef } from 'react';
import { Table, Button, Input } from 'antd';
import { ModalForm, ProFormDigit } from '@ant-design/pro-components';
import styles from './index.less';

export default function CreateTable(props) {
  const { tableColumns, setTableColumns } = props;
  const tableColumnsRef = useRef(tableColumns);
  const [dataSource, setDataSource] = useState([{ id: 1 }, { id: 2 }]);

  const editTitle = (value, index) => {
    const newTableColumns = [...tableColumnsRef.current];
    newTableColumns[index].titleText = value;
    setTableColumns(newTableColumns);
    tableColumnsRef.current = newTableColumns;
  };

  const addColumn = (number) => {
    const newTableColumns = [...tableColumns];
    const newDataSource = [...dataSource];
    const len = tableColumns.length;
    for (let i = 0; i < number; i++) {
      const name = `标题${len + i + 1}`;
      const column = {
        title: () => (
          <Input onChange={(e) => editTitle(e.target.value, len + i)} />
        ),
        titleText: name,
        dataIndex: name,
        hideInSearch: true,
      };
      newTableColumns.push(column);
      for (let j = 0; j < newDataSource.length; j++) {
        newDataSource[j][name] = `测试数据${j + 1}`;
      }
    }
    setTableColumns(newTableColumns);
    tableColumnsRef.current = newTableColumns;
    setDataSource(newDataSource);
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
      </div>
      <Table columns={tableColumns} dataSource={dataSource} rowKey="id" />
    </div>
  );
}
