import { Request, Response } from 'express';
import User from '../models/user';
import Cart from '../models/cart';
import Food from '../models/foods';
import Order from '../models/order';
// Get all users
export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

// Get a user by ID
export async function getUserById(req: Request, res: Response) {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(`Error fetching user with id ${userId}:`, error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

// Update a user by ID
export async function updateUser(req: Request, res: Response) {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Assuming req.body contains the updated user data
    await user.update(req.body);

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(`Error updating user with id ${userId}:`, error);
    res.status(500).json({ error: 'Failed to update user' });
  }
}

// Delete a user by ID
export async function deleteUser(req: Request, res: Response) {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(`Error deleting user with id ${userId}:`, error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

// Add item to cart
export async function addToCart(req: Request, res: Response) {
  try {
    const { foodId, userEmail } = req.body;

    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { id, name } = user;

    const food = await Food.findOne({ where: { id: foodId } });

    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }

    const { type } = food;

    let currentTime = new Date().getHours();
    let acceptOrder = false;

    // Determine if order can be accepted based on food type and current time
    if (type === 'Breakfast' && currentTime >= 6 && currentTime < 8) {
      acceptOrder = true;
    } else if (type === 'Lunch' && currentTime >= 6 && currentTime < 12) {
      acceptOrder = true;
    } else if (type === 'Dinner' && currentTime < 19) {
      acceptOrder = true;
    }

    // If conditions are not met, return an error response
    if (!acceptOrder) {
      return res.status(400).json({ error: 'Cannot place order at this time' });
    }

    // If conditions are met, create the cart item
    const { foodMenu, price, day, foodImage } = food;

    const cartItem = await Cart.create({
      foodId,
      foodMenu,
      type,
      price,
      day,
      foodImage,
      userId: id,
      userName: name,
      userEmail,
      status: 'Pending',
    });

    res.json(cartItem);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
}
// View cart items for a user by email
export async function viewCart(req: Request, res: Response) {
  const userEmail = req.query.userEmail as string;

  if (!userEmail) {
    return res.status(400).json({ error: 'User email is required' });
  }

  try {
    const cartItems = await Cart.findAll({ where: { userEmail, status: 'Pending' } });

    if (!cartItems.length) {
      return res.status(404).json({ error: 'No items found in cart for this user' });
    }

    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
}

// delete From Cart by id

export async function deleteFromCart(req: Request, res: Response) {
  const cartId = parseInt(req.params.id, 10);

  try {
    const cartItem = await Cart.findByPk(cartId);

    if (!cartItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await cartItem.destroy();

    res.json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error(`Error deleting cart item: id ${cartId}:`, error);
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
}

// placeOrder

export async function placeOrder(req: Request, res: Response) {
  const { userEmail } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find pending items in the user's cart
    const cartItems = await Cart.findAll({ where: { userEmail, status: 'Pending' } });
    if (!cartItems.length) {
      return res.status(404).json({ error: 'No pending items found in cart for this user' });
    }

    // Start a transaction for atomicity
    const transaction = await Cart.sequelize.transaction();

    try {
      // Prepare arrays to store individual item details
      const foodIds: number[] = [];
      const foodMenus: string[] = [];
      const foodTypes: string[] = [];
      const foodDays: string[] = [];
      const foodImages: string[] = [];
      let totalPrice = 0;


      // Collect item details
      cartItems.forEach(item => {
        foodIds.push(item.foodId);
        foodMenus.push(item.foodMenu);
        foodTypes.push(item.type);
        foodDays.push(item.day);
        foodImages.push(item.foodImage);
        totalPrice += parseFloat(item.price);
      });

      // Create a new order with individual item details
      const order = await Order.create({
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        foodId: foodIds.join(','), // Store as comma-separated string or adjust to array as needed
        foodMenu: foodMenus.join(','),
        type: foodTypes.join(','),
        day: foodDays.join(','),
        foodImage: foodImages.join(','),
        price: totalPrice,
        status: 'Pending',
      }, { transaction });

      // Update status of cart items to 'Ordered'
      await Promise.all(cartItems.map(async (cartItem) => {
        await cartItem.update({ status: 'Ordered' }, { transaction });
      }));

      // Commit the transaction if everything succeeds
      await transaction.commit();

      // Respond with success message and order ID
      res.json({ message: 'Order placed successfully', orderId: order.id });
    } catch (error) {
      // Rollback transaction on error
      await transaction.rollback();
      throw error; // Throw error to handle it in the catch block below
    }
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
}

// View Order items for a user by email
export async function viewOrder(req: Request, res: Response) {
  const userEmail = req.query.userEmail as string;

  if (!userEmail) {
    return res.status(400).json({ error: 'User email is required' });
  }

  try {
    const orderItems = await Order.findAll({ where: { userEmail } });

    if (!orderItems.length) {
      return res.status(404).json({ error: 'No items found in order for this user' });
    }

    res.json(orderItems);
  } catch (error) {
    console.error('Error fetching order items:', error);
    res.status(500).json({ error: 'Failed to fetch order items' });
  }
}
