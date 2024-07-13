
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database'; 

// Define the Order model
class Order extends Model {
  public id!: number;
  public userId!: string;
  public userEmail!: string;
  public userName!: string;
  public foodId!: string;
  public foodMenu!: string;
  public type!: string;
  public price!: string;
  public day!: string;
  public foodImage!: string;
  public status!: string; 
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Order model with attributes and options
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foodId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foodMenu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foodImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending', 
    },
  },
  {
    sequelize, 
    modelName: 'Order', 
    tableName: 'orders', 
  }
);

export default Order;
