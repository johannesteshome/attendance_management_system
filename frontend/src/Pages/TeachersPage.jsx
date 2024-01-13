import { Table } from "antd";
import { Button, Form, Input, Modal, Radio } from "antd";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";

const columns = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Age",
    width: 100,
    dataIndex: "age",
    key: "age",
    fixed: "left",
  },
  {
    title: "Column 1",
    dataIndex: "address",
    key: "1",
    width: 150,
  },
  {
    title: "Column 2",
    dataIndex: "address",
    key: "2",
    width: 150,
  },
  {
    title: "Column 3",
    dataIndex: "address",
    key: "3",
    width: 150,
  },
  {
    title: "Column 4",
    dataIndex: "address",
    key: "4",
    width: 150,
  },
  {
    title: "Column 5",
    dataIndex: "address",
    key: "5",
    width: 150,
  },
  {
    title: "Column 6",
    dataIndex: "address",
    key: "6",
    width: 150,
  },
  {
    title: "Column 7",
    dataIndex: "address",
    key: "7",
    width: 150,
  },
  {
    title: "Column 8",
    dataIndex: "address",
    key: "8",
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => <a>action</a>,
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title='Create a new collection'
          okText='Assign Course'
          okType="default"
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}>
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        initialValues={{}}>
        <Form.Item
          name='teacher'
          label='Teacher Name'
          rules={[
            {
              required: true,
              message: "Please input the teacher name!",
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='course'
          label='Course'
          rules={[
            {
              required: true,
              message: "Please input the course name!",
            },
          ]}>
          <Input type='textarea' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const TeachersPage = () => {
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };
  return (
    <div className='flex flex-col gap-4 my-4'>
      <div className='flex items-center'>
        <h1 className='text-3xl font-bold'>Teachers List</h1>
      </div>
      <div className='flex items-center justify-end gap-4'>
        <Button
          onClick={() => setOpen(true)}
          className='bg-blue-500 text-white hover:bg-white hover:text-blue-500'>
          Assign Course
        </Button>
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Button className='flex items-center bg-blue-500 text-white hover:bg-white hover:text-blue-500'>
          <Link
            to='/dashboard/add-teacher'
            className='flex items-center text-black gap-2'>
            <Icon
              className='w-8 h-8'
              icon='material-symbols-light:add'
            />
            Add Teacher
          </Link>
        </Button>
      </div>
      {
        // TODO change the table with filters and editable rows - you can find it on the snippets extension
      }
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1500,
          y: 500,
        }}
      />
    </div>
  );
};
export default TeachersPage;
