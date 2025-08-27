import React, { useState, useEffect } from 'react';
import AddProduct from './chid-components/products/AddProduct';
import DeleteConfirmationModal from './chid-components/products/DeleteConfirmationModal';
import EditProductModal from './chid-components/products/EditProductModal';
import ProductStats from './chid-components/products/ProductStats';
import ProductTable from './chid-components/products/ProductTable';

const ListProducts = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    sizes: [],
    colors: [],
    material: [],
    badge: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products/allproducts');
      const data = await response.json();
      console.log('Fetched products:', data); // Debug log
      // Transform products to include image field
      const transformedProducts = data.map(product => ({
        ...product,
        image: product.mainImage // Map mainImage to image for ProductTable
      }));
      setAllProducts(transformedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteDialog(true);
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setEditFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || '',
      description: product.description,
      sizes: product.sizes || [],
      colors: product.colors || [],
      material: product.material || [],
      badge: product.badge || ''
    });
    setShowEditDialog(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleArrayChange = (field, idx, val) => {
    const arr = Array.isArray(editFormData[field]) ? [...editFormData[field]] : [];
    arr[idx] = val;
    setEditFormData({ ...editFormData, [field]: arr });
  };

  const handleAddArrayField = (field) => {
    setEditFormData({ ...editFormData, [field]: [...(editFormData[field] || []), ''] });
  };

  const handleRemoveArrayField = (field, idx) => {
    setEditFormData({
      ...editFormData,
      [field]: editFormData[field].filter((_, i) => i !== idx)
    });
  };

  const confirmUpdate = async () => {
    if (!productToEdit) return;

    const updatedProduct = {
      id: productToEdit._id || productToEdit.id,
      ...editFormData,
      price: parseFloat(editFormData.price) || 0,
      originalPrice: editFormData.originalPrice ? parseFloat(editFormData.originalPrice) : null
    };
    try {
      const res = await fetch('http://localhost:5001/api/products/updateproduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      });
      const result = await res.json();
      if (result.success) {
        fetchProducts();
        setShowEditDialog(false);
        setProductToEdit(null);
        alert('Product updated successfully!');
      } else {
        alert('Failed to update: ' + result.message);
      }
    } catch (err) {
      console.error(err);
      alert('Update error.');
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const res = await fetch('http://localhost:5001/api/products/removeproduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productToDelete._id || productToDelete.id })
      });

      const result = await res.json();
      if (result.success) {
        fetchProducts();
        setShowDeleteDialog(false);
        setProductToDelete(null);
        alert('Product deleted.');
      } else {
        alert('Delete failed: ' + result.message);
      }
    } catch (err) {
      console.error(err);
      alert('Delete error.');
    }
  };

  return (
    <div className="min-h-screen text-black bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">All Products</h1>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Products</h1>
        <button
          onClick={() => setShowAddDialog(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          + Add Products
        </button>
      </div>

      <ProductStats products={allProducts} />
      <ProductTable products={allProducts} onEdit={handleEditClick} onDelete={handleDeleteClick} />

      {showAddDialog && (
        <div className="fixed inset-0 bg-[#000000b0] z-50 flex items-center justify-center overflow-y-auto">
          <div className="relative bg-white w-full max-w-5xl mx-4 my-10 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddDialog(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold z-10"
            >
              ✕
            </button>
            <AddProduct />
          </div>
        </div>
      )}

      <EditProductModal
        show={showEditDialog}
        formData={editFormData}
        onChange={handleEditInputChange}
        onArrayChange={handleArrayChange}
        onAddArrayField={handleAddArrayField}
        onRemoveArrayField={handleRemoveArrayField}
        onCancel={() => setShowEditDialog(false)}
        onUpdate={confirmUpdate}
      />

      <DeleteConfirmationModal
        show={showDeleteDialog}
        product={productToDelete}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ListProducts;