import dotenv from "dotenv";
import mongoose from "mongoose";
import questionSeeder from "./question-seeder";

dotenv.config({ path: "../.env" });


async function seedDatabase() {
  try {

    console.log("Connected to database for seeder ...");
    await mongoose.connect(process.env.MONGO_URI!);

    await questionSeeder();


  } catch (error: any) {
    await mongoose.connection.close();
    console.error(`Error seeding database: ${error}`);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit();
  }
}

seedDatabase();
