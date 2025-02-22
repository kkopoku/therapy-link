import Admin from "../../models/administrator.model";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config({ path: "../.env" });

export default async function userSeeder() {
  const admins = [
    {
      roles: ["admin"],
      firstName: "Admin",
      otherNames: "Therapy Link",
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 10),
      email: "admin@therapylinkcenter.com",
      userType: "Administrator",
    },
  ];

  console.log("Admin seeder running ... ");
  // Clear existing data
  await Admin.deleteMany({});

  // Insert new data
  await Admin.insertMany(admins);
  console.log("Admin seeder completed ... ");
}
