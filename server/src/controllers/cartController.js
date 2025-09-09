import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Get user's cart
export const getCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    let cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    
    if (!cart) {
      // Create empty cart if doesn't exist
      cart = new Cart({ 
        userId: req.user._id, 
        items: [] 
      });
      await cart.save();
    }

    res.json({
      success: true,
      cart: {
        items: cart.items,
        totalAmount: cart.totalAmount,
        itemCount: cart.items.reduce((total, item) => total + item.quantity, 0)
      }
    });

  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while fetching cart" 
    });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    const { productId, name, price, image, size, color, quantity } = req.body;

    // Validate required fields
    if (!productId || !name || !price || !image || !size || !quantity) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Quantity must be positive" 
      });
    }

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    // Find or create user's cart
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    // Create unique item identifier
    const itemKey = `${productId}-${size}-${color || ''}`;
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(item => 
      item.productId.toString() === productId && 
      item.size === size && 
      item.color === (color || '')
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        productId,
        name,
        price,
        image,
        size,
        color: color || '',
        quantity
      });
    }

    await cart.save();

    console.log(`Added to cart for user ${req.user.email}: ${name} (${size}${color ? `, ${color}` : ''}) x${quantity}`);

    res.status(201).json({
      success: true,
      message: "Item added to cart",
      cart: {
        items: cart.items,
        totalAmount: cart.totalAmount,
        itemCount: cart.items.reduce((total, item) => total + item.quantity, 0)
      }
    });

  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while adding to cart" 
    });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    const { productId, size, color, quantity } = req.body;

    if (!productId || !size || quantity < 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid request data" 
      });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: "Cart not found" 
      });
    }

    const itemIndex = cart.items.findIndex(item => 
      item.productId.toString() === productId && 
      item.size === size && 
      item.color === (color || '')
    );

    if (itemIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: "Item not found in cart" 
      });
    }

    if (quantity === 0) {
      // Remove item if quantity is 0
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    res.json({
      success: true,
      message: quantity === 0 ? "Item removed from cart" : "Cart updated",
      cart: {
        items: cart.items,
        totalAmount: cart.totalAmount,
        itemCount: cart.items.reduce((total, item) => total + item.quantity, 0)
      }
    });

  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while updating cart" 
    });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    const { productId, size, color } = req.body;

    if (!productId || !size) {
      return res.status(400).json({ 
        success: false, 
        message: "Product ID and size are required" 
      });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ 
        success: false, 
        message: "Cart not found" 
      });
    }

    const originalLength = cart.items.length;
    cart.items = cart.items.filter(item => 
      !(item.productId.toString() === productId && 
        item.size === size && 
        item.color === (color || ''))
    );

    if (cart.items.length === originalLength) {
      return res.status(404).json({ 
        success: false, 
        message: "Item not found in cart" 
      });
    }

    await cart.save();

    res.json({
      success: true,
      message: "Item removed from cart",
      cart: {
        items: cart.items,
        totalAmount: cart.totalAmount,
        itemCount: cart.items.reduce((total, item) => total + item.quantity, 0)
      }
    });

  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while removing from cart" 
    });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { items: [], totalAmount: 0 },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: "Cart cleared",
      cart: {
        items: [],
        totalAmount: 0,
        itemCount: 0
      }
    });

  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while clearing cart" 
    });
  }
};

// Sync local cart with database cart (for when user logs in)
export const syncCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    const { localCartItems } = req.body;

    if (!Array.isArray(localCartItems)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid cart data" 
      });
    }

    // Find or create user's cart
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    // Merge local cart items with database cart
    for (const localItem of localCartItems) {
      const existingItemIndex = cart.items.findIndex(item => 
        item.productId.toString() === localItem.productId && 
        item.size === localItem.size && 
        item.color === (localItem.color || '')
      );

      if (existingItemIndex > -1) {
        // Add quantities if item exists
        cart.items[existingItemIndex].quantity += localItem.quantity;
      } else {
        // Add new item
        cart.items.push({
          productId: localItem.productId,
          name: localItem.name,
          price: localItem.price,
          image: localItem.image,
          size: localItem.size,
          color: localItem.color || '',
          quantity: localItem.quantity
        });
      }
    }

    await cart.save();

    console.log(`Cart synced for user ${req.user.email}: ${localCartItems.length} local items merged`);

    res.json({
      success: true,
      message: "Cart synced successfully",
      cart: {
        items: cart.items,
        totalAmount: cart.totalAmount,
        itemCount: cart.items.reduce((total, item) => total + item.quantity, 0)
      }
    });

  } catch (error) {
    console.error("Error syncing cart:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while syncing cart" 
    });
  }
};