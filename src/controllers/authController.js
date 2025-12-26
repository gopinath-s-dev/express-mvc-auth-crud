import AuthService from "../services/authService.js";

class AuthController {
  login = async (req, res, nxt) => {
    try {
      const loggedUser = await AuthService.login(req);
      return res.status(200).json({
        message: "LoggedIn Successfully",
        data: loggedUser,
      });
    } catch (error) {
      console.error(error);
      nxt(error);
    }
  };
  requestPasswordReset = async (req, res, nxt) => {
    try {
      const passwordResetLink = await AuthService.requestPasswordReset(req);
      return res.status(200).json({
        message: "Password Reset Link Sent Successfully to Requested EmailId",
        data: passwordResetLink,
      });
    } catch (error) {
      console.error(error);
      nxt(error);
    }
  };
  resetPassword = async (req, res, nxt) => {
    try {
      await AuthService.resetPassword(req);
      return res.status(200).json({
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.error(error);
      nxt(error);
    }
  };
}

export default new AuthController();
