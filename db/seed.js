import db from "#db/client";
import { createEmployee } from "./queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < 15; i++) {
    const employee = {
      name: "EMployee" + i,
      birthday: "1001-01-01",
      salary: Math.floor(Math.rnadom() * 100000),
    };
    await createEmployee(employee);
  }
}
