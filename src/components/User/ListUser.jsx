import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, message, Form, Input } from 'antd';
import axios from 'axios';
import 'antd/dist/reset.css';

const ListUser = ({ initialUsers = [] }) => {
  const [users, setUsers] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0); // Total number of users for pagination
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchUsers = async (page, pageSize) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users`, {
        params: {
          page: page,
          limit: pageSize,
        },
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhZnJpbiIsImlhdCI6MTcyNzcwODk0OSwiZXhwIjoxNzI3NzI2OTQ5fQ.zVyYLSOaTP2y0uSxogmIDTlmccmZa0Ns5y8HJ7SGYkw`,
        },
      });
      
      const fetchedUsers = response.data.users.map((user) => ({
        key: user.id,
        ...user,
      }));
      setUsers(fetchedUsers);
      setTotalUsers(response.data.total); // Total users from response for pagination
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: `User: ${record.firstname} ${record.lastname}`,
      okText: 'Yes',
      cancelText: 'No',
      centered: true,
      icon: null,
      okButtonProps: {
        style: { backgroundColor: 'indigo-600', color: 'white' },
      },
      cancelButtonProps: {
        style: { backgroundColor: 'red', color: 'white' },
      },
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/users/${record.key}`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhZnJpbiIsImlhdCI6MTcyNzcwODk0OSwiZXhwIjoxNzI3NzI2OTQ5fQ.zVyYLSOaTP2y0uSxogmIDTlmccmZa0Ns5y8HJ7SGYkw`,
            },
          });
          setUsers(users.filter((user) => user.key !== record.key));
          message.success('User deleted successfully.');
        } catch (error) {
          console.error('Error deleting user:', error);
          message.error('Failed to delete user. Please try again.');
        }
      },
    });
  };

  const handleEdit = (record) => {
    setCurrentUser(record);
    form.setFieldsValue({ 
      firstName: record.firstname, 
      lastName: record.lastname, 
      email: record.email,
      password: record.password 
    });
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const updatedUser = {
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        password: values.password,
      };

      await axios.put(`http://localhost:5000/api/users/${currentUser.key}`, updatedUser, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhZnJpbiIsImlhdCI6MTcyNzcwODk0OSwiZXhwIjoxNzI3NzI2OTQ5fQ.zVyYLSOaTP2y0uSxogmIDTlmccmZa0Ns5y8HJ7SGYkw`,
        },
      });

      setUsers(users.map(user => user.key === currentUser.key ? updatedUser : user));
      message.success('User updated successfully.');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('Failed to update user. Please try again.');
    }
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
      align: 'left',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
      align: 'left',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'left',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      align: 'left',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<i className="bi bi-pencil-square text-blue-500"></i>}
            title="Edit"
            onClick={() => handleEdit(record)}
          />
          <Button
            type="link"
            icon={<i className="bi bi-trash text-red-500"></i>}
            title="Delete"
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-4 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-800 text-xl">User List</h2>
        </div>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="key"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: totalUsers,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
          }}
          className="rounded-md shadow-md"
          scroll={{ x: 'max-content' }}
        />

        {/* Edit User Modal */}
        <Modal
          title="Edit User"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsModalVisible(false)} style={{ backgroundColor: 'red', color: 'white' }}>
              Cancel
            </Button>,
            <Button key="update" type="primary" onClick={handleUpdate} style={{ backgroundColor: 'indigo-600', color: 'white' }}>
              Update
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please enter the first name!' }]}
            >
              <Input placeholder="Enter First Name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please enter the last name!' }]}
            >
              <Input placeholder="Enter Last Name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter the email!' }, { type: 'email', message: 'Invalid email format' }]}
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
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ListUser;
