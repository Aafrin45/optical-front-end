import React, { useState } from 'react';
import { message, Input, Form} from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [formState, setFormState] = useState({
    productId: '',
    url: '',
    price: '',
    message: '',
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', {
        productId: values.productId,
        url: values.url,
        price: values.price,
      });

      setFormState({
        productId: '',
        url: '',
        price: '',
        message: response.data.message,
      });
      form.resetFields();
      message.success('Product added successfully');
    } catch (error) {
      setFormState((prevState) => ({
        ...prevState,
        message: 'Error adding product',
      }));
      message.error('Error adding product');
      console.error(error);
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
            name="productId"
            rules={[{ required: true, message: 'Please enter the product name!' }]}
          >
            <Input
              value={formState.productId}
              onChange={(e) => setFormState({ ...formState, productId: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            label="URL"
            name="url"
            rules={[{ required: true, message: 'Please enter the URL!' }]}
          >
            <Input
              type="url"
              value={formState.url}
              onChange={(e) => setFormState({ ...formState, url: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please enter the price!' }]}
          >
            <Input
              type="number"
              value={formState.price}
              onChange={(e) => setFormState({ ...formState, price: e.target.value })}
            />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Product
            </button>
          </Form.Item>
        </Form>

        {formState.message && (
          <p className="text-center mt-2 text-green-600">{formState.message}</p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
