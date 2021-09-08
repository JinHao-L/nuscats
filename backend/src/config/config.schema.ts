import * as Joi from 'joi';

export default Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().default('postgres'),
  DB_AUTOLOADENTITIES: Joi.boolean().default(true),
  DB_SYNCHRONIZE: Joi.boolean().default(false),
});
