import express from "express";
import { ClientsController } from "../controllers/clients.controller";

const router = express.Router();

router.post("/", ClientsController.createClient);
router.get("/", ClientsController.getAllClients);
router.get("/search", ClientsController.searchClients);
router.get("/:id", ClientsController.getClientById);
router.get("/telegram/:telegram", ClientsController.getClientByTelegram);
router.put("/:id", ClientsController.updateClient);
router.patch("/:id", ClientsController.updateClient);
router.delete("/:id", ClientsController.deleteClient);

export default router;
