import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, message, Form, Input } from 'antd';
import axios from 'axios';
import 'antd/dist/reset.css';

const ListProduct = ({ initialProducts = [] }) => {
  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchProducts = async (page, pageSize) => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhZnJpbiIsImlhdCI6MTcyNzcwODk0OSwiZXhwIjoxNzI3NzI2OTQ5fQ.zVyYLSOaTP2y0uSxogmIDTlmccmZa0Ns5y8HJ7SGYkw`, 
        },
        params: {
          page,
          pageSize,
        },
      });
      const fetchedProducts = response.data.products.map((product) => ({
        key: product.id,
        ...product,
      }));
      setProducts(fetchedProducts);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Failed to fetch products. Please try again.');
    }
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: `Product: ${record.productname}`,
      okText: 'Yes',
      cancelText: 'No',
      centered: true,
      icon: null,
      okButtonProps: {
        style: { backgroundColor: 'indigo-600', color: 'white' },
      },
      cancelButtonProps: {
        style: { backgroundColor: 'red',  color: 'white' },
      },
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/products/${record.key}`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhZnJpbiIsImlhdCI6MTcyNzcwODk0OSwiZXhwIjoxNzI3NzI2OTQ5fQ.zVyYLSOaTP2y0uSxogmIDTlmccmZa0Ns5y8HJ7SGYkw`,
            },
          });
          setProducts(products.filter((product) => product.key !== record.key));
          message.success('Product deleted successfully.');
        } catch (error) {
          console.error('Error deleting product:', error);
          message.error('Failed to delete product. Please try again.');
        }
      },
    });
  };

  const handleEdit = (record) => {
    setCurrentProduct(record);
    form.setFieldsValue({
      productName: record.productname,
      url: record.url,
      price: record.price,
    });
    setIsModalVisible(true);
  };
  
  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const updatedProduct = {
        productname: values.productName,
        url: values.url,
        price: values.price,
      };
  
      await axios.put(`http://localhost:5000/api/products/${currentProduct.key}`, updatedProduct, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhZnJpbiIsImlhdCI6MTcyNzcwODk0OSwiZXhwIjoxNzI3NzI2OTQ5fQ.zVyYLSOaTP2y0uSxogmIDTlmccmZa0Ns5y8HJ7SGYkw`,
        },
      });
  
      setProducts(products.map(product => 
        product.key === currentProduct.key ? updatedProduct : product
      ));
      
      message.success('Product updated successfully.');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating product:', error);
      message.error('Failed to update product. Please try again.');
    }
  };
  

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productname',
      key: 'productname',
      align: 'left',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      align: 'left',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
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
          <h2 className="text-gray-800 text-xl">Product List</h2>
        </div>
        <Table
          columns={columns}
          dataSource={products}
          rowKey="key"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
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

        {/* Edit Product Modal */}
        <Modal
          title="Edit Product"
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
              label="Product Name"
              name="productName"
              rules={[{ required: true, message: 'Please enter the product name!' }]}
            >
              <Input placeholder="Enter Product Name" />
            </Form.Item>
            <Form.Item
              label="URL"
              name="url"
              rules={[{ required: true, message: 'Please enter the product URL!' }]}
            >
              <Input placeholder="Enter Product URL" />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please enter the price!' }]}
            >
              <Input type="number" placeholder="Enter Price" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ListProduct;
