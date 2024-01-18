import { notFound } from "next/navigation";
import { LANGUAGES } from "@/languages";

function doesLanguageExist(language: string) {
  return LANGUAGES.find((lang) => lang.slug === language);
}

async function getTodaysCodeSnippet(_language: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // TODO: fetch from API
  return `
      fn some_rust_code(snippet: &str) {
        println!("{}", snippet);
      }
      `;
}

export default async function GuessingPage({
  params,
}: {
  params: { language: string };
}) {
  if (!doesLanguageExist(params.language)) {
    notFound();
  }

  const todaysCodeSnippet = await getTodaysCodeSnippet(params.language);

  if (!todaysCodeSnippet) {
    throw new Error("Something went wrong");
  }

  return (
    <div className="flex h-full flex-col items-center justify-center animate-fade-in">
      <div className="text-3xl font-semibold text-neutral-700">
        {params.language}
      </div>
      <div className="text-3xl font-semibold text-neutral-700">
        {todaysCodeSnippet}
      </div>
    </div>
  );
}
