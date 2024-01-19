import {
  mysqlEnum,
  uniqueIndex,
  bigint,
  varchar,
  serial,
  mysqlTableCreator,
} from "drizzle-orm/mysql-core";

const table = mysqlTableCreator((name) => `ntv_${name}`);

export const countries = table(
  "countries",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
  },
  (countries) => ({
    nameIndex: uniqueIndex("name_idx").on(countries.name),
  }),
);

export const cities = table("cities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  countryId: bigint("country_id", {
    mode: "number",
    unsigned: true,
  }).references(() => countries.id, { onDelete: "cascade" }).notNull(),
  popularity: mysqlEnum("popularity", ["unknown", "known", "popular"]),
});
