export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
  }>;
}

// Navigation items data
export const navItems: NavItem[] = [
  {
    label: "COLLECTIONS",
    href: "/collections",
    children: [
      { label: "SUMMER COLLECTION", href: "/collections/summer" },
      { label: "WINTER COLLECTION", href: "/collections/winter" },
      { label: "LIMITED EDITION", href: "/collections/limited-edition" },
      { label: "SNAPBACK", href: "/styles/snapback" },
      { label: "FITTED", href: "/styles/fitted" },
      { label: "DAD HATS", href: "/styles/dad-hats" },
      { label: "BEANIES", href: "/styles/beanies" },
    ],
  },
  {
    label: "NEW",
    href: "/new",
    children: [
      { label: "NEW ARRIVALS", href: "/new/arrivals" },
      { label: "BEST SELLERS", href: "/new/best-sellers" },
    ],
  },
  {
    label: "TOPHATS",
    href: "/styles/tophats",
    children: [
      { label: "PREMIUM TOPHATS", href: "/styles/tophats/premium" },
      { label: "CLASSIC TOPHATS", href: "/styles/tophats/classic" },
      { label: "MODERN TOPHATS", href: "/styles/tophats/modern" },
    ],
  },
  { label: "SALE", href: "/sale" },
  { label: "ALL", href: "/shop" },
]; 