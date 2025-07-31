// Import lazy components
import { lazyPublicPages } from "./lazyPages/LazyPublicPages";
import { lazyAuthPages } from "./lazyPages/LazyAuthPages";

// Export Lazy Pages
export const lazyPages = {
  ...lazyPublicPages,
  ...lazyAuthPages,
};
