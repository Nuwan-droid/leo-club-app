import React from 'react';

const EditProductModal = ({
  show,
  formData,
  onChange,
  onArrayChange,
  onAddArrayField,
  onRemoveArrayField,
  onCancel,
  onUpdate,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-[#000000b0] bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-xl mx-4 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <div className="space-y-4">
          {['name', 'price', 'originalPrice', 'badge'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium capitalize mb-1">
                {field === 'originalPrice' ? 'Original Price' : field}
              </label>
              <input
                type={field === 'price' || field === 'originalPrice' ? 'number' : 'text'}
                name={field}
                value={formData[field]}
                onChange={onChange}
                className="w-full border px-3 py-2 rounded-lg focus:ring-blue-500 focus:ring-2"
              />
            </div>
          ))}

          {['sizes', 'colors', 'material'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium capitalize mb-1">{field}</label>
              {(formData[field] || []).map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-1">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => onArrayChange(field, idx, e.target.value)}
                    className="flex-1 border px-3 py-2 rounded-lg focus:ring-blue-500 focus:ring-2"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveArrayField(field, idx)}
                    className="px-2 py-1 bg-red-400 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => onAddArrayField(field)}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-700"
              >
                Add {field.slice(0, -1)}
              </button>
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring-blue-500 focus:ring-2"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
