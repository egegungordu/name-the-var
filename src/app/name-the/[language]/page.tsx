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
  return `/// Get a struct that can execute any JavaScript.
///
/// # Safety
///
/// Please be very careful with this function. A script with too many dynamic
/// parts is practically asking for a hacker to find an XSS vulnerability in
/// it. **This applies especially to web targets, where the JavaScript context
/// has access to most, if not all of your application data.**
#[must_use]
pub fn use_eval(${PLACEHOLDER}: &ScopeState) -> &EvalCreator {
    &*${PLACEHOLDER}.use_hook(|| {
        let eval_provider = ${PLACEHOLDER}
            .consume_context::<Rc<dyn EvalProvider>>()
            .expect("evaluator not provided");

        Rc::new(move |script: &str| {
            eval_provider
                .new_evaluator(script.to_string())
                .map(UseEval::new)
        }) as Rc<dyn Fn(&str) -> Result<UseEval, EvalError>>
    })
}`;
  return `try {
  /*
   * The \`onRender\` function could contain \`expect\` calls that throw
   * \`JestAssertionError\`s - but we are still inside of React, where errors
   * might be swallowed.
   * So we record them and re-throw them in \`takeRender\`
   * Additionally, we reject the \`waitForNextRender\` promise.
   */
  onRender?.({
      ...baseRender,
      replaceSnapshot,
      mergeSnapshot,
      ${PLACEHOLDER}: snapshotRef.current!,
      });

  const ${PLACEHOLDER} = snapshotRef.current as Snapshot;
  const domSnapshot =
    snapshotDOM ? window.document.body.innerHTML : undefined;
  const render = new RenderInstance(baseRender, ${PLACEHOLDER}, domSnapshot);
  Profiled.renders.push(render);
  resolveNextRender?.(render);
} catch (error) {
  Profiled.renders.push({
phase: "snapshotError",
count: Profiled.renders.length,
error,
});
rejectNextRender?.(error);
} finally {
  nextRender = resolveNextRender = rejectNextRender = undefined;
}`;
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
