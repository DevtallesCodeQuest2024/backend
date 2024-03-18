import { QueryTypes } from "sequelize";
import { sequelize } from "../database/connection";
import { LotteryModel } from "../model/lottery/lottery.model";
import { UserModel } from "../model/user/user.model";

const getAllLotterys = async () => {
  try {
    return await LotteryModel.findAll({
      include: [
        {
          model: UserModel,
          attributes: [
            "id",
            "firstName",
            "lastName",
            "discordUsername",
            "email",
            "role",
            "isActive"
          ]
        }
      ],
      order: [["created_at", "DESC"]]
    });
  } catch (error) {
    throw error;
  }
};

const getAllLotterysActive = async () => {
  try {
    return await LotteryModel.findAll({
      where: { active: true },
      include: [
        {
          model: UserModel,
          attributes: [
            "id",
            "firstName",
            "lastName",
            "discordUsername",
            "email",
            "role",
            "isActive"
          ]
        }
      ],
      order: [["created_at", "DESC"]]
    });
  } catch (error) {
    throw error;
  }
};

const getLotteryById = async (id: number) => {
  try {
    return await LotteryModel.findOne({
      where: { id },
      include: [
        {
          model: UserModel,
          attributes: [
            "id",
            "firstName",
            "lastName",
            "discordUsername",
            "email",
            "role",
            "isActive"
          ]
        }
      ]
    });
  } catch (error) {
    throw error;
  }
};

const createLottery = async (lottery: any) => {
  try {
    return await LotteryModel.create(lottery);
  } catch (error) {
    throw error;
  }
};

const updateLottery = async (lottery: any) => {
  try {
    const { id, ...updateData } = lottery;
    return await LotteryModel.update(updateData, { where: { id } });
  } catch (error) {
    throw error;
  }
};

const deleteLottery = async (id: number) => {
  try {
    return await LotteryModel.destroy({ where: { id } });
  } catch (error) {
    throw error;
  }
};

const joinLottery = async (userId: number, lotteryId: number) => {
  try {
    const newData = {
      lottery_id: lotteryId,
      user_id: userId
    };

    await sequelize.query(
      `INSERT INTO user_lotterys (lottery_id, user_id, created_at, updated_at) VALUES (:lottery_id, :user_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      { replacements: newData, type: QueryTypes.INSERT }
    );

    return await LotteryModel.findOne({
      where: { id: lotteryId },
      include: [
        {
          model: UserModel,
          attributes: [
            "id",
            "firstName",
            "lastName",
            "discordUsername",
            "email",
            "role",
            "isActive"
          ]
        }
      ]
    });
  } catch (error) {
    throw error;
  }
};

export default {
  getAllLotterys,
  getAllLotterysActive,
  getLotteryById,
  createLottery,
  updateLottery,
  deleteLottery,
  joinLottery
};
