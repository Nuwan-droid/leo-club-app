import React, { useState } from 'react';
import ProductTable from './chid-components/ProductTable';
import AddProductModal from './chid-components/AddProductModal';
import EditProductModal from './chid-components/EditProductModal';
import ProductStats from './chid-components/ProductStats';

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Apple Watch Series 4',
      price: 690.00,
      piece: 63,
      description: 'Latest Apple smartwatch with health monitoring',
      details: 'Advanced health tracking features',
      material: 'Aluminum',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['black', 'gray', 'red'],
      sale: 'yes',
      mainImage: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=100&h=100&fit=crop',
      otherImages: []
    },
    {
      id: 2,
      name: 'Microsoft Headsquare',
      price: 190.00,
      piece: 13,
      description: 'Premium gaming headset',
      details: 'High-quality audio for gaming',
      material: 'Plastic and Metal',
      sizes: ['One Size'],
      colors: ['black', 'red', 'blue', 'yellow'],
      sale: 'no',
      mainImage: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop',
      otherImages: []
    },
    {
      id: 3,
      name: "Women's Dress",
      price: 640.00,
      piece: 635,
      description: 'Elegant evening dress',
      details: 'Perfect for special occasions',
      material: 'Cotton and Polyester',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['purple', 'blue', 'black', 'navy'],
      sale: 'yes',
      mainImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=100&h=100&fit=crop',
      otherImages: []
    },
    {
      id: 4,
      name: 'Samsung A50',
      price: 400.00,
      piece: 67,
      description: 'Mid-range smartphone',
      details: 'Great camera and battery life',
      material: 'Glass and Metal',
      sizes: ['One Size'],
      colors: ['blue', 'black', 'red'],
      sale: 'no',
      mainImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop',
      otherImages: []
    },
    {
      id: 5,
      name: 'Camera',
      price: 420.00,
      piece: 52,
      description: 'Professional DSLR camera',
      details: 'High resolution photography',
      material: 'Metal and Plastic',
      sizes: ['One Size'],
      colors: ['blue', 'black', 'red'],
      sale: 'yes',
      mainImage: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=100&h=100&fit=crop',
      otherImages: []
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const totalRows = products.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  const handleEditProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleSaveNewProduct = (productData) => {
    const newProduct = {
      id: products.length + 1,
      ...productData,
      colors: productData.colors.split(',').map(color => color.trim())
    };
    setProducts([...products, newProduct]);
    setIsAddModalOpen(false);
  };

  const handleSaveEditedProduct = (productData) => {
    setProducts(products.map(p => 
      p.id === editingProduct.id 
        ? { 
            ...p, 
            ...productData,
            colors: typeof productData.colors === 'string' 
              ? productData.colors.split(',').map(color => color.trim())
              : productData.colors
          } 
        : p
    ));
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const currentProducts = products.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, product) => sum + (product.price * product.piece), 0),
    onSaleProducts: products.filter(p => p.sale === 'yes').length,
    outOfStockProducts: products.filter(p => p.piece === 0).length
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Products</span>
          </button>
        </div>

        <ProductStats stats={stats} />

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ProductTable
            products={currentProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={(rows) => {
              setRowsPerPage(rows);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onSave={handleSaveNewProduct}
        onCancel={handleCancelAdd}
      />

      <EditProductModal
        isOpen={isEditModalOpen}
        product={editingProduct}
        onSave={handleSaveEditedProduct}
        onCancel={handleCancelEdit}
      />
    </div>
  );
};

export default Products;
