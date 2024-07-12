import { Request, Response } from 'express';
import User from '../models/user';

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
