export const EVENT__PAGE_SELECTED = "pageSelected";
export const EVENT__PAGE_SIZE_CHANGED = "pageSizeChanged";
export const EVENT__SEARCH_QUERY_CHANGED = "searchQueryChanged";
export const EVENT__SELECTION_CHANGED = "selectionChanged";

export const COLORS = {
  light: "#CAD2C5",
  lightGray: "#84A98C",
  gray: "#52796F",
  darkGray: "#354F52",
  dark: "#2F3E46",
};

export const range = (start, end) =>
  Array(end - start)
    .fill()
    .map((_, i) => start + i);

export const standardizeGenre = (genre) => {
  const lower = genre.toLowerCase();
  if (lower.includes("sci") && lower.includes("fi")) return "sci-fi";
  if (lower.includes("xmas")) return "x-mas";
  if (lower.includes("action")) return "action";
  if (lower.includes("comedy")) return "comedy";
  if (lower.includes("animation")) return "animation";
  if (lower.includes("terror")) return "terror";
};
