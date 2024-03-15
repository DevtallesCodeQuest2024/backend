import Joi from "joi";

const objCreateLottery = {
  name: Joi.string().empty().required().min(2).messages({
    "string.base": "El nombre debe ser una cadena de texto",
    "string.empty": "El nombre no puede estar vacío",
    "string.min": "La longitud mínima del nombre es de {#limit} caracteres",
    "any.required": "El nombre es un campo requerido"
  }),
  description: Joi.string().empty().required().min(2).messages({
    "string.base": "La descripción debe ser una cadena de texto",
    "string.empty": "La descripción no puede estar vacío",
    "string.min":
      "La longitud mínima de la descripción es de {#limit} caracteres",
    "any.required": "La descripción es un campo requerido"
  }),
  prize: Joi.string().empty().required().min(2).messages({
    "string.base": "El premio debe ser una cadena de texto",
    "string.empty": "El premio no puede estar vacío",
    "string.min": "La longitud mínima del premio es de {#limit} caracteres",
    "any.required": "El premio es un campo requerido"
  }),
  startDate: Joi.date().iso().empty().required().messages({
    "date.base": "La fecha de inicio debe ser una fecha válida",
    "date.empty": "La fecha de inicio no puede estar vacía",
    "any.required": "La fecha de inicio es un campo requerido"
  }),
  endDate: Joi.date().iso().empty().required().messages({
    "date.base": "La fecha de fin debe ser una fecha válida",
    "date.empty": "La fecha de fin no puede estar vacía",
    "any.required": "La fecha de fin es un campo requerido"
  })
};

const objDeteteLottery = {
  id: Joi.number().integer().positive().required().messages({
    "number.base": "El ID debe ser un número",
    "number.integer": "El ID debe ser un número entero",
    "number.positive": "El ID debe ser un número positivo",
    "any.required": "El ID es un campo requerido"
  })
};

export const createLotterySchema = Joi.object(objCreateLottery).options({
  messages: {
    "object.unknown": "El campo {#key} no esta permitido"
  }
});

export const updateLotterySchema = Joi.object({
  ...objCreateLottery,
  ...objDeteteLottery,
  active: Joi.boolean().required().messages({
    "boolean.base": "El campo 'active' debe ser un valor booleano",
    "any.required": "El campo 'active' es requerido"
  })
}).options({
  messages: {
    "object.unknown": "El campo {#key} no esta permitido"
  }
});

export const deleteLotterySchema = Joi.object(objDeteteLottery).options({
  messages: {
    "object.unknown": "El campo {#key} no esta permitido"
  }
});
