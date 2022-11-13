export const EVENT__PAGE_SELECTED = "pageSelected";
export const EVENT__PAGE_SIZE_CHANGED = "pageSizeChanged";
export const EVENT__SEARCH_QUERY_CHANGED = "searchQueryChanged";
export const EVENT__YEAR_SELECTION_CHANGED = "yearSelectionChanged";
export const EVENT__GENRE_SELECTION_CHANGED = "genreSelectionChanged";

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
