import { Icon } from "@iconify/react";
import { Menu, Button, Form, Input, Select, InputNumber } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchAdmin, FetchAllDepartments, FetchStudent, FetchTeacher, UpdateAdmin, UpdateStudent, UpdateTeacher } from "../Redux/features/dataActions";
import { ToastContainer, toast } from "react-toastify";
import { AdminChangePassword, StudentChangePassword, TeacherChangePassword } from "../Redux/features/authActions";
const { Option } = Select;
const notify = (text) => toast(text);

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
  const { role, _id } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  // console.log(role, "role");
  
  //useEffect to fetch all departments
  useEffect(() => {
    dispatch(FetchAllDepartments());
  }, []);

  useEffect(() => {
    if (role === "admin") {
      // console.log("here", role, _id);F
      dispatch(FetchAdmin(_id)).then(
        (res) => {
          if (res.meta.requestStatus === "fulfilled") {
            // console.log(res.payload, "payload");
            // setInitialValues({...initialValues, name: res.payload.name});
          }
          else if(res.meta.requestStatus === "rejected"){
            return notify(res.payload);
          }
        }
      );
    }
    if (role === "teacher") {
      dispatch(FetchTeacher(_id));
    }
    if (role === "student") {
      dispatch(FetchStudent(_id));
    }
  }, [role, _id]);

  const departments = useSelector((state) => state.data.departments);
  const user = useSelector((state) => state.data.loggedInUser);
  const [initialValues, setInitialValues] = useState({
    name: user.name,
    email: user.email,
    mobile: user?.mobile || "",
    gender: user?.gender || "",
    department: user?.department || "",
    age: user?.age || "",
    year: user?.year || "",
    section: user?.section || "",
    studentID: user?.studentID || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [form] = Form.useForm();
  // console.log(user, "user");
    const onClick = (e) => {
      // console.log("click ", e);
      setCurrent(e.key);
  };

  const onFinishProfile = async (values) => {
    setIsLoading(true);
    console.log("here on finish profile", role === "admin");
    if (role === "admin") {
      console.log("here");
      dispatch(UpdateAdmin({ ...values, _id })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsLoading(false);
          return notify(res.payload.message);
        }
        if (res.meta.requestStatus === "rejected") {
          setIsLoading(false);
          return notify(res.payload.message);
        }
      });
    } else if (role === "teacher") {
      dispatch(UpdateTeacher({ ...values, _id })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsLoading(false);
          return notify(res.payload.message);
        }
        if (res.meta.requestStatus === "rejected") {
          setIsLoading(false);
          return notify(res.payload.message);
        }
      });
    } else if (role === "student") {
      dispatch(UpdateStudent({ ...values, _id })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsLoading(false);
          return notify(res.payload.message);
        }
        if (res.meta.requestStatus === "rejected") {
          setIsLoading(false);
          return notify(res.payload.message);
        }
      });
    }
    
  }

  const onFinishPassword = (values) => {
    console.log(values);
    setIsLoading(true);
    console.log("here on finish profile", role === "admin");
    if (role === "admin") {
      console.log("here");
      dispatch(AdminChangePassword({ ...values, _id })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsLoading(false);
          return notify(res.payload.message);
        }
        if (res.meta.requestStatus === "rejected") {
          setIsLoading(false);
          return notify(res.payload.message);
        }
      });
    }
    else if (role === "teacher") {
      console.log("here");
      dispatch(TeacherChangePassword({ ...values, _id })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsLoading(false);
          return notify(res.payload.message);
        }
        if (res.meta.requestStatus === "rejected") {
          setIsLoading(false);
          return notify(res.payload.message);
        }
      });
    }
    else if (role === "student") {
      console.log("here");
      dispatch(StudentChangePassword({ ...values, _id })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsLoading(false);
          return notify(res.payload.message);
        }
        if (res.meta.requestStatus === "rejected") {
          setIsLoading(false);
          return notify(res.payload.message);
        }
      });
    }
  }

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

  const handleConfirmPassword = (rule, value, callback) => {
    const password = form.getFieldValue("newPassword");
    if (value && password !== value) {
      setIsDisabled(true);
      callback("The two passwords that you entered do not match!");
    } else {
      setIsDisabled(false);
      callback();
    }
  };
  
  
  return (
    <div>
      <div className='flex items-center my-4'>
        <h1 className='text-3xl font-bold'>Profile Details</h1>
      </div>
      <ToastContainer />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='horizontal'
        items={items}
      />
      {current === "personal" && (
        <div className='flex flex-col gap-4 bg-white p-4 rounded-br-md rounded-bl-md'>
          <Form
            name='profileDetails'
            form={form}
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
            }}
            initialValues={{...initialValues, prefix: "251"}}
            onFinish={onFinishProfile}>
            <Form.Item
              label='Name'
              name='name'
              rules={[{ required: true, message: "Please input your name!" }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, message: "Please input your email!" }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label='Phone Number'
              name='mobile'
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
              minLength={9}
              maxLength={9}>
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
                maxLength={9}
                minLength={9}
              />
            </Form.Item>

            <Form.Item
              label='Gender'
              name='gender'
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}>
              <Select placeholder='Select your gender'>
                <Option value='male'>Male</Option>
                <Option value='female'>Female</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label='Age'
              name='age'
              rules={[{ required: true, message: "Please input your age!" }]}>
              <InputNumber
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            {role === "student" && (
              <>
                <Form.Item
                  label='Student ID'
                  name='studentID'
                  rules={[
                    {
                      required: true,
                      message: "Please input your student ID!",
                    },
                  ]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Section'
                  name='section'
                  rules={[
                    { required: true, message: "Please input your section!" },
                  ]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Department'
                  name='department'
                  rules={[
                    {
                      required: true,
                      message: "Please select your department!",
                    },
                  ]}>
                  <Select placeholder='Select your department'>
                    {departments.map((department) => (
                      <Option
                        value={department.id}
                        key={department.id}>
                        {department.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </>
            )}

            <Form.Item label=' '>
              <Button
                type='default'
                htmlType='submit'
                className='bg-blue-500 text-white hover:text-blue-500 hover:bg-white'>
                { isLoading ? "Loading..." : "Edit Profile"}
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
            }}
            form={form}
          onFinish={onFinishPassword}>
            <Form.Item
              label='Current Password'
              name='oldPassword'
              rules={[
                {
                  required: true,
                  message: "Please input your current password!",
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label='New Password'
              name='newPassword'
              rules={[
                {
                  required: true,
                  message: "Please input your New Password!",
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label='Confirm New Password'
              name='confirmPassword'
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                {validator: handleConfirmPassword}
              ]}>
              <Input />
            </Form.Item>

            <Form.Item label=' '>
              <Button
                type='default'
                htmlType='submit'
                disabled={isDisabled}
                className='bg-blue-500 text-white hover:text-blue-500 hover:bg-white'>
                {isLoading ? "Loading..." : "Change Password"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}
export default ProfileDetails