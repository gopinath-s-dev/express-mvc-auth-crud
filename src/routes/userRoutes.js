import express from "express";
import UserController from "../controllers/userController.js";
import { tokenAuthentication } from "../middlewares/authentication.js";
const router = express.Router({ strict: true, caseSensitive: true });
import Cache from "../middlewares/caching.js";

router.post("/user/create", UserController.createUser);

router.post(
  "/user/:id/update-security",
  tokenAuthentication,
  UserController.updateSecurity
);
router.put("/user/:id/update", tokenAuthentication, UserController.updateUser);
router.get(
  "/user/:id/fetch",
  tokenAuthentication,
  Cache((req) => `user:${req.params.id}`, 1000 * 60 * 5),
  UserController.fetchUser
);
router.get(
  "/fetch-list",
  tokenAuthentication,
  Cache("users:all", 1000 * 60 * 5),
  UserController.fetchUsersList
);
router.delete(
  "/user/:id/delete",
  tokenAuthentication,
  UserController.deleteUser
);

export default router;
