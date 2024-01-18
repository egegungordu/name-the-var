// import { create } from "zustand";

// interface NTVState {
//   languages: Language[];
//   selectedLanguage?: Language;
//   selectLanguage: (languageSlug: string) => void;
// }
//
// export const useNTVStore = create<NTVState>()((set) => ({
//   languages: LANGUAGES,
//   selectedLanguage: undefined,
//   selectLanguage: (languageSlug) => {
//     set((state) => {
//       const language = state.languages.find(
//         (language) => language.slug === languageSlug
//       );
//       if (language) {
//         return { selectedLanguage: language };
//       }
//       return {};
//     });
//   },
// }));
