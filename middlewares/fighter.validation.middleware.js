import { FIGHTER } from "../models/fighter.js";

const isFieldPresent = (field) => {
  return field !== undefined && field !== "";
};

const isNumberInRange = (number, min, max) => {
  return number >= min && number <= max;
};

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation

  const { id, name, health, power, defense } = req.body;

  if (!isFieldPresent(name) || !isFieldPresent(power) || !isFieldPresent(defense)) {
    return res.status(400).json({ error: true, message: "All fields are required" });
  }

  if (id !== undefined) {
    return res.status(400).json({ error: true, message: "Id should not be present" });
  }

  if (!isNumberInRange(power, 1, 100) || !isNumberInRange(defense, 1, 10)) {
    return res.status(400).json({ error: true, message: "Invalid power or defense value" });
  }

  if (health !== undefined && !isNumberInRange(health, 80, 120)) {
    return res.status(400).json({ error: true, message: "Invalid health value" });
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update

  const { id, name, health, power, defense } = req.body;

  const fields = { name, health, power, defense };
  const isAtLeastOneFieldPresent = Object.values(fields).some((field) => isFieldPresent(field));

  if (!isAtLeastOneFieldPresent) {
    return res.status(400).json({ error: true, message: "At least one field must be present" });
  }

  if (id !== undefined) {
    return res.status(400).json({ error: true, message: "Id should not be present" });
  }

  if (power !== undefined && !isNumberInRange(power, 1, 100)) {
    return res.status(400).json({ error: true, message: "Invalid power value" });
  }

  if (defense !== undefined && !isNumberInRange(defense, 1, 10)) {
    return res.status(400).json({ error: true, message: "Invalid defense value" });
  }

  if (health !== undefined && !isNumberInRange(health, 80, 120)) {
    return res.status(400).json({ error: true, message: "Invalid health value" });
  }

  next();
};

export { createFighterValid, updateFighterValid };
