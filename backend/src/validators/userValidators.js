import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().trim().lowercase().min(3).max(30).required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().required(),
  roleId: Joi.string(),
  avatar: Joi.string(),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(6).required(),
});
