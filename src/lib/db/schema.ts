import {
  uniqueIndex,
  varchar,
  serial,
  mysqlTableCreator,
  date,
} from "drizzle-orm/mysql-core";

const table = mysqlTableCreator((name) => `ntv_${name}`);

export const repo_snippet = table(
  "repo_snippet",
  {
    id: serial("id").primaryKey(),
    language: varchar("language", { length: 256 }).notNull(),
    snippet: varchar("snippet", { length: 4096 }).notNull(),
    day: date("day", { mode: "date" }).notNull(),
    owner: varchar("owner", { length: 256 }).notNull(),
    repo: varchar("repo", { length: 256 }).notNull(),
    avatar: varchar("avatar", { length: 256 }).notNull(),
    description: varchar("description", { length: 512 }).notNull(),
    path: varchar("path", { length: 256 }).notNull(),
    commit: varchar("commit", { length: 256 }).notNull(),
    start: varchar("start", { length: 256 }).notNull(),
    end: varchar("end", { length: 256 }).notNull(),
  },
  (snippet) => ({
    languageDateIndex: uniqueIndex("language_date_idx").on(
      snippet.language,
      snippet.day,
    ),
  }),
);
