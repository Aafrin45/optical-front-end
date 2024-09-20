import React from 'react';
import { Table, Button, Space, Modal } from 'antd';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'antd/dist/reset.css';

const ListUsers = ({ initialUsers = [] }) => {
  const [users, setUsers] = React.useState(initialUsers);

  const handleEdit = (record) => {
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: `User: ${record.firstName} ${record.lastName}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        setUsers(prevUsers => prevUsers.filter(user => user.key !== record.key));
        console.log('Deleted:', record);
      },
    });
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      align: 'left',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
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
      render: (password) => <span>{password}</span>,
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
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-800 text-xl font-semibold">User List</h2>
          <Button
            type="primary"
            onClick={() => console.log('Add User')}
          >
            Add User
          </Button>
        </div>
        <Table dataSource={users} columns={columns} rowKey="id" />
      </div>
    </div>
  );
};

export default ListUsers;
