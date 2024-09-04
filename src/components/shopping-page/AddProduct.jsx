import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [formState, setFormState] = useState({
    productId: '',
    url: '',
    price: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/products', {
        productId: formState.productId,
        url: formState.url,
        price: formState.price,
      });

      setFormState({
        productId: '',
        url: '',
        price: '',
        message: response.data.message,
      });
    } catch (error) {
      setFormState((prevState) => ({
        ...prevState,
        message: 'Error adding product',
      }));
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 max-w-sm">
        <h2 className="text-center mb-4 text-gray-800 text-xl">Add Product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-3">
            <label className="block mb-1 text-gray-600 font-light text-left">Product ID</label>
            <input
              type="text"
              name="productId"
              value={formState.productId}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md box-border focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1 text-gray-600 font-light text-left">URL</label>
            <input
              type="text"
              name="url"
              value={formState.url}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md box-border focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1 text-gray-600 font-light text-left">Price</label>
            <input
              type="number"
              name="price"
              value={formState.price}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md box-border focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-2/5 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out mx-auto"
          >
            Add Product
          </button>
        </form>
        {formState.message && <p className="text-center mt-2 text-green-600">{formState.message}</p>}
      </div>
    </div>
  );
};

export default AddProduct;
