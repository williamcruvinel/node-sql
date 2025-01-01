import cors from "cors";
import express from "express";
import { router } from "./router";
// Importa o middleware personalizado "errorHandlerMiddleware" para tratamento de erros
import { errorHandlerMiddleware } from "./middlewares/error-handler"; 

const app = express();
app.use(express.json());
app.use(cors()); // Middleware para permitir requisições de diferentes origens

app.use("/api", router); 
app.use(errorHandlerMiddleware); // Middleware global para tratar erros de forma centralizada

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor iniciado em: http://localhost:${PORT}`)
);
