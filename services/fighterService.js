import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  getAllFighter() {
    return fighterRepository.getAll();
  }

  getFighterById(fighterId) {
    const fighter = fighterRepository.getOne({ id: fighterId });
    if (fighter) {
      return fighter;
    } else {
      throw new Error("Fighter not found");
    }
  }

  createFighter(fighterData) {
    const createdFighter = fighterRepository.create(fighterData);
    return createdFighter;
  }

  updateFighter(fighterId, fighterDataToUpdate) {
    const updatedFighter = fighterRepository.update(fighterId, fighterDataToUpdate);
    if (updatedFighter) {
      return updatedFighter;
    } else {
      throw new Error("Fighter not found");
    }
  }

  deleteFighter(fighterId) {
    const deletedFighter = fighterRepository.delete(fighterId);
    if (deletedFighter) {
      return;
    } else {
      throw new Error("Fighter not found");
    }
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

}

const fighterService = new FighterService();

export { fighterService };
