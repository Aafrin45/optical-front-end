import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const AddUser = ({ onAddUser }) => {
  const [form] = Form.useForm();
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    message: '',
  });

  const handleSubmit = async (values) => {
    if (!validateEmail(values.email)) {
      message.error('Invalid email format');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });

      const newUser = response.data;

      onAddUser(newUser);

      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        message: response.data.message || 'User added successfully',
      });
      form.resetFields();
      message.success('User added successfully');
    } catch (error) {
      setFormState((prevState) => ({
        ...prevState,
        message: 'Error adding user',
      }));
      message.error('Error adding user');
      console.error(error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm md:w-96">
        <h2 className="text-center mb-4 text-gray-800 text-xl">Add User</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={formState}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please enter the first name!' }]}
          >
            <Input
              placeholder="Enter First Name"
            />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please enter the last name!' }]}
          >
            <Input
              placeholder="Enter Last Name"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter the email!' },
              { type: 'email', message: 'Invalid email format' },
            ]}
          >
            <Input
              placeholder="Enter Email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter the password!' }]}
          >
            <Input.Password
              placeholder="Enter Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              Add User
            </Button>
          </Form.Item>
        </Form>

        {formState.message && (
          <p className="text-center mt-2 text-red-600">{formState.message}</p>
        )}
      </div>
    </div>
  );
};

export default AddUser;
