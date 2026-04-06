export interface AuctionLink {
  label: string;
  href: string;
  image: string;
  /** When true, render the logo on a dark glass card (logo has its own dark/transparent bg). */
  dark?: boolean;
  /** When true, apply CSS `brightness(0) invert(1)` so a black-fill SVG renders white on dark. */
  invert?: boolean;
}

export const auctionLinks: AuctionLink[] = [
  { label: "Copart", href: "https://www.copart.com", image: "/images/new_logo_copart.svg", dark: true },
  { label: "IAAI", href: "https://www.iaai.com", image: "/images/new_logo_iaai.svg", dark: true },
  { label: "Manheim", href: "https://www.manheim.com", image: "/images/new-logo-manheim.svg", dark: true, invert: true },
  { label: "AutoBidMaster", href: "https://www.autobidmaster.com", image: "/images/new-logo-bid.svg", dark: true },
];
