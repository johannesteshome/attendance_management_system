import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Input, Button } from "antd";
import ticktime from '../img/ticktime-banner.png'
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  AdminResetPassword,
    AdminSendOTP,
    StudentResetPassword,
    StudentSendOTP,
    TeacherResetPassword,
    TeacherSendOTP
} from "../Redux/features/authActions"
import { useNavigate } from "react-router-dom";



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const notify = (text) => toast(text);



const ResetPasswordScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    const [formvalue, setFormvalue] = useState({
      email: query.get("email"),
      token: query.get("token"),
      password: ""
    });
  const role = query.get("role")
  const [form] = Form.useForm();
  
  const [isDisabled, setIsDisabled] = useState(true)

    const Handlechange = (e) => {
        setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
    };
    
    const [Loading, setLoading] = useState(false);

    const HandleSubmit = (e) => {
      setLoading(true);
      const role = query.get("role")
        if (role === "teacher") {
            dispatch(TeacherResetPassword(formvalue)).then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    notify("Reset Successful");
                    setLoading(false);
                    return navigate("/dashboard");
                }
                if (res.meta.requestStatus === "rejected") {
                    // console.log(res.payload.message);
                    setLoading(false);
                    notify("There's Something Wrong");
                }
            })
        }
        if (role === "admin") {
          console.log("here in the role");
          dispatch(AdminResetPassword(formvalue)).then((res) => {
            // console.log(res.meta.requestStatus);
            if (res.meta.requestStatus === "fulfilled") {
              notify("Reset Successful");
              setLoading(false);
              return navigate("/dashboard");
            }
            if (res.meta.requestStatus === "rejected") {
              setLoading(false);
              notify("There's Something Wrong");
            }
          });
        }
        if (role === "student") {
          dispatch(StudentResetPassword(formvalue)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
              notify("Reset Successful");
              setLoading(false);
              return navigate("/dashboard");
            }
            if (res.meta.requestStatus === "rejected") {
              setLoading(false);
              notify("There's Something Wrong");
            }
          });
        }
        
  }

  const handleConfirmPassword = (rule, value, callback) => {
    const password = form.getFieldValue("password");
    if (value && password !== value) {
      setIsDisabled(true)
      callback("The two passwords that you entered do not match!");
    } else {
      setIsDisabled(false)
      callback();
    }
  };
  

    return (
      <div className='flex flex-col items-center justify-center w-full h-screen gap-4'>
        <ToastContainer />
        <img
          src={ticktime}
          alt='TickTime Logo'
          className='w-[20%]'
          />
          <h1 className="font-bold text-2xl">Reset your Password</h1>
        <Form
          className="w-[60%]"
          layout='vertical'
          name="dependencies"
          form={form}
          onFinish={HandleSubmit}>
          <Form.Item
            className='w-full'
            name='password'
            label='Enter your new password:'
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <Input
              name='password'
              className='w-full'
              value={formvalue.otp}
              onChange={Handlechange}
              required
            />
          </Form.Item>

          <Form.Item
            className='w-full'
            name='confirmPassword'
            dependencies={['password']}
            hasFeedback
            label='Confirm your Password:'
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              {validator: handleConfirmPassword},
            ]}
          >
            <Input
              name='confirmPassword'
              className='w-full'
              value={formvalue.otp}
              onChange={Handlechange}
              required
            />
          </Form.Item>

          <Form.Item
            label=' '
            className="flex flex-col items-center justify-center"
            colon={false}>
            <Button
              type='default'
              className='bg-blue-500 text-white hover:text-blue-500 hover:bg-white text-lg flex items-center justify-center px-12 py-5 rounded-3xl'
              htmlType='submit'
            disabled={isDisabled}>
              {Loading ? "Loading..." : " Reset Password "}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
}
export default ResetPasswordScreen