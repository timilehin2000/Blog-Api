import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { sequelize } from "../database/connect";

export interface UserAttributes {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const UserModel = sequelize.define<UserInstance>(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default UserModel;
