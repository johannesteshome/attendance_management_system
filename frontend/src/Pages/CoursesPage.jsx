import { Table } from "antd";
import { Button } from "antd";
import { Icon } from "@iconify/react";

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

const CoursesPage = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center'>
        <h1 className='text-3xl font-bold'>Teachers List</h1>
      </div>
      <div className='flex items-center justify-end gap-4'>
        <Button>Assign Course</Button>
        <Button className='flex items-center text-black gap-2'>
          <Icon
            className='w-8 h-8'
            icon='material-symbols-light:add'
          />
          Add Teacher
        </Button>
      </div>
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
export default CoursesPage;
