import createCache from "@emotion/cache";

export default function createEmotionCache() {
  // `prepend` option allows to move MUI styles to the top of the <head> tag so they're loaded first
  return createCache({ key: "css", prepend: true });
}
