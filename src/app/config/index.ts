import dotenv from 'dotenv';

import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  database_url: process.env.URL,
  default_password: process.env.defaultPassword,
  bcrypt_salt_rounds: process.env.bcrypt_salt_roundsNo,
  jwt_secret_expires: process.env.JWT_ACCESS_ExpiresIn,
  jwt_secret: process.env.JWT_ACCESS_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};
