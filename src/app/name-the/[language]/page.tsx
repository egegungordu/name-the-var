import { notFound } from "next/navigation";
import { LANGUAGES } from "@/languages";
import hljs, { PLACEHOLDER } from "@/lib/hljs";
import Guess from "./_components/Guess";

function doesLanguageExist(language: string) {
  return LANGUAGES.find((lang) => lang.slug === language);
}

async function getTodaysCodeSnippet(_language: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // TODO: fetch from API
  return `function foo() {
  const bar = "bar";
  const ${PLACEHOLDER} = "baz";
  const qux = "qux";

  return bar + ${PLACEHOLDER} + qux;
}

function foo() {
  const bar = "bar";
  const ${PLACEHOLDER} = "baz";
  const qux = "qux";

  return bar + ${PLACEHOLDER} + qux;
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

  const highlightedCodeSnippet = hljs.highlight(todaysCodeSnippet, {
    language: params.language,
  });

  return <Guess codeHtml={highlightedCodeSnippet.value} />;
}
