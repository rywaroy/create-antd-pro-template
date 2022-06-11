import { Modal, message } from 'antd';
// import CreateTable from '@/components/CreateTable';
import CreateForm from './CreateForm';
import styles from './index.less';

export default function ListPageModal(props) {
  const { visible, onCancel } = props;

  const create = () => {};

  return (
    <Modal
      visible={visible}
      title="配置"
      width="1200px"
      maskClosable={false}
      onCancel={() => {
        onCancel();
      }}
      onOk={create}
    >
      <div className={styles.listPage}>
        <div className={styles.listPageBox}>
          <span className={styles.listPageTag}>筛选</span>
          {/* <CreateForm
                        labelList={labelList}
                        wrappedComponentRef={el => { this.filterForm = el; }}
                        isEditVariable={false}
                        height={300}
                        width={900}
                        getFormObject={this.getFormObject} /> */}
          <CreateForm />
        </div>
        <div className={styles.listPageBox}>
          <span className={styles.listPageTag}>表格</span>
          {/* <CreateTable
                        ref={el => { this.table = el; }}
                        labelList={labelList}
                        isEditVariable={false}
                        popupForms={popupForms}
                        getTableObject={this.getTableObject} /> */}
        </div>
      </div>
    </Modal>
  );
}
