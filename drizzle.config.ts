import type { Config } from "drizzle-kit";
import { cwd } from "node:process";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(cwd());

if (!process.env["DATABASE_URL"]) {
  throw new Error("DATABASE_URL env variable is not set");
}

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env["DATABASE_URL"],
  },
  tablesFilter: ["ntv_*"],
} satisfies Config;
