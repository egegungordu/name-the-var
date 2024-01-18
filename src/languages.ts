import { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiC,
  SiCplusplus,
  SiCsharp,
  SiGo,
} from "react-icons/si";
import { FaRust } from "react-icons/fa";

export interface Language {
  name: string;
  extra: string;
  slug: string;
  color: string;
  logo: IconType;
  title?: string;
  title_prefix?: string;
  title_suffix?: string;
}

export const LANGUAGES = [
  {
    name: "JavaScript",
    extra: "",
    slug: "javascript",
    color: "#f1e05a",
    logo: SiJavascript,
    title: "[object Object]",
  },
  {
    name: "TypeScript",
    extra: "",
    slug: "typescript",
    color: "#2b7489",
    logo: SiTypescript,
    title: "nameTheVar",
    title_prefix: "const",
    title_suffix: ": string",
  },
  {
    name: "Python",
    extra: "",
    slug: "python",
    color: "#3572a5",
    logo: SiPython,
    title: "name_the_var",
    title_prefix: "[x**2 for x in",
    title_suffix: "]",
  },
  {
    name: "Rust",
    // paranthesis is implemented just for this lmao
    extra: "Unofficial",
    slug: "rust",
    color: "#dea584",
    logo: FaRust,
    title: "name_the_var",
    title_prefix: "Some(",
    title_suffix: ")",
  },
  {
    name: "C",
    extra: "",
    slug: "c",
    color: "#555555",
    logo: SiC,
    title: "name_the_var",
    title_prefix: "void (*",
    title_suffix: ")() = 0;",
  },
  {
    name: "C++",
    extra: "",
    slug: "cpp",
    color: "#f34b7d",
    logo: SiCplusplus,
    title: "name_the_var",
    title_prefix: "int*",
    title_suffix: "= nullptr;",
  },
  {
    name: "C#",
    extra: "",
    slug: "csharp",
    color: "#178600",
    logo: SiCsharp,
    title: "nameTheVar",
    title_prefix: "string?",
    title_suffix: "= null",
  },
  {
    name: "Go",
    extra: "",
    slug: "go",
    color: "#00ADD8",
    logo: SiGo,
    title: "nameTheVar",
    title_prefix: "var",
    title_suffix: "string",
  },
] as Language[];
