import { useState } from 'react';
import { Button } from 'antd';
import CreateTable from './CreateTable';
import CreateForm from './CreateForm';
import CreateButtons from './CreateButtons';
import styles from './index.less';

export default function ListPageModal(props) {
  const { content } = props;
  const [searchFormColumns, setSearchFormColumns] = useState(
    content.searchFormColumns,
  );
  const [tableButtons, setTableButtons] = useState(content.tableButtons);
  const [tableColumns, setTableColumns] = useState(content.tableColumns);

  return (
    <div className={styles.listPage}>
      <div className={styles.listPageContainer}>
        <div className={styles.listPageBox}>
          <span className={styles.listPageTag}>筛选表单</span>
          <CreateForm
            searchFormColumns={searchFormColumns}
            setSearchFormColumns={setSearchFormColumns}
          />
        </div>
        <div className={styles.listPageBox}>
          <span className={styles.listPageTag}>操作按钮</span>
          <CreateButtons
            tableButtons={tableButtons}
            setTableButtons={setTableButtons}
          />
        </div>
        <div className={styles.listPageBox}>
          <span className={styles.listPageTag}>表格</span>
          <CreateTable
            tableColumns={tableColumns}
            setTableColumns={setTableColumns}
          />
        </div>
      </div>
      <div className="ant-modal-footer">
        <Button>取 消</Button>
        <Button type="primary">确 定</Button>
      </div>
    </div>
  );
}
