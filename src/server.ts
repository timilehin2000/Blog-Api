import express, { Application } from "express";
import cors from "cors";
import { connectToDB } from "./database/connect";
import logger from "./utils/logger";
import config from "./env.config";
import router from "./routes";
import notFound from "./middleware/notfound";
import errorHandler from "./errorHandler";

const { port, nodeEnv } = config;

export default async function startApplication(
  app: Application
): Promise<void> {
  app.use(cors());

  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());

  app.use("/api/v1", router);

  app.all("*", notFound);

  app.use(errorHandler);

  await connectToDB();

  app.listen(port, () => {
    if (nodeEnv !== "test") {
      logger.info(`
          Database is connected  
          Server listening on port: ${port} 
        `);
    }
  });
}
