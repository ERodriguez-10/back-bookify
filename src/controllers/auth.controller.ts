import authModel from "../models/auth.model";

class AuthController {
  async register(user: any) {
    try {
      const newUser = await authModel.create(user);
      return newUser;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async login(user: any) {
    try {
      const existingUser = await authModel.findOne({ email: user.email });
      if (!existingUser) throw new Error("User does not exist.");
      return existingUser;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default AuthController;
