import { useState } from 'react';
import { Input, Button, Row, Col, Form, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';

const { RangePicker } = DatePicker;

export default function CreateForm(props) {
  const { searchFormColumns, setSearchFormColumns } = props;
  const [formList, setFormList] = useState([
    { title: '', valueType: 'text' },
    { title: '', valueType: 'select' },
    { title: '', valueType: 'dateRange' },
    { title: '', valueType: 'date' },
  ]);
  const onChangeFormList = (e, index) => {
    const newFormList = [...formList];
    newFormList[index].title = e.target.value;
    setFormList(newFormList);
  };

  const formListAdd = (index) => {
    const list = [...searchFormColumns];
    const newFormList = [...formList];
    let { title, valueType } = formList[index];
    if (!title) {
      title = valueType;
    }
    list.push({
      title,
      dataIndex: title,
      valueType,
      hideInTable: true,
    });
    newFormList[index].title = '';
    setSearchFormColumns(list);
    setFormList(newFormList);
  };

  return (
    <div className={styles.createForm}>
      <div className={styles.createFormContent}>
        <Row>
          {searchFormColumns.map((item, index) => (
            <Col span={8} key={index}>
              <Form.Item label={item.title}>
                {item.valueType === 'text' && <Input />}
                {item.valueType === 'select' && <Select />}
                {item.valueType === 'dateRange' && <RangePicker />}
                {item.valueType === 'date' && <DatePicker />}
              </Form.Item>
            </Col>
          ))}
        </Row>
      </div>
      <div className={styles.createFormList}>
        {formList.map((item, index) => (
          <div className={styles.formListItem} key={item.valueType}>
            <Input
              placeholder={item.valueType}
              className={styles.formListInput}
              value={item.title}
              onChange={(e) => onChangeFormList(e, index)}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => formListAdd(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
