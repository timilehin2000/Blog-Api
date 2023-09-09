import { Sequelize, Dialect } from "sequelize";
import config from "../env.config";
import logger from "../utils/logger";

const { dbName, dbUsername, dbPassword, dbDialect, dbHost, dbPort } = config;

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect as Dialect,
  port: dbPort,
  logging: false,
});

const connectToDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    logger.info("Database connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database due to: ", error);
  }
};
export { sequelize, connectToDB };
