import { DataTypes, Model } from 'sequelize';
import db from '../config/database';

interface UserAttributes {
  id?: number;
  username: string;
  name: string; 
  email: string;
  password: string;
  phone: string;
  address: string;
}

class Admin extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public name!: string; 
  public phone!: string; 
  public address!: string; 

}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    sequelize: db,
    modelName: 'admin',
    tableName: 'admins',
    timestamps: true,
  }
);

export default Admin;
