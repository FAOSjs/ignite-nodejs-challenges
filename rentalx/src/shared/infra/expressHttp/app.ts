import "reflect-metadata"
import "dotenv/config"
import cors from "cors"

import "../../container"
import createConnection from "../typeorm"
createConnection()

import express from "express";
import "express-async-errors"
import swaggerUI from 'swagger-ui-express'

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import swaggerFile from "../../../swagger.json"
import rateLimiter from "./middlewares/rateLimiter"

import { errorHandler } from "./middlewares/errorHandler";

import { router } from "./routes";
import upload from "../../../config/upload"

const app = express();

app.use(rateLimiter)

Sentry.init({
  dsn: "https://5f82a94283594a4196cf0474bbefe3a6@o1147672.ingest.sentry.io/6219689",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.use(cors())
app.use(express.json())

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))

app.get("/", (_, res) => {
   return res.send("Welcome to Rentalx API!")
})

app.use(router)

app.use(Sentry.Handlers.errorHandler())

app.use(errorHandler)

export { app }
