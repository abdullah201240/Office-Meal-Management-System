import { Request, Response } from 'express';
import User from '../models/user';
import Cart from '../models/cart';
import Food from '../models/foods';
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
    const cartItems = await Cart.findAll({ where: { userEmail } });

    if (!cartItems.length) {
      return res.status(404).json({ error: 'No items found in cart for this user' });
    }

    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
}