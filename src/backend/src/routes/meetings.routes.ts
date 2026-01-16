import { Router } from "express";
import { MeetingsController } from "../controllers/meetings.controller";

const router = Router({ strict: true });

router.get("/", (req, res) => MeetingsController.getAllMeetings(req, res));
router.get("/:id", (req, res) => MeetingsController.getMeetingById(req, res));
router.post("/", (req, res) => MeetingsController.createMeeting(req, res));
router.put("/:id", (req, res) => MeetingsController.updateMeeting(req, res));
router.delete("/:id", (req, res) => MeetingsController.deleteMeeting(req, res));

export default router;
