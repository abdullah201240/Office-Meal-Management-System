import { Request, Response } from 'express';
import Foods from '../models/foods';

export const addFoodItem = async (req: Request, res: Response) => {
    try {
        const { foodMenu, type, price, day } = req.body;
        const foodImage = req.file?.path;

        if (!foodImage) {
            return res.status(400).json({ error: 'Food image is required' });
        }

        const newFoodItem = await Foods.create({
            foodMenu,
            type,
            price,
            day,
            foodImage,
        });

        res.status(201).json(newFoodItem);
    } catch (error) {
        console.error('Error adding food item:', error);
        res.status(500).json({ error: 'Failed to add food item' });
    }
};

export const getAllItems = async (req: Request, res: Response) => {
    try {
        const items = await Foods.findAll();
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
};
