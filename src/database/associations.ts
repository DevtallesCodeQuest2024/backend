import { LotteryModel } from "../model/lottery/lottery.model";
import { UserModel } from "../model/user/user.model";

// N:M users, lotterys
LotteryModel.belongsToMany(UserModel, {
  through: "user_lotterys",
  foreignKey: "lottery_id",
  otherKey: "user_id",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

UserModel.belongsToMany(LotteryModel, {
  through: "user_lotterys",
  foreignKey: "user_id",
  otherKey: "lottery_id",
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});