import mongoose from 'mongoose';

/**
 * Asynchronously connects to the MongoDB database using the URI specified in the environment variable `MONGODB_URI`.
 * If the environment variable is not set, it defaults to 'mongodb://mongo:27017/coderunner'.
 * Logs the connection attempt and success or failure messages to the console.
 * Exits the process with a status code of 1 if the connection fails.
 * 
 * @async
 * @function connectDB
 * @throws Will throw an error if the connection to MongoDB fails.
 */
const connectDB = async () => {
  const dbURI = process.env.MONGODB_URI || 'mongodb://mongo:27017/coderunner';
  console.log('Attempting to connect to MongoDB with URI:', dbURI);

  try {
    await mongoose.connect(dbURI);
    console.log('MongoDB conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }

  mongoose.connection.on('error', err => {
    console.error('Erro na conexão com o banco de dados:', err.message);
  });
};

export default connectDB;