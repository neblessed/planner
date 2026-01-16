import { GoalController } from "../controllers/goal.controller";
import { Router } from "express";

const router = Router();

// Привязываем методы контроллера к маршрутам
router.put("/", (req, res) => GoalController.renew(req, res));

export default router;
