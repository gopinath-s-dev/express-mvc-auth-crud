import User from "../models/userModel.js";
import AuthService from "../services/authService.js";
import lruCache from "../config/lruCache.js";
import redisCache from "../config/redis.js";

class UserController {
  createUser = async (req, res, nxt) => {
    try {
      const user = await User.createUser(req);
      return res.status(201).json({
        message: "User Created Successfully",
        data: user,
      });
    } catch (error) {
      console.error(error);
      nxt(error);
    }
  };
  updateUser = async (req, res, nxt) => {
    try {
      const user = await User.updateUser(req);
      const keys = [`users:all`, `user:${req.params.id}`];
      keys.forEach((k) => lruCache.delete(k));
      await redisCache.del(keys);
      return res.status(200).json({
        message: "User Updated Successfully",
        data: user,
      });
    } catch (error) {
      console.error(error);
      nxt(error);
    }
  };
  fetchUser = async (req, res, nxt) => {
    try {
      const user = await User.fetchUser(req.params.id);
      return res.status(200).json({
        message: "User Fetched Successfully",
        data: user,
      });
    } catch (error) {
      console.error(error);
      nxt(error);
    }
  };
  fetchUsersList = async (req, res, nxt) => {
    try {
      const userList = await User.fetchUsersList();
      return res.status(200).json({
        message: "UsersList Fetched Successfully",
        data: userList,
      });
    } catch (error) {
      console.error(error);
      nxt(error);
    }
  };
  deleteUser = async (req, res, nxt) => {
    try {
      const deletedUser = await User.deleteUser(req.params.id);
      return res.status(200).json({
        message: "User Deleted Successfully",
        data: deletedUser,
      });
    } catch (error) {
      console.error(error);
      nxt(error);
    }
  };
  updateSecurity = async (req, res, nxt) => {
    try {
      await AuthService.updateSecurity(req);
      return res.status(200).json({
        message: "Security Updated Successfully",
      });
    } catch (error) {
      console.error(error);
      nxt(error);
    }
  };
}

export default new UserController();
