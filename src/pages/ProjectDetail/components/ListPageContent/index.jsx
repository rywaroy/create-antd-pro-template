import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import ListPageModal from './ListPageModal';

export default function ListPageContent(props) {
  const { route } = props;

  const [listPageModalVisible, setListPageModalVisible] = useState(false);

  return (
    <PageContainer content={route.name}>
      <Button type="primary" onClick={() => setListPageModalVisible(true)}>
        编辑
      </Button>

      <ListPageModal
        visible={listPageModalVisible}
        onCancel={() => setListPageModalVisible(false)}
      />
    </PageContainer>
  );
}
