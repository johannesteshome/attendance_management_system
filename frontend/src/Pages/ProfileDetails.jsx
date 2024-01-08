import { Icon } from "@iconify/react";
import { Menu, Button, Form, Input, Select, InputNumber } from "antd";
import { useState } from "react";
const { Option } = Select;

const items = [
  {
    label: "Personal Information",
    key: "personal",
    icon: <Icon icon='ep:user' />,
  },
  {
    label: "Security",
    key: "security",
    icon: <Icon icon='material-symbols-light:security' />,
  },
];


const ProfileDetails = () => {
    const [current, setCurrent] = useState("personal");
    const onClick = (e) => {
      console.log("click ", e);
      setCurrent(e.key);
    };
  return (
    <div>
      <div className='flex items-center my-4'>
        <h1 className='text-3xl font-bold'>Profile Details</h1>
      </div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='horizontal'
        items={items}
      />
      {current === "personal" && (
        <div className='flex flex-col gap-4 bg-white p-4 rounded-br-md rounded-bl-md'>
          <Form
            name='wrap'
            labelCol={{
              flex: "110px",
            }}
            labelAlign='left'
            labelWrap
            wrapperCol={{
              flex: 1,
            }}
            colon={false}
            style={{
              maxWidth: 600,
            }}>
            <Form.Item
              label='Name'
              name='username'>
              <Input />
            </Form.Item>

            <Form.Item
              label='Phone Number'
              name='email'>
              <Input />
            </Form.Item>

            <Form.Item
              label='Gender'
              name='email'>
              <Select placeholder='Select your gender'>
                <Option value='male'>Male</Option>
                <Option value='female'>Female</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label='Age'
              name='email'>
              <InputNumber
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              label='Student ID'
              name='email'>
              <Input />
            </Form.Item>

            <Form.Item
              label='Section'
              name='email'>
              <Input />
            </Form.Item>

            <Form.Item
              label='Department'
              name='email'>
              <Input />
            </Form.Item>

            <Form.Item label=' '>
              <Button
                type='default'
                htmlType='submit'
                className='bg-blue-500 text-white hover:text-blue-500 hover:bg-white'>
                Edit Profile
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
      {current === "security" && (
        <div className='flex flex-col gap-4 bg-white p-4 rounded-br-md rounded-bl-md'>
          <Form
            name='wrap'
            labelCol={{
              flex: "200px",
            }}
            labelAlign='left'
            labelWrap
            wrapperCol={{
              flex: 1,
            }}
            colon={false}
            style={{
              maxWidth: 600,
            }}>
            <Form.Item
              label='Current Password'
              name='username'
              rules={[
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label='New Password'
              name='email'
              rules={[
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label='Confirm New Password'
              name='email'
              rules={[
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item label=' '>
              <Button
                type='default'
                htmlType='submit'
                className='bg-blue-500 text-white hover:text-blue-500 hover:bg-white'>
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}
export default ProfileDetails