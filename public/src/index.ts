import "module-alias/register";

import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
import jayson from "jayson";

const app = express();

// Подключаем CORS
app.use(cors());

// Регистрируем только один JSON-парсер с нужным лимитом (удаляем express.json() без лимита)
app.use(express.json({ limit: "10mb" }));

// Если вам необходима поддержка urlencoded данных, можно оставить:
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

// Если multer нужен для работы с файлами, подключаем его
app.use(multer().any());

const jsonrpcServer = jayson.Server(jsonRpcMethods, { useContext: true });


mongoose.connect(`mongodb://localhost:27017/docforge_db`);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Ошибка подключения к MongoDB:"));
db.once("open", () => {
  console.log("База данных запущена");
});

app.post("/jsonrpc", (req: Request, res: Response) => {
  const ctx: JsonRpcContext = {
    headers: req.headers,
  };

  jsonrpcServer.call(req.body, ctx, function (err, result) {
    res.send(result ?? err);
  });
});


const PORT = "0.0.0.0:50051";

app.listen(50051);
