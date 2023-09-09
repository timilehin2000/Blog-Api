import express, { Application } from "express";
import startApplication from "./server";

const app: Application = express();

startApplication(app);
