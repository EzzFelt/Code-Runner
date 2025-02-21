import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lessonsCompleted: {
    type: Number,
    default: 0, // Contador de lições completadas
  },
  completedExercises: {   // Armazenando os IDs dos exercícios completados
    type: [String],       // Array de IDs de exercícios
    default: [],
  },
  profilePicture: {
    type: String,
    default: "/imgs/pfp.jpg", // Valor padrão para a foto de perfil
  },
});

const User = mongoose.model("User", userSchema);

export default User;
