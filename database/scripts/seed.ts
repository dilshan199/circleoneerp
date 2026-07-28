import { seedPermissions } from "../seeders/permission.seeder";

async function runSeeders() {
    try
    {
         console.log("Running seeders...");

         await seedPermissions();

         console.log("Seed completed successfully.");

         process.exit(0);
    }
    catch (error)
    {
        console.error("Seed failed: ", error);

        process.exit(1);
    }
}

runSeeders();