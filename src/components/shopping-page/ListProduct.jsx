import React from 'react';

const ListProduct = ({ products = [] }) => {
  const displayProducts =
    products.length > 0
      ? products
      : [
          { productId: 'P001', url: 'https://example.com/product1', price: '19.99' },
          { productId: 'P002', url: 'https://example.com/product2', price: '29.99' },
          { productId: 'P003', url: 'https://example.com/product3', price: '39.99' },
        ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-4 rounded-md shadow-md">
        <h2 className="text-center mb-4 text-gray-800 text-xl">Product List</h2>
        {displayProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white rounded-md shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                   Product URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayProducts.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900">
                      {product.productId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">
                      <a href={product.url} className="text-blue-500 hover:underline">
                        {product.url}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No products added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
