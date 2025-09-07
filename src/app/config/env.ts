import 'dotenv/config';

enum Environment {
  Development = 'development',
  Production = 'production',
}

interface IEnvVars {
  PORT: string;
  DB_URL: string;
  NODE_ENV: Environment;
  JWT_EXPIRES: string,
  JWT_SECRET: string,
  BCRYPT_SALT: string,
  SUPER_ADMIN_EMAIL: string,
  SUPER_ADMIN_PASSWORD: string,
}

const requiredEnvVars: string[] = ['DB_URL', 'NODE_ENV', 'PORT', 'JWT_EXPIRES', 'JWT_SECRET', 'BCRYPT_SALT', "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD"];

const loadEnvVars = (): IEnvVars => {
  const missingVars = requiredEnvVars.filter(value => !process.env[value]);

  if (missingVars.length > 0) {
    throw new Error(
      `🔴 Missing required environment variables: ${missingVars.join(', ')}`
    );
  }

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as Environment,
    JWT_EXPIRES: process.env.JWT_EXPIRES as string, 
    JWT_SECRET: process.env.JWT_SECRET as string,
    BCRYPT_SALT: process.env.BCRYPT_SALT as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
  };
};

export const envVars = loadEnvVars();
