import {API_BASE_URL} from '../../config'


export interface ItemsFormData {
    foodMenu: string;
    type: string;
    price: string;
    day: string;
    foodImage: File | null;
}

export const createItems = async (newItems: FormData): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/admin/add-food-item`, {
        method: 'POST',
        body: newItems,
    });

    if (!response.ok) {
        throw new Error('Failed to create user');
    }

    return response.json();
};
