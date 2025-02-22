import mongoose from 'mongoose'; // Importing mongoose to interact with MongoDB

// Defining the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String, // Field type is String
    required: true, // Field is required
  },
  email: {
    type: String, // Field type is String
    required: true, // Field is required
    unique: true, // Value must be unique in the database
  },
  password: {
    type: String, // Field type is String
  },
  lessonsCompleted: {
    type: Number,
    default: 0, // Counter for completed lessons
  },
  completedExercises: {   // Storing IDs of completed exercises
    type: [String],       // Array of exercise IDs
    default: [],
  },
  profilePicture: {
    type: String,
    default: "/imgs/pfp.jpg", // Default value for profile picture
  },
});

// Creating the User model from the schema
const User = mongoose.model("User", userSchema);

export default User;
