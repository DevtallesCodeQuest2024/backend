import Joi from 'joi';

const objectCreateParticipant = {
    discordId:
        Joi.string()
            .empty()
            .min(2)
            .required()
            .messages({
                'string.base': 'El id de discord del usuario debe ser un string',
                'string.empty': 'El id de discord del usuario no puede estar vacío',
                'any.required': 'El id de discord del usuario es un campo requerido'
            }),
    discordUsername:
        Joi.string()
            .empty()
            .required()
            .min(2)
            .messages({
                'string.base': 'El Username de discord del usuario debe ser una cadena de texto',
                'string.empty': 'El Username de discord del usuario no puede estar vacío',
                'string.min': 'el Username de discord del usuario mínima del apellido es de {#limit} caracteres',
                'any.required': 'El Username de discord del usuario es un campo requerido'
            }),
};

export const createParticipantSchema = Joi.object(objectCreateParticipant).options({
    messages: {
        'object.unknown': 'El campo {#key} no esta permitido'
    }
});