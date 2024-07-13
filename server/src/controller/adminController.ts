import { Request, Response } from 'express';
import Foods from '../models/foods';
import Order from '../models/order';

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

export const deleteFoodItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedFoodItem = await Foods.destroy({ where: { id } });

        if (deletedFoodItem) {
            res.status(200).json({ message: 'Food item deleted successfully' });
        } else {
            res.status(404).json({ error: 'Food item not found' });
        }
    } catch (error) {
        console.error('Error deleting food item:', error);
        res.status(500).json({ error: 'Failed to delete food item' });
    }
};

export const updateFoodItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { foodMenu, type, price, day } = req.body;
        const foodImage = req.file?.path;

        const updatedFoodItem = await Foods.update(
            { foodMenu, type, price, day, foodImage },
            { where: { id } }
        );

        if (updatedFoodItem[0] > 0) {
            res.status(200).json({ message: 'Food item updated successfully' });
        } else {
            res.status(404).json({ error: 'Food item not found' });
        }
    } catch (error) {
        console.error('Error updating food item:', error);
        res.status(500).json({ error: 'Failed to update food item' });
    }
};
// View Order items 
export async function viewOrder(req: Request, res: Response) {
    
    try {
      const orderItems = await Order.findAll();
  
      if (!orderItems.length) {
        return res.status(404).json({ error: 'No items found in order' });
      }
  
      res.json(orderItems);
    } catch (error) {
      console.error('Error fetching order items:', error);
      res.status(500).json({ error: 'Failed to fetch order items' });
    }
  }
  