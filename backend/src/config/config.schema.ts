import * as Joi from 'joi';

export default Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().default('postgres'),
  DB_AUTOLOADENTITIES: Joi.boolean().default(true),
  DB_SYNCHRONIZE: Joi.boolean().default(false),

  AWS_REGION: Joi.string().default('ap-southeast-1'),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_S3_ENDPOINT: Joi.string(),
  AWS_S3_SIGNATURE_VERSION: Joi.string(),
  AWS_S3_BUCKET_NAME: Joi.string().required(),
});
