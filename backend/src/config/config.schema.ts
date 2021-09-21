import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string().default('production'),
  DATABASE_URL: Joi.string().required(),
  DB_AUTOLOADENTITIES: Joi.boolean().default(true),
  DB_SYNCHRONIZE: Joi.boolean().default(false),

  AWS_REGION: Joi.string().default('ap-southeast-1'),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_S3_ENDPOINT: Joi.string(),
  AWS_S3_SIGNATURE_VERSION: Joi.string(),
  AWS_S3_BUCKET_NAME: Joi.string().required(),

  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(), // in seconds
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().default('1200'),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(), // in seconds
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().default('1209600'),

  SEEDER_SHOULD_SEED: Joi.boolean().default(false),
  SEEDER_SHOULD_REFRESH: Joi.boolean().default(false),

  POSITIONSTACK_API_KEY: Joi.string().required(),
});
