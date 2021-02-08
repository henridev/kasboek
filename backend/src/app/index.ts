import { Request as Req, Response as Res } from "express";

import path from "path";


import cors from "cors";
import express from "express";

import bodyParser from 'body-parser'
import logger from 'morgan'

import kasboekHandler from '../routes/kasboek'


const app = express();


app.use(
  cors({
    origin: (origin, cb) => {
      cb(null, process.env.NODE_ENV !== "production");
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, "../../../frontend/public")));


app.use("/api/kasboek", kasboekHandler);


app.use("/api/*", (req, res, next) => {
  let err = new Error("Not Found");
  next(err);
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../frontend/public/index.html"));
});

// Error handler
app.use((err, _req: Req, res: Res) => {
  console.error("----- An error happened -----");
  console.error(err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);

    // A limited amount of information sent in production
    if (process.env.NODE_ENV === "production") res.json(err);
    else
      res.json(
        JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)))
      );
  }
});

export default app;
