import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();
router.use(responseMiddleware);

// TODO: Implement route controllers for fighter

router.get("/api/fighters", (res) => {
  const fighters = fighterService.getAllFighter();
  res.sendResponse(fighters);
});

router.get("/api/fighters/:id", (req, res) => {
  const fighterId = req.params.id;
  try {
    const fighter = fighterService.getFighterById(fighterId);
    res.sendResponse(fighter);
  } catch (error) {
    res.sendNotFound("Fighter not found")
  }
});

router.post("/api/fighters", createFighterValid, (req, res) => {
  const fighterData = req.body;
  try {
    const createdFighter = fighterService.createFighter(fighterData);
    res.status(201).sendResponse(createdFighter);
  } catch (error) {
    res.sendBadRequest(error.message);
  }
  
});

router.put("/api/fighters/:id", updateFighterValid, (req, res) => {
  const fighterId = req.params.id;
  const userDataToUpdate = req.body;
  try {
    const updatedFighter = fighterService.updateFighter(fighterId, userDataToUpdate);
    res.sendResponse(updatedFighter);
  } catch (error) {
    res.sendNotFound("Fighter not found");
  }
});

router.delete("/api/fighters/:id", (req, res) => {
  const fighterId = req.params.id;
  try {
    fighterService.deleteFighter(fighterId);
    res.sendStatus(204);
  } catch (error) {
    res.sendNotFound("Fighter not found");
  }
});

export { router };
