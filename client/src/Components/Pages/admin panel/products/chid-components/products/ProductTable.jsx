import React from 'react';
import { Trash2, Edit } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-4">Image</th>
            <th className="p-4">Name</th>
            <th className="p-4">Price</th>
            <th className="p-4">Original Price</th>
            <th className="p-4">Sizes</th>
            <th className="p-4">Colors</th>
            <th className="p-4">Material</th>
            <th className="p-4">Badge</th>
            <th className="p-4">Description</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map((product) => (
              <tr key={product._id || product.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.price}</td>
                <td className="p-4">{product.originalPrice || '-'}</td>
                <td className="p-4">{(product.sizes || []).join(', ')}</td>
                <td className="p-4">{(product.colors || []).join(', ')}</td>
                <td className="p-4">{(product.material || []).join(', ')}</td>
                <td className="p-4">{product.badge || '-'}</td>
                <td className="p-4">{product.description}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center p-6 text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
