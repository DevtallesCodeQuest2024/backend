import {ParticipantModel} from "../model/participant/participant.model";
import {NextFunction} from "express";

export const create = async (body: any, next: NextFunction) => {

    try {
        const participant = await getParticipantByIdAndUserDiscord(body, next);

        if (participant) {
            return await participant.update({
                isActive: true
            });
        }

        return await ParticipantModel.create(body);
    } catch (error) {
        next(error);
    }
};

export const getParticipantByIdAndUserDiscordAndIsActive = async (body: any, next: NextFunction) => {
    try {
        return await ParticipantModel.findOne({
            where: {
                discordId: body.discordId,
                discordUsername: body.discordUsername,
                isActive: true
            }
        });
    } catch (error) {
        next(error);
    }
}

export const getParticipantByIdAndUserDiscord = async (body: any, next: NextFunction) => {
    try {
        return await ParticipantModel.findOne({
            where: {
                discordId: body.discordId,
                discordUsername: body.discordUsername
            }
        });
    } catch (error) {
        next(error);
    }
}

export const deleteParticipant = async (body: any, next: NextFunction) => {
    try {
        return await ParticipantModel.update({
            isActive: false
        }, {
            where: {
                discordId: body.discordId,
                discordUsername: body.discordUsername
            }
        });
    } catch (error) {
        next(error);
    }
}