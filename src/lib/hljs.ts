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
import { PLACEHOLDER } from "@/constants";

// add PLACEHOLDER as a special keyword to all given language
function languageWithPlaceholder(language: LanguageFn): LanguageFn {
  const lang = language(hljs);

  // add this scope to the top so its matched first
  lang.contains.unshift({
    scope: "placeholder",
    begin: PLACEHOLDER,
    relevance: 0,
  });

  if (lang.keywords) {
    Object.assign(lang.keywords, {
      // this key name determines the class name
      // hljs-<key name>
      placeholder: [PLACEHOLDER],
    });
  }

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
