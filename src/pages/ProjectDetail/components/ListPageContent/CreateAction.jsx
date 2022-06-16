import { useState } from 'react';
import { Button, Form, Radio, Input, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './index.less';

export default function CreateAction(props) {
  const { onCancel, onOk } = props;

  const [fixed, setFixed] = useState(false);
  const [width, setWidth] = useState(150);
  const [opts, setOpts] = useState([]);

  const optInputChange = (text, index) => {
    const newOpts = [...opts];
    newOpts[index] = text;
    setOpts(newOpts);
  };

  const addOpt = () => {
    setOpts([...opts, '']);
  };

  const deleteOpt = (index) => {
    const newOpts = [...opts];
    newOpts.splice(index, 1);
    setOpts(newOpts);
  };

  const submit = () => {
    const data = {
      fixed,
      width,
      opts: opts.filter((item) => item),
    };
    onOk(data);
  };

  return (
    <div>
      <div className={styles.createAction}>
        <Form.Item label="fixed">
          <Radio.Group
            onChange={(e) => setFixed(e.target.value)}
            value={fixed}
            options={[
              { label: 'false', value: false },
              { label: 'right', value: 'right' },
              { label: 'left', value: 'left' },
            ]}
          />
        </Form.Item>
        <Form.Item label="width">
          <InputNumber
            value={width}
            precision={0}
            min={0}
            onChange={(number) => setWidth(number)}
          />
        </Form.Item>
        <div>
          操作按钮：{' '}
          <Button type="primary" onClick={addOpt}>
            添加
          </Button>
        </div>
        {opts.map((item, index) => (
          <div className={styles.createActionLine} key={index}>
            <Input
              placeholder="操作名称"
              className={styles.createActionInput}
              allowClear
              onChange={(e) => optInputChange(e.target.value, index)}
              value={item}
            />
            <DeleteOutlined
              className={styles.createActionDelete}
              onClick={() => deleteOpt(index)}
            />
          </div>
        ))}
      </div>
      <div className="ant-modal-footer">
        <Button onClick={onCancel}>取 消</Button>
        <Button type="primary" onClick={submit}>
          确 定
        </Button>
      </div>
    </div>
  );
}
