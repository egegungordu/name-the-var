"use server";

import { db } from "@/lib/db";
import { repo_snippet } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { and, eq } from "drizzle-orm/mysql-core/expressions";

async function artificalWait() {
  return new Promise((resolve) => {
    setTimeout(resolve, 150);
  });
}

function getToday() {
  const todayDate = new Date();
  return todayDate.toISOString().split("T")[0];
}

function checkResponse(response: any[]) {
  if (response.length === 0) {
    throw new Error("No hint found");
  }

  if (response.length > 1) {
    // TODO: log this, this shouldnt happen
  }
}

// TODO: track which hints have been shown to which users
export async function getTodaysHintFirst(language: string) {
  const today = getToday();

  await artificalWait();

  const response = await db
    .select({
      avatar: repo_snippet.avatar,
      owner: repo_snippet.owner,
      repo: repo_snippet.repo,
    })
    .from(repo_snippet)
    .where(
      and(
        eq(repo_snippet.language, language),
        sql`${repo_snippet.day} = ${today}`,
      ),
    );

  checkResponse(response);

  return response[0];
}

export async function getTodaysHintSecond(language: string) {
  const today = getToday();

  await artificalWait();

  const response = await db
    .select({
      description: repo_snippet.description,
    })
    .from(repo_snippet)
    .where(
      and(
        eq(repo_snippet.language, language),
        sql`${repo_snippet.day} = ${today}`,
      ),
    );

  checkResponse(response);

  return response[0];
}

export async function getTodaysHintThird(language: string) {
  const today = getToday();

  await artificalWait();

  const response = await db
    .select({
      path: repo_snippet.path,
    })
    .from(repo_snippet)
    .where(
      and(
        eq(repo_snippet.language, language),
        sql`${repo_snippet.day} = ${today}`,
      ),
    );

  checkResponse(response);

  return response[0];
}
