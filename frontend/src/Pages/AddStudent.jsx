import React, { useState } from "react";
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AddStudent = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const prefixSelector = (
    <Form.Item
      name='prefix'
      noStyle>
      <Select
        style={{
          width: 100,
        }}>
        <Option value='251'>+251</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className='flex flex-col gap-4 my-4'>
      <div className='flex items-center'>
        <h1 className='text-3xl font-bold'>Register Student</h1>
      </div>
      <Form
        {...formItemLayout}
        form={form}
        name='register'
        onFinish={onFinish}
        initialValues={{
          prefix: "251",
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError>
        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name='name'
          label='Name'
          tooltip='What do you want others to call you?'
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name='studentID'
          label='Student ID'
          rules={[
            {
              required: true,
              message: "Please input your ID!",
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name='section'
          label='Section'
          rules={[
            {
              required: true,
              message: "Please input your Section!",
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name='department'
          label='Department'
          rules={[
            {
              required: true,
              message: "Please input your Department!",
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name='phone'
          label='Phone Number'
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}>
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          name='gender'
          label='Gender'
          rules={[
            {
              required: true,
              message: "Please select gender!",
            },
          ]}>
          <Select placeholder='select your gender'>
            <Option value='male'>Male</Option>
            <Option value='female'>Female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name='age'
          label='Age'
          rules={[
            {
              required: true,
              message: "Please input your age!",
            },
          ]}>
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name='year'
          label='Year'
          rules={[
            {
              required: true,
              message: "Please input your Year!",
            },
          ]}>
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          label='Captcha'
          extra='We must make sure that your are a human.'>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name='captcha'
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Please input the captcha you got!",
                  },
                ]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button htmlType='submit'>Register</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddStudent;
