import { DataTypes, Model } from 'sequelize';
import db from '../config/database';

interface UserAttributes {
  id?: number;
  foodMenu: string;
  type: string; 
  price: string;
  day: string;
  foodImage: string;
  
}

class Food extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public foodMenu!: string;
  public type!: string;
  public price!: string;
  public day!: string; 
  public foodImage!: string; 
}

Food.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    foodMenu: {
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
    modelName: 'food',
    tableName: 'foods',
    timestamps: true,
  }
);

export default Food;
