import { DataTypes, Model } from 'sequelize';
import db from '../config/database';

interface UserAttributes {
  id?: number;
  foodManu: string;
  type: string; 
  price: string;
  day: string;
  foodImage: string;
  
}

class AddItems extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public foodManu!: string;
  public type!: string;
  public price!: string;
  public day!: string; 
  public foodImage!: string; 
}

AddItems.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    foodManu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true, 
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
      
  },
  {
    sequelize: db,
    modelName: 'addItem',
    tableName: 'addItems',
    timestamps: true,
  }
);

export default AddItems;
