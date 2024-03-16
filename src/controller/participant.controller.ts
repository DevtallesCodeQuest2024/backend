import {NextFunction, Request, Response} from "express";
import {
    create as createService,
    deleteParticipant as deleteService
} from "../service/participant.service";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const participant = await createService(req.body, next);

    if (participant) {
        res.status(201).json({
            error: false,
            code: 201,
            data: participant,
            message: "Participando agregado correctamente.",
        });
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const participant = await deleteService(req.body, next);

    if (participant) {
        res.status(200).json({
            error: false,
            code: 200,
            message: "Participante eliminado correctamente.",
        });
    }
}