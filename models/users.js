import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      validate: {
        validator: function (value) {
          return this.googleId ? true : !!value; // If googleId exists, password is not required
        },
        message: "Password is required",
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows `null` values to be indexed
    },
    profile: {
      type: String, // Store Google profile picture
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Prevent multiple model registration in hot reload environments
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
