import 'dotenv/config';

enum Environment {
  Development = 'development',
  Production = 'production',
}

interface IEnvVars {
  PORT: string;
  DB_URL: string;
  NODE_ENV: Environment;
}

const requiredEnvVars: string[] = ['DB_URL', 'NODE_ENV', 'PORT'];

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
  };
};

export const envVars = loadEnvVars();
