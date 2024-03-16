import { LotteryModel } from "../model/lottery/lottery.model";
import { UserModel } from "../model/user/user.model";

const getAllLotterys = async () => {
  try {
    return await LotteryModel.findAll({ include: UserModel });
  } catch (error) {
    throw error;
  }
};

const getAllLotterysActive = async () => {
  try {
    return await LotteryModel.findAll({ where: { active: true }, include: UserModel });
  } catch (error) {
    throw error;
  }
};

const getLotteryById = async (id: number) => {
  try {
    return await LotteryModel.findOne({ where: { id }, include: UserModel });
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

export default {
  getAllLotterys,
  getAllLotterysActive,
  getLotteryById,
  createLottery,
  updateLottery,
  deleteLottery
};
