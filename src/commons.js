export const EVENT__PAGE_SELECTED = "PageSelected";

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
