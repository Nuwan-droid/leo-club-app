import React, { useState } from 'react';

const AddProductModal = ({ isOpen, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    details: '',
    material: '',
    sizes: 'XS,S,M,L,XL,XXL,XXXL',
    colors: 'black,blue,green',
    sale: 'yes',
    mainImage: null,
    otherImages: null,
    piece: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          [fieldName]: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.price) {
      onSave({
        ...formData,
        price: parseFloat(formData.price),
        piece: parseInt(formData.piece) || 0,
        sizes: formData.sizes.split(',').map(size => size.trim())
      });
      setFormData({
        name: '',
        price: '',
        description: '',
        details: '',
        material: '',
        sizes: 'XS,S,M,L,XL,XXL,XXXL',
        colors: 'black,blue,green',
        sale: 'yes',
        mainImage: null,
        otherImages: null,
        piece: ''
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      details: '',
      material: '',
      sizes: 'XS,S,M,L,XL,XXL,XXXL',
      colors: 'black,blue,green',
      sale: 'yes',
      mainImage: null,
      otherImages: null,
      piece: ''
    });
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto outline outline-black">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add Products</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  details
                </label>
                <input
                  type="text"
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  material
                </label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sizes
                </label>
                <input
                  type="text"
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="XS,S,M,L,XL,XXL,XXXL"
                />
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <span className="text-sm text-gray-600">One Size</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sale
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="sale"
                      value="yes"
                      checked={formData.sale === 'yes'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>yes</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="sale"
                      value="no"
                      checked={formData.sale === 'no'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>no</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Colors
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    name="colors"
                    value={formData.colors}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="none"
                  />
                  <div className="p-2 bg-gray-100 rounded">
                    <span className="text-sm text-gray-600">black,blue,green</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  main Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'mainImage')}
                    className="hidden"
                    id="mainImageUpload"
                  />
                  <label
                    htmlFor="mainImageUpload"
                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                  >
                    Choose File No file chosen
                  </label>
                  {formData.mainImage && (
                    <div className="mt-2">
                      <img
                        src={formData.mainImage}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg mx-auto"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  other Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileUpload(e, 'otherImages')}
                    className="hidden"
                    id="otherImagesUpload"
                  />
                  <label
                    htmlFor="otherImagesUpload"
                    className="cursor-pointer text-blue-500 hover:text-blue-700"
                  >
                    Choose File No file chosen
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Piece
                </label>
                <input
                  type="number"
                  name="piece"
                  value={formData.piece}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
