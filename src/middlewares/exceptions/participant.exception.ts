import {NextFunction, Request, Response} from "express";
import {getParticipantByIdAndUserDiscordAndIsActive} from "../../service/participant.service";

export const participantExistException = async function (req: Request, res: Response, next: NextFunction) {
    const { discordId, discordUsername } = req.body;

    const participant = await getParticipantByIdAndUserDiscordAndIsActive({ discordId, discordUsername }, next);

    if (participant) {
        return res
            .status(400)
            .json({
                error: true,
                code: 400,
                message: ['Ya existe un participante registrado con ese usuario de discord.'],
                data: null,
            });
    }

    next();
}