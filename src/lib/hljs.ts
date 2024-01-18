import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import rust from "highlight.js/lib/languages/rust";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import go from "highlight.js/lib/languages/go";
import "highlight.js/styles/panda-syntax-light.css";
import { LanguageFn } from "highlight.js";

export const PLACEHOLDER = "__PLACEHOLDER__mikasa_best_girl__";

// add PLACEHOLDER as a special 'keyword' to all languages
function languageWithPlaceholder(language: LanguageFn): LanguageFn {
  const lang = language(hljs);
  lang.keywords;
  lang.contains.push({
    className: "placeholder",
    begin: `\\b${PLACEHOLDER}\\b`,
    relevance: 0,
  });

  return () => lang;
}

hljs.registerLanguage("javascript", languageWithPlaceholder(javascript));
hljs.registerLanguage("typescript", languageWithPlaceholder(typescript));
hljs.registerLanguage("python", languageWithPlaceholder(python));
hljs.registerLanguage("rust", languageWithPlaceholder(rust));
hljs.registerLanguage("c", languageWithPlaceholder(c));
hljs.registerLanguage("cpp", languageWithPlaceholder(cpp));
hljs.registerLanguage("csharp", languageWithPlaceholder(csharp));
hljs.registerLanguage("go", languageWithPlaceholder(go));

export default hljs;
