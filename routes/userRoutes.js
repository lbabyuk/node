import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();
router.use(responseMiddleware);

// TODO: Implement route controllers for user

router.get("/api/users", (res) => {
  const users = userService.getAllUsers();
  res.sendResponse(users);
});

router.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  try {
    const user = userService.getUserById(userId);
    res.sendResponse(user);
  } catch (error) {
    res.sendNotFound("User not found");
  }
});

router.post("/api/users", createUserValid, (req, res) => {
  const userData = req.body;
  console.log(userData);
  try {
    const createdUser = userService.createUser(userData);
    res.status(201).sendResponse(createdUser);
  } catch (error) {
    res.sendBadRequest(error.message);
  }
});

router.put("/api/users/:id", updateUserValid, (req, res) => {
  const userId = req.params.id;
  const userDataToUpdate = req.body;
  try {
    const updatedUser = userService.updateUser(userId, userDataToUpdate);
    res.sendResponse(updatedUser);
  } catch (error) {
    res.sendNotFound("User not found");
  }
});

router.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  try {
    userService.deleteUser(userId);
    res.sendStatus(204);
  } catch (error) {
    res.sendNotFound("User not found");
  }
});


export { router };
