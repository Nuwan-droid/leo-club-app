import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const AddProduct = () => {
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    sizes: [],
    colors: [],
    material: [],
    badge: '',
    mainImage: '',
    additionalImages: []
  });

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'One Size'];
  const allColors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Gray', 'Dark Blue', 'Dark Green'];

  const mainImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) setMainImage(file);
  };

  const additionalImagesHandler = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalImages(files);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };


  const handleSizeSelection = (value) => {
    setProductDetails(prev => {
      const currentSizes = prev.sizes;

      if (value === 'One Size') {
        return {
          ...prev,
          sizes: currentSizes.includes('One Size') ? [] : ['One Size']
        };
      } else {
        if (currentSizes.includes('One Size')) return prev;

        const updatedSizes = currentSizes.includes(value)
          ? currentSizes.filter(size => size !== value)
          : [...currentSizes, value];

        return {
          ...prev,
          sizes: updatedSizes
        };
      }
    });
  };

  const handleColorSelection = (value) => {
    setProductDetails(prev => ({
      ...prev,
      colors: prev.colors.includes(value)
        ? prev.colors.filter(color => color !== value)
        : [...prev.colors, value]
    }));
  };

  const handleMaterialChange = (index, value) => {
    const newMaterials = [...productDetails.material];
    newMaterials[index] = value;
    setProductDetails(prev => ({ ...prev, material: newMaterials }));
  };

  const addMaterialField = () => {
    setProductDetails(prev => ({
      ...prev,
      material: [...prev.material, '']
    }));
  };

  const removeMaterialField = (index) => {
    setProductDetails(prev => ({
      ...prev,
      material: prev.material.filter((_, i) => i !== index)
    }));
  };

  const Add_Product = async (e) => {
    e.preventDefault();


    if (!productDetails.name || !productDetails.price || !productDetails.description) {
      alert('Please fill in all required fields (Name, Price, Description)');
      return;
    }

    if (!mainImage) {
      alert('Please select a main product image');
      return;
    }

  
    let product = {
      name: productDetails.name.trim(),
      price: parseFloat(productDetails.price) || 0,
      originalPrice: productDetails.originalPrice ? parseFloat(productDetails.originalPrice) : null,
      description: productDetails.description.trim(),
      sizes: productDetails.sizes,
      colors: productDetails.colors,
      material: productDetails.material.filter(m => m.trim() !== ''),
      badge: productDetails.badge ? productDetails.badge.trim() : null,
    };

    
    console.log('Product data before image upload:', JSON.stringify(product, null, 2));

   
    const formData = new FormData();
    if (mainImage) formData.append('mainImage', mainImage);
    additionalImages.forEach((img) => {
      formData.append('additionalImages', img);
    });

    try {
     
      console.log('Starting image upload...');
      const uploadRes = await fetch('http://localhost:5001/api/products/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) {
        const errorText = await uploadRes.text();
        console.error('Upload error response:', errorText);
        throw new Error(`Upload failed! status: ${uploadRes.status}. Response: ${errorText}`);
      }

      const responseData = await uploadRes.json();
      console.log('Upload response data:', responseData);

      if (responseData.success) {
        product.mainImage = responseData.main_image_url || '';
        product.additionalImages = responseData.additional_image_urls || [];
      } else {
        alert('Image Upload Failed: ' + (responseData.message || 'Unknown error'));
        return;
      }

     
      console.log('Final product data being sent:', JSON.stringify(product, null, 2));
      const addRes = await fetch('http://localhost:5001/api/products/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!addRes.ok) {
        const errorText = await addRes.text();
        console.error('Add product error response:', errorText);
        throw new Error(`Product addition failed! status: ${addRes.status}. Response: ${errorText}`);
      }

      const result = await addRes.json();
      console.log('Add product result:', result);

      if (result.success) {
        alert('Product Added Successfully!');
        setProductDetails({
          name: '',
          price: '',
          originalPrice: '',
          description: '',
          sizes: [],
          colors: [],
          material: [],
          badge: '',
          mainImage: '',
          additionalImages: []
        });
        setMainImage(null);
        setAdditionalImages([]);
        const mainImageInput = document.querySelector('input[name="mainImage"]');
        const additionalImagesInput = document.querySelector('input[name="additionalImages"]');
        if (mainImageInput) mainImageInput.value = '';
        if (additionalImagesInput) additionalImagesInput.value = '';
      } else {
        alert('Failed to add product: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      let userMessage = 'Something went wrong. Please try again.';
      if (error.message.includes('duplicate key')) {
        userMessage = 'Product ID conflict detected. Please try again.';
      } else if (error.message.includes('Upload failed')) {
        userMessage = 'Image upload failed. Please check your images and try again.';
      } else if (error.message.includes('Network')) {
        userMessage = 'Network error. Please check your connection and try again.';
      }
      alert(userMessage + '\n\nTechnical details: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4 text-black">
      <div className="bg-white shadow-xl rounded-2xl max-w-4xl mx-auto p-8 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8">Add New Product</h2>
        
        <form className="space-y-6" onSubmit={Add_Product}>
     
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input 
                name="name" 
                value={productDetails.name} 
                onChange={changeHandler} 
                required 
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Badge (Optional)</label>
              <input 
                name="badge" 
                value={productDetails.badge} 
                onChange={changeHandler} 
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="e.g., New, Sale, Popular"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">
                Current Price (Rs) <span className="text-red-500">*</span>
              </label>
              <input 
                type="number" 
                name="price" 
                min="0" 
                step="0.01" 
                value={productDetails.price} 
                onChange={changeHandler} 
                required 
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Original Price (Rs)</label>
              <input 
                type="number" 
                name="originalPrice" 
                min="0" 
                step="0.01" 
                value={productDetails.originalPrice} 
                onChange={changeHandler} 
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="0.00 (for sale items)"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea 
              name="description" 
              value={productDetails.description} 
              onChange={changeHandler} 
              required 
              className="w-full border px-4 py-2 rounded-lg h-28 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Describe your product..."
            />
          </div>

          
          <div>
            <label className="block font-semibold mb-2">Available Sizes</label>
            <div className="flex flex-wrap gap-2">
              {allSizes.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeSelection(size)}
                  className={`px-3 py-2 border rounded-lg font-medium transition-all duration-200 ${
                    productDetails.sizes.includes(size)
                      ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {productDetails.sizes.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {productDetails.sizes.join(', ')}
              </p>
            )}
          </div>

          
          <div>
            <label className="block font-semibold mb-2">Available Colors</label>
            <div className="flex flex-wrap gap-2">
              {allColors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorSelection(color)}
                  className={`px-3 py-2 border rounded-lg font-medium transition-all duration-200 ${
                    productDetails.colors.includes(color)
                      ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
            {productDetails.colors.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {productDetails.colors.join(', ')}
              </p>
            )}
          </div>

       
          <div>
            <label className="block font-semibold mb-2">Materials</label>
            {productDetails.material.map((mat, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input 
                  value={mat} 
                  onChange={(e) => handleMaterialChange(idx, e.target.value)} 
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="e.g., Cotton, Polyester"
                />
                <button 
                  onClick={() => removeMaterialField(idx)} 
                  type="button" 
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addMaterialField} 
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg mt-2 transition-colors duration-200"
            >
              Add Material
            </button>
          </div>

        
          <div>
            <label className="block font-semibold mb-2">
              Main Product Image <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                {mainImage ? (
                  <img 
                    src={URL.createObjectURL(mainImage)} 
                    className="w-full h-full object-cover rounded-lg" 
                    alt="Main Preview" 
                  />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <input 
                name="mainImage" 
                type="file" 
                accept="image/*" 
                onChange={mainImageHandler} 
                required 
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200" 
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">Additional Images</label>
            <input 
              name="additionalImages" 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={additionalImagesHandler} 
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200" 
            />
            {additionalImages.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {additionalImages.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={URL.createObjectURL(img)} 
                    className="w-16 h-16 rounded object-cover border-2 border-gray-200" 
                    alt={`additional-${idx}`} 
                  />
                ))}
              </div>
            )}
          </div>

         
          <div className="flex justify-center pt-6">
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;