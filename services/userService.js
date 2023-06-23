import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user
  getAllUsers() {
    return userRepository.getAll();
  }

  getUserById(userId) {
    const user = userRepository.getOne({ id: userId });
    if (user) {
      return user;
    } else {
      throw new Error("User not found");
    }
  }

  createUser(userData) {
    const createdUser = userRepository.create(userData);
    return createdUser;
  }

  updateUser(userId, userDataToUpdate) {
    const updatedUser = userRepository.update(userId, userDataToUpdate);
    if (updatedUser) {
      return updatedUser;
    } else {
      throw new Error("User not found");
    }
  }

  deleteUser(userId) {
    const deletedUser = userRepository.delete(userId);
    if (deletedUser) {
      return;
    } else {
      throw new Error("User not found");
    }
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

}

const userService = new UserService();

export { userService };
