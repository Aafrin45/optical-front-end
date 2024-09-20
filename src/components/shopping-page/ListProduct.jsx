import React, { useState } from 'react';
import { Table, Button, Space, Modal } from 'antd';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'antd/dist/reset.css';

const ListProduct = ({ initialProducts = [] }) => {
  const [products, setProducts] = useState(initialProducts.length > 0 ? initialProducts : [
  ]);

  const handleAddProduct = () => {
    
  };

  const handleEdit = (record) => {
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: `Product: ${record.productName}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        setProducts(products.filter((product) => product.key !== record.key));
        console.log('Deleted:', record);
      },
    });
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      align: 'left',
    },
    {
      title: 'Product URL',
      dataIndex: 'url',
      key: 'url',
      render: (url) => (
        <a href={url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      ),
      align: 'left',
    },
    {
      title: 'Product Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span>${price}</span>,
      align: 'right',
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
          <h2 className="text-gray-800 text-xl">Product List</h2>
          <Button type="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={products}
          rowKey="key"
          pagination={false}
          className="rounded-md shadow-md"
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
};

export default ListProduct;
