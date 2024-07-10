import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const defaultSecretKey = crypto.randomBytes(32).toString('hex');

export async function signup(req: Request, res: Response) {
    const { username, email, password } = req.body;
  
    try {
        if (!username || !email || !password ) {
            return res.status(400).json({ error: 'All fields are required' });
        }

      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ where: { email } });
  
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user instance with all required attributes
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  }


export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    // Find user by email
    const user = await User.findOne({ where: { email } });

    // If user not found, return 404
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If passwords don't match, return 401
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, defaultSecretKey, { expiresIn: '1h' });

    // Respond with token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
}
