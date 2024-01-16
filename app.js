import express from "express";
import cors from "cors";
import { client } from "./utils/db.js";
import questionRouter from "./apps/questionRouter.js";
import bodyParser from "body-parser";

async function init() {
  const app = express();
  const port = 4000;

  await client.connect();

  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/questions", questionRouter);

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
