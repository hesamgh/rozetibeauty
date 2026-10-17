import localFont from "next/font/local";

export const iranSans = localFont({
  src: [
    {
      path: "../fonts/IRANSansXFaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/IRANSansXFaNum-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/IRANSansXFaNum-Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/IRANSansXFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/IRANSansXFaNum-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-iran-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});
