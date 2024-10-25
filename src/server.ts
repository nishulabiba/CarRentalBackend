import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

async function main() {
  try {
    const databaseUrl: string = `${config.database_url}/${config.database_name}`;

    await mongoose.connect(databaseUrl);
    console.log('Connected to MongoDB successfully');

    app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Error connecting to the database or starting the server:', err);
    process.exit(1); // Exit process with failure code
  }
}

main();
