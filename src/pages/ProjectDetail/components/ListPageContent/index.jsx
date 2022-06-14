import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Modal } from 'antd';
import ListPageModal from './ListPageModal';

export default function ListPageContent(props) {
  const { route } = props;

  const [listPageModalVisible, setListPageModalVisible] = useState(false);

  return (
    <PageContainer content={route.name}>
      <Button type="primary" onClick={() => setListPageModalVisible(true)}>
        编辑
      </Button>
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
        <ListPageModal content={route.content} />
      </Modal>
    </PageContainer>
  );
}
