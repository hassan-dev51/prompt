import mongoose from "mongoose";

interface User {
  email: any;
  username: string;
  image: string;
}
const userSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
    required: [true, "Username is already required"],
  },
  image: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
