import mongoose from "mongoose";
import { IUserModel } from "@custom-types/user";
import { UserStatus } from "@enums/user";

const userSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [UserStatus.admin, UserStatus.kasir],
  },
});

export default mongoose.models.User ||
  mongoose.model<IUserModel>("User", userSchema);
