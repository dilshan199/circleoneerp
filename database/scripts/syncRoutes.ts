import db from "@/lib/db_config";
import { glob } from "glob";

// Map all modules
const moduleMap: Record<string, string> = {
    auth: "Authentication",
    setup: "Setup",
    invoice: "Invoice"
};

async function syncRoutes() {
    console.log("Scanning routes...");

    const pages = await glob(
        "app/**/page.tsx"
    );

    console.log(pages);

    for (const page of pages)
    {
        // Convert Windows path to Unix path
        const normalizedPage = page.replaceAll("\\", "/");

        // Ignore api path
        if (normalizedPage.includes("/api/")) 
        {
            continue;
        }

        let routePath = normalizedPage
        .replace("app/", "")
        .replace("/page.tsx", "");

        if (!routePath)
        {
            continue;
        }

        const segments = routePath
        .split("/")
        .filter(Boolean)
        .filter(
            segment => !(
                segment.startsWith("(") &&
                segment.endsWith(")")
            )
        );

        if (segments.length < 2)
        {
            continue;
        }

        routePath = "/" + segments.join("/");

        const moduleCode = segments[0];
        const moduleName = moduleMap[moduleCode] ?? moduleCode;

        await db.query(
            `INSERT IGNORE INTO routes(module, path, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`,
            [moduleName, routePath]
        )

        console.log("Route synchronization completed.");

        process.exit(0);
    }
}

syncRoutes()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);

    process.exit(1);
});