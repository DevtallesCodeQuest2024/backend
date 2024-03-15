import { NextFunction, Request, Response } from "express";
import lotteryService from "../service/lottery.service";

const getAllLotterys = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lotterys = await lotteryService.getAllLotterys();

    res.status(200).json({
      error: false,
      code: 200,
      message: null,
      data: lotterys
    });
  } catch (error) {
    next(error);
  }
};

const getAllLotterysActive = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lotterys = await lotteryService.getAllLotterysActive();

    res.status(200).json({
      error: false,
      code: 200,
      message: null,
      data: lotterys
    });
  } catch (error) {
    next(error);
  }
};

const getLotteryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const lottery = await lotteryService.getLotteryById(id);

    if (!lottery)
      throw { statusCode: 404, message: "No se encontro el sorteo" };

    res.status(200).json({
      error: false,
      code: 200,
      message: null,
      data: lottery
    });
  } catch (error) {
    next(error);
  }
};

const createLottery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lottery = await lotteryService.createLottery(req.body);

    res.status(200).json({
      error: false,
      code: 200,
      message: "Sorteo creado correctamente!",
      data: lottery
    });
  } catch (error) {
    next(error);
  }
};

const updateLottery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await lotteryService.updateLottery(req.body);

    const lottery = await lotteryService.getLotteryById(req.body.id);

    if (!lottery) throw new Error("Hubo un error al actualizar el sorteo");

    res.status(200).json({
      error: false,
      code: 200,
      message: "Sorteo actualizado corectamente!",
      data: lottery
    });
  } catch (error) {
    next(error);
  }
};

const deleteLottery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lottery = await lotteryService.deleteLottery(req.body.id);

    if (lottery === 0) throw new Error("Hubo un error al eliminar el sorteo");

    res.status(200).json({
      error: false,
      code: 200,
      message: "Sorteo eliminado correctamente!",
      data: lottery
    });
  } catch (error) {
    next(error);
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
