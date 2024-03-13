import Joi from 'joi';

const objectSendEmail = {
    email:
        Joi.string()
            .empty()
            .required()
            .email()
            .messages(
                {
                    'string.base': 'El email debe ser una cadena de texto',
                    'string.empty': 'El email no puede estar vacío',
                    'string.email': 'El email debe ser un email válido',
                    'any.required': 'El email es un campo requerido'
                }
            ),
};

export const createEmailAuthValidation = Joi.object(objectSendEmail).options({
    messages: {
        'object.unknown': 'El campo {#key} no esta permitido'
    }
});