import mongoose from 'mongoose';

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