import UserModel from "../model/user.js";
import bcrypt from "bcrypt";

class UserController {
  //User Registration
  static userRegistration = async (req, res) => {
    try {
      const { email, name, password, password_confimation } = req.body;
      if (!email || !name || !password || !password_confimation) {
        return res
          .status(400)
          .json({ status: "failed", message: "all fields are required" });
      }

      if (password !== password_confimation) {
        return res.status(400).json({
          status: "failed",
          message: "Password and password confimation must be same",
        });
      }

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          status: "failed",
          message: "Email already registered",
        });
      }

      //Generate Salt and hash password
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword = await bcrypt.hash(password, salt);

      //Save in DB
      const newUser = await new UserModel({
        name,
        email,
        password: hashedPassword,
      }).save();

      res.status(200).json({
        status: "success",
        message: "User registered successfully",
        user: { id: newUser.id, email: newUser.email },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: "Unable to regsiter,please try again later",
      });
    }
  };
  //User Email Verification
  //User Login
  //Get New Access token or Refresh token
  //Change Password
  //Profile or Logged In User
  //Send Password Reset Email
  //Password Reset
  //Logout
}

export default UserController;
