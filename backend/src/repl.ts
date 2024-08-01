// repl.ts
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as repl from 'repl';
import * as models from './models';

dotenv.config({ path: '../.env' });


mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('Connected to the database');
    startRepl();
  })
  .catch(err => console.error('Failed to connect to the database', err));

function startRepl() {
  const r = repl.start('> ');

  // Add your models or other parts of your application to the REPL context
  r.context.models = models;

  // Optionally, add some utility functions to the REPL context
  r.context.help = () => {
    console.log('Available commands:');
    console.log('models - Access your database models');
    console.log('help() - Show this help message');
  };

  console.log('REPL started. Type "help()" for a list of available commands.');
}
