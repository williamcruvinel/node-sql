// PrismaClient é o cliente principal usado para interagir com o banco de dados
// Cria uma instância de 'PrismaClient' para ser usada em consultas ao banco de dados
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()
