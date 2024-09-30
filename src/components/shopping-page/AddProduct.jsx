import React from 'react';
import { message, Input,Button, Form } from 'antd';
import axios from 'axios';

const AddProduct = ({ onProductAdded }) => {
  const [form] = Form.useForm();
  
        const handleSubmit = async (values) => {
          try {
            const response = await axios.post('http://localhost:5000/api/products', {
              productname: values.productname, 
              url: values.url,
              price: values.price,
            }, { 
              headers: { 
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhZnJpbiIsImlhdCI6MTcyNzcwODk0OSwiZXhwIjoxNzI3NzI2OTQ5fQ.zVyYLSOaTP2y0uSxogmIDTlmccmZa0Ns5y8HJ7SGYkw`, 
              },
            });

            form.resetFields();
            message.success('Product added successfully');
            
            onProductAdded(response.data);
          } catch (error) {
            console.error('Error adding product:', error);
          }
        };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm md:w-96">
        <h2 className="text-center mb-4 text-gray-800 text-xl">Add Product</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Product Name"
            name="productname" 
            rules={[{ required: true, message: 'Please enter the product name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="URL"
            name="url"
            rules={[{ required: true, message: 'Please enter the URL!' }]}
          >
            <Input type="url" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please enter the price!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
