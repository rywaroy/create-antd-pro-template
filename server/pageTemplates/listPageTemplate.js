module.exports = function listPageTemplate(
  name,
  { searchFormColumns, tableButtons, tableColumns },
) {
  const newData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  tableColumns.forEach((item) => {
    newData.forEach((data) => {
      data[item.dataIndex] = `测试数据${data.id}`;
    });
  });
  const text = `
import { useRef } from 'react';${
    tableButtons.length > 0 ? `\nimport { Button } from 'antd';` : ''
  }
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';

const list = ${JSON.stringify(newData)}
const total = 5;

export default function ${name}() {

    const actionRef = useRef();    
    const columns = ${JSON.stringify([...searchFormColumns, ...tableColumns])};

    return (
        <PageContainer>
            <ProTable
                headerTitle={'查询表格'}${
                  searchFormColumns.length === 0
                    ? '\n                search={false}'
                    : ''
                }
                actionRef={actionRef}
                rowKey="id"
                columns={columns}${
                  tableButtons.length > 0
                    ? `\n                toolBarRender={() => [
                        ${tableButtons
                          .map(
                            (item) =>
                              `<Button type="${item.type}" key="${item.text}">${item.text}</Button>`,
                          )
                          .join(',')}
                    ]}`
                    : ''
                }
                pagination={{
                    pageSize: 10,
                }}
                request={async (params) => {
                    const { current } = params;
                    const param = {
                        ...params,
                        page: current,
                    };
                    // const { data } = await getDataApi(param);
                    // const { total, list } = data;
                    return {
                        success: true,
                        data: list,
                        total,
                    };
                }}
            />
        </PageContainer>
    );
}
`;
  return text;
};
