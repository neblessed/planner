import { SpendingsController } from "../controllers/spendings.controller";
import { Router } from "express";

const router = Router();

// Привязываем методы контроллера к маршрутам
router.get("/", (req, res) => SpendingsController.getAll(req, res));
router.get("/:id", (req, res) => SpendingsController.getById(req, res));
router.post("/", (req, res) => SpendingsController.create(req, res));
router.delete("/:id", (req, res) => SpendingsController.delete(req, res));

export default router;
