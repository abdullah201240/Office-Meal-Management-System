import { Request, Response } from 'express';
import User from '../models/user';

export async function getUser(req: Request, res: Response) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

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
