import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const AddUser = ({ onAddUser }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    if (!validateEmail(values.email)) {
      message.error('Invalid email format');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
      }, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhZnJpbiIsImlhdCI6MTcyNzcwODk0OSwiZXhwIjoxNzI3NzI2OTQ5fQ.zVyYLSOaTP2y0uSxogmIDTlmccmZa0Ns5y8HJ7SGYkw`, 
        },
      });

      
      form.resetFields();
      message.success('User added successfully');

      onAddUser(response.data);

    } catch (error) {
      if (error.response && error.response.status === 409) {
        message.error('Email is already registered. Please use a different email.');
      } else {
        console.error('Error adding user:', error);
        // message.error('An error occurred while adding the user.');
      }
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
        >
          <Form.Item
            label="First Name"
            name="firstname"
            rules={[{ required: true, message: 'Please enter the first name!' }]}
          >
            <Input placeholder="Enter First Name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[{ required: true, message: 'Please enter the last name!' }]}
          >
            <Input placeholder="Enter Last Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter the email!' },
              { type: 'email', message: 'Invalid email format' },
            ]}
          >
            <Input placeholder="Enter Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter the password!' }]}
          >
            <Input.Password placeholder="Enter Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit" 
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add User
            </Button></Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddUser;
