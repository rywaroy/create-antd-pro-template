import { useState } from 'react';
import { Button } from 'antd';
// import CreateTable from '@/components/CreateTable';
import CreateForm from './CreateForm';
import styles from './index.less';

export default function ListPageModal(props) {
  const { content } = props;
  const [searchFormColumns, setSearchFormColumns] = useState(
    content.searchFormColumns,
  );

  return (
    <div className={styles.listPage}>
      <div className={styles.listPageContainer}>
        <div className={styles.listPageBox}>
          <span className={styles.listPageTag}>筛选</span>
          <CreateForm
            searchFormColumns={searchFormColumns}
            setSearchFormColumns={setSearchFormColumns}
          />
        </div>
        <div className={styles.listPageBox}>
          <span className={styles.listPageTag}>表格</span>
          {/* <CreateTable /> */}
        </div>
      </div>
      <div className="ant-modal-footer">
        <Button>取 消</Button>
        <Button type="primary">确 定</Button>
      </div>
    </div>
  );
}
