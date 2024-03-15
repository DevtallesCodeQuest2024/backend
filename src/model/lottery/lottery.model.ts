import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../database/connection";

export class LotteryModel extends Model {}

LotteryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prize: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      field: "start_date",
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      field: "end_date",
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: "lotterys",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);