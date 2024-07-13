import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database'; 

interface CartAttributes {
  id?: number;
  foodId: number;
  foodMenu: string;
  type: string;
  price: string;
  day: string;
  foodImage: string;
  userId: number;
  userName: string;
  userEmail: string;
  status: string;
}

class Cart extends Model<CartAttributes> implements CartAttributes {
  public id!: number;
  public foodId!: number;
  public foodMenu!: string;
  public type!: string;
  public price!: string;
  public day!: string;
  public foodImage!: string;
  public userId!: number;
  public userName!: string;
  public userEmail!: string;
  public status!: string;
  public static sequelize: Sequelize;
  

}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    foodId: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.FLOAT,
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active', 
    },
  },
  {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts', 
  }
);

export default Cart;
