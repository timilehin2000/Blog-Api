import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || "3000";
const nodeEnv = process.env.NODE_ENV || "development";
const dbName = process.env.DB_NAME || "";
const dbUsername = process.env.DB_USERNAME || "";
const dbPassword = process.env.DB_PASSWORD || "";
const dbDialect = process.env.DB_DIALECT || "";
const dbHost = process.env.DB_HOST || "";
const dbPort = Number(process.env.DB_PORT || "");
const jwtSecret = process.env.JWT_SECRET || "";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "";
const bcryptSalt = Number(process.env.BCRYPT_SALT) || "";

export = {
  port,
  nodeEnv,
  dbName,
  dbUsername,
  dbPassword,
  dbDialect,
  dbHost,
  dbPort,
  jwtSecret,
  jwtExpiresIn,
  bcryptSalt,
};
