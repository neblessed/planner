import { GoalController } from "../controllers/goal.controller";
import { Router } from "express";

const router = Router();

// Привязываем методы контроллера к маршрутам
router.put("/", (req, res) => GoalController.renew(req, res));
router.get("/", (req, res) => GoalController.get(req, res));

export default router;
