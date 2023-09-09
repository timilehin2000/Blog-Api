import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database/connect";
import UserModel from "./user.model";

export interface PostAttributes {
  id: string;
  userId: string;
  title: string;
  content: string;
  author: string;
  category: string;
}

interface PostCreationAttributes extends Optional<PostAttributes, "id"> {}

export interface PostInstance
  extends Model<PostAttributes, PostCreationAttributes>,
    PostAttributes {}

const PostModel = sequelize.define<PostInstance>(
  "posts",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

//post and user association
UserModel.hasMany(PostModel, { foreignKey: "userId" });
PostModel.belongsTo(UserModel, { foreignKey: "userId" });

export default PostModel;
