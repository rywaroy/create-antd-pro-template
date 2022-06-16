import { Button, Popover } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';

export default function CreateButtons(props) {
  const { tableButtons, setTableButtons } = props;

  const deleteButton = (index) => {
    const newTableButtons = [...tableButtons];
    newTableButtons.splice(index, 1);
    setTableButtons(newTableButtons);
  };

  return (
    <div className={styles.createButton}>
      {tableButtons.map((item, index) => (
        <Popover
          key={index}
          content={
            <span
              className={styles.createButtonDelete}
              onClick={() => deleteButton(index)}
            >
              删除
            </span>
          }
        >
          <Button type={item.type} className={styles.createButtonItem}>
            {item.text}
          </Button>
        </Popover>
      ))}

      <ModalForm
        title="新建按钮"
        width={400}
        trigger={<Button icon={<PlusOutlined />}></Button>}
        autoFocusFirstInput
        onFinish={(values) => {
          const { text, type = 'default' } = values;
          const buttons = {
            text,
            type,
          };
          setTableButtons([...tableButtons, buttons]);
          return true;
        }}
      >
        <ProFormText
          name="text"
          label="按钮文本"
          rules={[{ required: true, message: '请输入按钮文本' }]}
        />
        <ProFormSelect
          name="type"
          label="按钮类型"
          initialValue={'primary'}
          options={[
            { value: 'primary', label: '主要 primary' },
            { value: 'default', label: '默认 default' },
          ]}
        />
      </ModalForm>
    </div>
  );
}
