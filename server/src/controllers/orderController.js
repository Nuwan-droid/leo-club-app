import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { 
      order_id, 
      items, 
      customer_info, 
      payment_amount,
      customer_type // 'member' or 'visitor'
    } = req.body;

    // Validate required fields
    if (!order_id || !items || !items.length || !customer_info || !payment_amount) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    let customerData = {};

    if (customer_type === 'member') {
      // For members, get user data from token
      if (!req.user) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required for member orders" 
        });
      }

      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }

      customerData = {
        type: 'member',
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
        leo_Id: user.leo_Id
      };
    } else {
      // For visitors, use provided customer info
      const { firstName, lastName, email, mobile, address } = customer_info;

      // Validate visitor info
      if (!firstName || !lastName || !email || !mobile || !address) {
        return res.status(400).json({ 
          success: false, 
          message: "All customer details are required for visitor orders" 
        });
      }

      // Validate email format
      const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid email format" 
        });
      }

      // Validate mobile number (10 digits)
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(mobile)) {
        return res.status(400).json({ 
          success: false, 
          message: "Mobile number must be exactly 10 digits" 
        });
      }

      customerData = {
        type: 'visitor',
        firstName,
        lastName,
        email,
        mobile,
        address
      };
    }

    // Validate and process items
    const processedItems = [];
    let calculatedTotal = 0;

    for (const item of items) {
      const { productId, name, size, color, quantity, unitPrice } = item;

      if (!productId || !name || !size || !quantity || !unitPrice) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid item data" 
        });
      }

      if (quantity <= 0 || unitPrice <= 0) {
        return res.status(400).json({ 
          success: false, 
          message: "Quantity and price must be positive numbers" 
        });
      }

      const totalPrice = unitPrice * quantity;
      calculatedTotal += totalPrice;

      processedItems.push({
        productId,
        name,
        size,
        color: color || '',
        quantity,
        unitPrice,
        totalPrice
      });
    }

    // Verify the calculated total matches the provided amount
    if (Math.abs(calculatedTotal - payment_amount) > 0.01) {
      return res.status(400).json({ 
        success: false, 
        message: "Total amount mismatch" 
      });
    }

    // Create the order
    const order = new Order({
      order_id,
      customer: customerData,
      items: processedItems,
      payment: {
        amount: payment_amount,
        status: 'pending'
      }
    });

    await order.save();

    console.log(`Order created: ${order_id} for ${customer_type}:`, 
      customer_type === 'member' ? req.user.email : customerData.email);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: {
        id: order._id,
        order_id: order.order_id,
        customer_type: customer_type,
        total_amount: payment_amount,
        status: order.orderStatus
      }
    });

  } catch (error) {
    console.error("Error creating order:", error);
    
    if (error.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        message: "Order ID already exists" 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Server error while creating order" 
    });
  }
};

// Get user's orders (for members only)
export const getUserOrders = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    const orders = await Order.find({ 
      'customer.userId': req.user._id 
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders: orders.map(order => ({
        id: order._id,
        order_id: order.order_id,
        items: order.items,
        total_amount: order.payment.amount,
        payment_status: order.payment.status,
        order_status: order.orderStatus,
        created_date: order.createdAt
      }))
    });

  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while fetching orders" 
    });
  }
};

// Update order status (for admin use)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status, paymentStatus } = req.body;

    if (!orderId) {
      return res.status(400).json({ 
        success: false, 
        message: "Order ID is required" 
      });
    }

    const updateData = {};
    
    if (status) {
      const validStatuses = ['processing', 'confirmed', 'shipped', 'delivered', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid order status" 
        });
      }
      updateData.orderStatus = status;
    }

    if (paymentStatus) {
      const validPaymentStatuses = ['pending', 'completed', 'failed', 'cancelled'];
      if (!validPaymentStatuses.includes(paymentStatus)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid payment status" 
        });
      }
      updateData['payment.status'] = paymentStatus;
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    res.json({
      success: true,
      message: "Order updated successfully",
      order: {
        id: order._id,
        order_id: order.order_id,
        order_status: order.orderStatus,
        payment_status: order.payment.status
      }
    });

  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while updating order" 
    });
  }
};

// Get all orders (for admin use)
export const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, customer_type } = req.query;
    
    const filter = {};
    if (status) filter.orderStatus = status;
    if (customer_type) filter['customer.type'] = customer_type;

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalOrders = await Order.countDocuments(filter);

    res.json({
      success: true,
      orders: orders.map(order => ({
        id: order._id,
        order_id: order.order_id,
        customer: {
          type: order.customer.type,
          name: `${order.customer.firstName} ${order.customer.lastName}`,
          email: order.customer.email,
          mobile: order.customer.mobile
        },
        items_count: order.items.length,
        total_amount: order.payment.amount,
        payment_status: order.payment.status,
        order_status: order.orderStatus,
        created_date: order.createdAt
      })),
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(totalOrders / limit),
        total_orders: totalOrders,
        has_next: page * limit < totalOrders,
        has_prev: page > 1
      }
    });

  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while fetching orders" 
    });
  }
};

// Get order details by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Order not found" 
      });
    }

    // Check if user has permission to view this order
    if (req.user && order.customer.userId) {
      // Member accessing their own order
      if (order.customer.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied" 
        });
      }
    }

    res.json({
      success: true,
      order: {
        id: order._id,
        order_id: order.order_id,
        customer: order.customer,
        items: order.items,
        payment: order.payment,
        order_status: order.orderStatus,
        created_date: order.createdAt,
        updated_date: order.updatedAt
      }
    });

  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while fetching order" 
    });
  }
};