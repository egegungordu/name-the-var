"use server";

import { db } from "@/lib/db";
import { repo_snippet } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { and, eq } from "drizzle-orm/mysql-core/expressions";

export default async function getTodaysSnippet(language: string) {
  const todayDate = new Date();
  const today = todayDate.toISOString().split("T")[0];

  const response = await db
    .select({
      id: repo_snippet.id,
      language: repo_snippet.language,
      snippet: repo_snippet.snippet,
      day: repo_snippet.day,
    })
    .from(repo_snippet)
    .where(
      and(eq(repo_snippet.language, language), sql`${repo_snippet.day} = ${today}`),
    );

  if (response.length === 0) {
    throw new Error("No snippet found");
  }

  if (response.length > 1) {
    // TODO: log this, this shouldnt happen
  }

  return response[0];
}
