import { Request, Response } from 'express';
import AddItems from '../models/addItems';

const addFoodItem = async (req: Request, res: Response) => {
    try {
        const { foodManu, type, price, day } = req.body;
        const foodImage = req.file?.path;

        if (!foodImage) {
            return res.status(400).json({ error: 'Food image is required' });
        }

        const newFoodItem = await AddItems.create({
            foodManu,
            type,
            price,
            day,
            foodImage,
        });

        res.status(201).json(newFoodItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add food item' });
    }
};

export default addFoodItem;
