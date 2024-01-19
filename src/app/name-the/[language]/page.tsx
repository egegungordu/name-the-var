import { notFound } from "next/navigation";
import { LANGUAGES } from "@/languages";
import hljs from "@/lib/hljs";
import Guess from "./_components/Guess";
import getTodaysSnippet from "./_actions/get-todays-snippet";

function doesLanguageExist(language: string) {
  return LANGUAGES.find((lang) => lang.slug === language);
}

export default async function GuessingPage({
  params,
}: {
  params: { language: string };
}) {
  if (!doesLanguageExist(params.language)) {
    notFound();
  }

  const todaysSnippet = await getTodaysSnippet(params.language);

  if (!todaysSnippet) {
    throw new Error("Something went wrong");
  }

  const highlightedSnippet = hljs.highlight(todaysSnippet.snippet, {
    language: params.language,
  });

  return <Guess language={params.language} codeHtml={highlightedSnippet.value} />;
}
